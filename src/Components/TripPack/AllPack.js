import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import DragDropList from "./DragDrop";
import FreshTrial from "./FreshTrial";

import { Accordion, createStyles, SimpleGrid } from "@mantine/core";

import { dragDropStyles } from "./DragDropStyle";

// // styling for accordion
// const useStyles = createStyles((theme) => ({
//   root: {
//     backgroundColor:
//       theme.colorScheme === "dark"
//         ? theme.colors.dark[6]
//         : theme.colors.gray[0],
//     borderRadius: theme.radius.sm,
//   },

//   item: {
//     backgroundColor:
//       theme.colorScheme === "dark"
//         ? theme.colors.dark[6]
//         : theme.colors.gray[0],
//     border: "1px solid transparent",
//     position: "relative",
//     zIndex: 0,
//     transition: "transform 150ms ease",

//     "&[data-active]": {
//       // transform: "scale(1.03)",
//       backgroundColor:
//         theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
//       boxShadow: theme.shadows.md,
//       borderColor:
//         theme.colorScheme === "dark"
//           ? theme.colors.dark[4]
//           : theme.colors.gray[2],
//       borderRadius: theme.radius.md,
//       zIndex: 1,
//     },
//   },

//   chevron: {
//     "&[data-rotate]": {
//       transform: "rotate(-90deg)",
//     },
//   },
// }));

export default function TripPack(props) {
  // hardcoded mock data for set-up trial
  const tripId = 2;

  // for navigation
  let params = useParams();

  // for styling accordion
  const { classes } = dragDropStyles();

  // set state for packing list and items catalog
  const [packingList, setPackingList] = useState([]);
  const [itemsCatalog, setItemsCatalog] = useState([]);
  const [itemsCatalogByCat, setItemsCatalogByCat] = useState({});
  const [accordionValue, setAccordionValue] = useState([]);

  const [selectedItems, setSelectedItems] = useState({});

  // load data from packinglist and items catalog
  const getPackingList = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/trips/${tripId}/packing-list`
      );
      setPackingList(response.data);
      console.log("did this run?");
    } catch (error) {
      console.log(error);
    }
  };

  const getItemsCatalogByCat = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/items-catalog/by-category`
      );
      console.log(response.data);
      setItemsCatalogByCat(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getItemsCatalog = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/items-catalog`
      );
      setItemsCatalog(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPackingList();
    getItemsCatalogByCat();
    getItemsCatalog();
  }, []);

  // function to select items from items catalogue
  const handleSelectItem = (e) => {
    console.log(e.target.value);
    console.log(e.target.id);
    if (e.target.checked) {
      setSelectedItems((prev) => ({
        ...prev,
        [e.target.id]: e.target.value,
      }));
    } else {
      setSelectedItems((prev) => {
        let currentList = { ...prev };
        delete currentList[e.target.id];
        return currentList;
      });
    }
  };

  const renderAccordionCatalog = Object.entries(itemsCatalogByCat).map(
    (data, index) => {
      //data structure: [0:category,1:[{id, itemName},...]
      const categoryName = data[0];

      return (
        <Accordion.Item key={index} value={categoryName}>
          <Accordion.Control>{categoryName}</Accordion.Control>
          <Accordion.Panel>
            <DragDropList data={itemsCatalogByCat[categoryName]} />
          </Accordion.Panel>
        </Accordion.Item>
      );
    }
  );

  return (
    <div>
      <p>Packing List</p>

      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div>
          <h3>Items Catalogue</h3>

          <Accordion
            sx={{ maxWidth: 420 }}
            mx="auto"
            variant="filled"
            classNames={classes}
            className={classes.root}
            defaultValue="customization"
            multiple
            value={accordionValue}
            onChange={setAccordionValue}
          >
            {renderAccordionCatalog}
          </Accordion>
        </div>
        <FreshTrial />

        {/* <SimpleGrid cols={3} spacing="xl">
          <Bag type="Check-In" />
          <Bag type="Carry-On" />
          <Bag type="Tote" />
        </SimpleGrid> */}
      </div>
    </div>
  );
}
