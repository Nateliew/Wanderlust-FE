import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { UserContext } from "../../App";

import { DragDropContext } from "react-beautiful-dnd";

import {
  Title,
  Text,
  Box,
  Grid,
  useMantineTheme,
  SimpleGrid,
  Button,
  TextInput,
  Group,
  ActionIcon,
  Stack,
} from "@mantine/core";
import ItemsCatalog from "./ItemsCatalog";
import DroppableColumn from "./DroppableColumn";

import { Plus } from "tabler-icons-react";

export default function TripPack(props) {
  //for testing

  // const userId = useContext(UserContext);
  // const { tripId } = useParams();

  const userId = 2;
  const tripId = 2;

  const theme = useMantineTheme();

  const [newItem, setNewItem] = useState("");

  // FOR DRAG AND DROP INITIAL DATA
  const [allItems, setAllItems] = useState([]);
  const [itemsColumn, setItemsColumn] = useState({
    id: "items-catalog",
    itemsIds: [],
  });
  const [sharedItemsColumn, setSharedItemsColumn] = useState({
    shared: {
      id: "shared",
      itemsUids: [],
    },
  });

  const [columns, setColumns] = useState({
    // "carry-on": {
    //   id: "carry-on",
    //   itemsUids: [],
    // },
    // "check-in": {
    //   id: "check-in",
    //   itemsUids: [],
    // },
  });

  const [columnOrder, setColumnOrder] = useState(Object.keys(columns));
  // GET ITEMS CATALOG FROM BACKEND
  const [itemsCatalogByCat, setItemsCatalogByCat] = useState({});
  const [bagType, setBagType] = useState("");

  const getAllItems = async () => {
    // get all items in template list
    const itemsResponse = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/items-catalog`
    );
    console.log(itemsResponse.data);
    setAllItems(itemsResponse.data.itemsMap);
    setItemsCatalogByCat(itemsResponse.data.itemByCategory);
    setItemsColumn(itemsResponse.data.itemsColumn);
  };

  const getInitialDataApi = async () => {
    const userItemsResponse = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/trips/${tripId}/packing-list/users/${userId}`
    );
    console.log("useritems:", userItemsResponse.data);
    setSharedItemsColumn(userItemsResponse.data.sharedColumn);
    setColumns(userItemsResponse.data.column);
    setColumnOrder(Object.keys(userItemsResponse.data.column));
  };

  useEffect(() => {
    getAllItems();
    getInitialDataApi();
  }, []);

  const reorderColumnList = (sourceCol, startIndex, endIndex) => {
    const newItemIds = Array.from(sourceCol.itemsUids);
    const [removed] = newItemIds.splice(startIndex, 1);
    newItemIds.splice(endIndex, 0, removed);

    const newColumn = {
      ...sourceCol,
      itemsUids: newItemIds,
    };

    return newColumn;
  };

  const onDragEnd = async (result) => {
    const { destination, source } = result;
    console.log("dest:", destination);
    console.log("source:", source);

    if (!destination) return;

    // if user drags and drops back in same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceCol = columns[source.droppableId];
    const destinationCol = columns[destination.droppableId];

    console.log("sourcecol", sourceCol);
    console.log("destination", destinationCol);

    // if user drops within the same column but in diff position and ignore items catalogue
    if (
      sourceCol &&
      source.droppableId === destination.droppableId &&
      source.droppableId !== "items-catalog"
    ) {
      const newColumn = reorderColumnList(
        sourceCol,
        source.index,
        destination.index
      );

      const newState = {
        ...columns,
        [newColumn.id]: newColumn,
      };
      setColumns(newState);

      // SET PUT REQUEST HERE

      return;
    }

    // if user moves from one column to another
    // ---------- ADD API CALL TO UPDATE BACKEND
    const startItemsIds = sourceCol ? Array.from(sourceCol.itemsUids) : [];

    // const selected = [];
    let selected = "";
    // if user drags items from catalog, dun remove from column 1 and generate new uuid
    if (
      source.droppableId === "items-catalog" &&
      source.droppableId !== destination.droppableId
    ) {
      let newDraggableId = uuidv4();
      // POST REQUEST

      const itemsList = {
        itemId: source.index,
        quantity: 1,
        bagType: destination.droppableId,
        sharedItem: destination.droppableId === "shared" ? true : false,
        userId: userId,
        tripId: tripId,
        itemUid: newDraggableId,
        columnIndex: destination.index,
      };
      console.log(itemsList);

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_SERVER}/trips/${tripId}/packing-list/users/${userId}`,
          itemsList
        );

        console.log(response.data);
        setSharedItemsColumn(response.data.sharedColumn);
        setColumns(response.data.column);
      } catch (error) {
        console.log(error);
      }
    } else {
      selected = startItemsIds.splice(source.index, 1);
      console.log(selected);
      console.log("destId", destination.droppableId);
      console.log("desIndex", destination.index);
      const itemData = {
        itemUid: Object.keys(selected[0]),
        columnIndex: destination.index,
        bagType: destination.droppableId,
      };

      try {
        const response = await axios.put(
          `${process.env.REACT_APP_API_SERVER}/trips/${tripId}/packing-list/users/${userId}`,
          itemData
        );
        console.log(response);
        getInitialDataApi();
      } catch (error) {
        console.log(error);
      }
    }

    // post data to backend in the format :
    //structure of itemsList: array of objects - {itemId, quantity, bagType, sharedItem, userId, tripId}
  };

  const handleAddBag = () => {
    console.log(bagType);
    if (Object.keys(columns).includes(bagType)) {
      alert("bag already exists");
    } else {
      console.log("did this tun?");
      setColumns((prev) => ({
        ...prev,
        [bagType]: { id: bagType, itemsUids: [] },
      }));
      setColumnOrder((prev) => [...prev, bagType]);
    }
    setBagType("");
  };

  const handleDeleteBag = async (columnId) => {
    console.log(columnId);
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_SERVER}/trips/${tripId}/packing-list/users/${userId}`,
        { data: { bagType: columnId } }
      );

      console.log(response.data);
      setSharedItemsColumn(response.data.sharedColumn);
      setColumns(response.data.column);
      setColumnOrder(Object.keys(response.data.column));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteItem = async (itemUid) => {
    console.log(itemUid);
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_SERVER}/trips/${tripId}/packing-list/users/${userId}`,
        { data: { itemUid: itemUid } }
      );

      console.log(response.data);
      setSharedItemsColumn(response.data.sharedColumn);
      setColumns(response.data.column);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddItem = async (e) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_SERVER}/items-catalog`,
        { itemName: newItem }
      );

      getAllItems();
      setNewItem("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack>
      <Title italic align="center" sx={{ paddingTop: "3rem" }}>
        Packing List
      </Title>
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid
          style={{
            height: "85vh",
            padding: theme.spacing.md,
            textAlign: "center",
          }}
        >
          <Grid.Col sm={2}>
            <Stack>
              <Title order={2}>Items Catalog</Title>
              <Group spacing="xs">
                <TextInput
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  placeholder="Add More Items"
                />
                <ActionIcon
                  variant="filled"
                  color="pink"
                  size="md"
                  onClick={() => handleAddItem()}
                >
                  <Plus />
                </ActionIcon>
              </Group>
              {itemsCatalogByCat && Object.keys(itemsCatalogByCat).length ? (
                <ItemsCatalog
                  column={itemsColumn.id}
                  itemsByCategory={itemsCatalogByCat}
                />
              ) : (
                "Loading"
              )}
            </Stack>
          </Grid.Col>
          <Grid.Col sm={7} sx={{ paddingLeft: "4rem", paddingRight: "4rem" }}>
            <Stack>
              <Title order={2}>Personal Luggage</Title>
              <Group position="center">
                <TextInput
                  placeholder="Type of Bag"
                  value={bagType}
                  onChange={(e) => setBagType(e.target.value)}
                />
                <Button color="pink" onClick={() => handleAddBag()}>
                  Add Bag
                </Button>
              </Group>
              <SimpleGrid cols={columnOrder.length}>
                {columnOrder.map((columnId, index) => {
                  const column = columns[columnId];
                  // const dragIds = selectedItems;
                  const selectedItemsIds = column.itemsUids;

                  return (
                    <DroppableColumn
                      key={index}
                      column={column}
                      allItems={allItems}
                      selectedItemsIds={selectedItemsIds}
                      handleDeleteItem={handleDeleteItem}
                      handleDeleteBag={handleDeleteBag}
                    />
                  );
                })}
              </SimpleGrid>
            </Stack>
          </Grid.Col>
          <Grid.Col sm={3}>
            <Title order={2}>Shared Items</Title>
            <DroppableColumn
              column={sharedItemsColumn.shared}
              allItems={allItems}
              selectedItemsIds={sharedItemsColumn.shared.itemsUids}
              handleDeleteItem={handleDeleteItem}
            />
          </Grid.Col>
        </Grid>
      </DragDropContext>
    </Stack>
  );
}
