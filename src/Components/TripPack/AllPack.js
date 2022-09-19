import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import DragDropList from "./DragDrop";

import { Accordion, createStyles } from "@mantine/core";

// styling for accordion
const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    borderRadius: theme.radius.sm,
  },

  item: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    border: "1px solid transparent",
    position: "relative",
    zIndex: 0,
    transition: "transform 150ms ease",

    "&[data-active]": {
      // transform: "scale(1.03)",
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      boxShadow: theme.shadows.md,
      borderColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2],
      borderRadius: theme.radius.md,
      zIndex: 1,
    },
  },

  chevron: {
    "&[data-rotate]": {
      transform: "rotate(-90deg)",
    },
  },
}));

export default function TripPack(props) {
  // hardcoded mock data for set-up trial
  const tripId = 2;

  // for navigation
  let params = useParams();

  // set state for packing list and items catalog
  const [packingList, setPackingList] = useState([]);
  const [itemsCatalog, setItemsCatalog] = useState([]);
  const [itemsCatalogByCat, setItemsCatalogByCat] = useState({});

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

  // render items catalog by categories
  const renderItemsCatalog = Object.entries(itemsCatalogByCat).map(
    (data, index) => {
      //data structure: [0:category,1:[{id, itemName},...]
      const categoryName = data[0];

      return (
        <ul key={index}>
          <h6>{categoryName}</h6>
          {data[1].map((item, index) => (
            <div
              key={index}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <label htmlFor={item[Object.keys(item)]}>
                <input
                  type="checkbox"
                  value={item[Object.keys(item)]}
                  id={Object.keys(item)}
                  onChange={(e) => handleSelectItem(e)}
                />
                {item[Object.keys(item)]}
              </label>
            </div>
          ))}
        </ul>
      );
    }
  );

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

  const renderPackingList = Object.entries(selectedItems).map((item, index) => (
    <li key={index}>
      {item[1]}
      {console.log(item[1])}
      {console.log(selectedItems)}
    </li>
  ));

  const { classes } = useStyles();

  return (
    <div>
      <p>Packing List</p>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h3>Items Catalogue</h3>
          <Accordion
            sx={{ maxWidth: 420 }}
            mx="auto"
            variant="filled"
            classNames={classes}
            className={classes.root}
            defaultValue="customization"
          >
            {renderAccordionCatalog}
          </Accordion>
        </div>

        <div style={{ width: "20vw" }}></div>
        <div>
          <h3>Packing List</h3>
          {selectedItems && Object.keys(selectedItems)
            ? renderPackingList
            : "No items added yet"}
          <br />
          <button>save changes</button>
        </div>
      </div>
    </div>
  );
}
