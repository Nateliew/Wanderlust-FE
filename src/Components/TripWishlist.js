import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Button } from "@mantine/core";
import axios from "axios";

export default function TripWishlist() {
  // const getListItems = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${process.env.REACT_APP_API_SERVER}/items-catalog/by-category`
  //     );

  //     setBackendData(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const [backendData, setBackendData] = useState(dummyData)

  const params = useParams();
  const trip_id = params.tripId;
  // const trip_id = 5;

  const [places, updatePlaces] = useState([]);
  const [input, setInput] = useState("");
  // const [inputChange, setInputChange] = useState(false);

  const getWishlistItems = async () => {
    let initialItems = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/trips/${trip_id}/wishlist`
    );
    console.log(initialItems.data, "initial data in get wishlist items");
    updatePlaces(initialItems.data);
  };

  useEffect(() => {
    console.log(places, "places in useeffect");
    getWishlistItems();
  }, []);

  const handleChange = (event) => {
    setInput(event.target.value);
    console.log(input, "in handle change");
  };

  //adding wishlist item function
  const handleSubmit = async (event) => {
    event.preventDefault();
    let response = await axios.post(
      `${process.env.REACT_APP_API_SERVER}/trips/${trip_id}/wishlist`,
      {
        placeName: input,
        tripId: trip_id,
      }
    );
    console.log(response.data, "response data in handle submit");
    setInput("");
    const array = [...places, response.data];
    updatePlaces(array);
    console.log(places, "places array update");
  };

  const deleteItem = async (id) => {
    console.log(id);
    const response = await axios.delete(
      `${process.env.REACT_APP_API_SERVER}/trips/${trip_id}/wishlist/`,
      {
        data: { placeName: id },
      }
    );
    console.log("hello", response.data, "response", response);
    updatePlaces(response.data);
  };

  return (
    <div>
      <p>Wishlist</p>
      <div className="addNew-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            name="place"
            onChange={handleChange}
          />
          <button variant="primary" type="submit">
            Add Place
          </button>
        </form>
      </div>
      <ul className="places">
        {places && places.length > 0
          ? places.map((place, index) => {
              return (
                <div key={index}>
                  {place.placeName}
                  <Button onClick={(e) => deleteItem(place.placeName)}>
                    Delete
                  </Button>
                </div>
              );
            })
          : null}
      </ul>
    </div>
  );
}
