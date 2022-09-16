import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function PackingList(props) {
  // hardcoded mock data for set-up trial
  const tripId = 2;

  // for navigation
  let params = useParams();

  // set state for packing list and items catalog
  const [packingList, setPackingList] = useState([]);
  const [itemsCatalog, setItemsCatalog] = useState([]);

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

  const getItemsCatalog = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/items-catalog`
      );
      console.log(response.data);
      setItemsCatalog(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPackingList();
    getItemsCatalog();
  }, []);

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
  const renderItemsCatalog = Object.entries(itemsCatalog).map((data, index) => {
    //data structure: [0:category,1:[{id, itemName},...]
    const categoryName = data[0];

    return (
      <ul key={index}>
        <h6>{categoryName}</h6>
        {data[1].map((item, index) => (
          <div key={index} style={{ display: "flex", flexDirection: "column" }}>
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
  });

  return (
    <div>
      <p>Packing List</p>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h3>Items Catalogue</h3>
          <h6>Categories</h6>
          {renderItemsCatalog}
        </div>
        <div style={{ width: "20vw" }}></div>
        <div>
          <h3>Packing List</h3>
          <p>testing</p>
          <button>save changes</button>
        </div>
      </div>
    </div>
  );
}
