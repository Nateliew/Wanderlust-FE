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
} from "@mantine/core";
import ItemsCatalog from "./ItemsCatalog";
import DroppableColumn from "./DroppableColumn";

export default function TripPack(props) {
  //for testing

  // const userId = useContext(UserContext);
  // const { tripId } = useParams();

  const userId = 2;
  const tripId = 2;

  const theme = useMantineTheme();

  // LOAD USER ITEMS
  const [userItems, setUserItems] = useState({});
  const [sharedTripItems, setSharedTripItems] = useState({});

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
    "carry-on": {
      id: "carry-on",
      itemsUids: [],
    },
    "check-in": {
      id: "check-in",
      itemsUids: [],
    },
  });

  const [columnOrder, setColumnOrder] = useState(Object.keys(columns));
  // GET ITEMS CATALOG FROM BACKEND
  const [itemsCatalogByCat, setItemsCatalogByCat] = useState({});
  const [bagType, setBagType] = useState("");
  const [selectedItems, setSelectedItems] = useState({ abc: 1 }, { def: 7 });

  const getInitialDataApi = async () => {
    // get all items in template list
    const itemsResponse = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/items-catalog`
    );
    console.log(itemsResponse.data);
    setAllItems(itemsResponse.data.itemsMap);
    setItemsCatalogByCat(itemsResponse.data.itemByCategory);
    setItemsColumn(itemsResponse.data.itemsColumn);

    const userItemsResponse = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/trips/${tripId}/packing-list/users/${userId}`
    );
    console.log("useritems:", userItemsResponse.data);
    setSharedItemsColumn(userItemsResponse.data.sharedColumn);
    setColumns(userItemsResponse.data.column);
  };

  useEffect(() => {
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
      console.log("1startitems", startItemsIds);
      const newStartCol = {
        ...sourceCol,
        itemsUids: startItemsIds,
      };
      console.log("2startitems", startItemsIds);

      const endItemIds = Array.from(destinationCol.itemsUids);
      endItemIds.splice(destination.index, 0, selected);
      const newEndCol = {
        ...destinationCol,
        itemsUids: endItemIds,
      };

      const newState = {
        ...columns,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      };
      setColumns(newState);
    }

    // post data to backend in the format :
    //structure of itemsList: array of objects - {itemId, quantity, bagType, sharedItem, userId, tripId}
  };

  const handleAddBag = () => {
    if (Object.keys(columns).includes(bagType)) {
      alert("bag already exists");
    } else {
      setColumns((prev) => ({
        ...prev,
        bagType: { id: bagType, itemsUids: [] },
      }));
      setColumnOrder(Object.keys(columns));
    }
  };

  const handleDeleteItem = () => {};

  return (
    <Box>
      <Title italic align="center">
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
            <Text>Items Catalog</Text>
            {itemsCatalogByCat && Object.keys(itemsCatalogByCat).length ? (
              <ItemsCatalog
                column={itemsColumn.id}
                itemsByCategory={itemsCatalogByCat}
              />
            ) : (
              "Loading"
            )}
          </Grid.Col>
          <Grid.Col sm={8} sx={{ backgroundColor: theme.colors.red[1] }}>
            <Title italic>Luggage</Title>
            <br />
            <Group position="center">
              <TextInput
                placeholder="Type of Bag"
                onChange={() => setBagType()}
              />
              <Button onClick={() => handleAddBag()}>Add Bag</Button>
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
                    // dragIds={dragIds}
                    handleDeleteItem={handleDeleteItem}
                  />
                );
              })}
            </SimpleGrid>
          </Grid.Col>
          <Grid.Col sm={2}>
            <Title italic>Shared</Title>
            <DroppableColumn
              column={sharedItemsColumn.shared}
              allItems={allItems}
              selectedItemsIds={sharedItemsColumn.shared.itemsUids}
              // dragIds={selectedItems}
              handleDeleteItem={handleDeleteItem}
            />
          </Grid.Col>
        </Grid>
      </DragDropContext>
    </Box>
  );
}
