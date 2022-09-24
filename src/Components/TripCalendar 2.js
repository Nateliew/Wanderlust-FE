import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import "./Calendar.css";
import TripWishlist from "./TripWishlist";

export default function TripCalendar() {
  var board = [];
  const rows = 6;
  const columns = 7;
  function SetBoard() {
    board = [];

    // CHANGE TO CREATING 42 CELLS INSTEAD *TO-DO*
    for (let r = 0; r < rows; r++) {
      let row = [];
      for (let c = 0; c < columns; c++) {
        row.push("ok");
      }
      board.push(row);
    }
    const onClick = (x) => {
      console.log(board, x, "in on click");
    };
    return (
      <div>
        {board.map(([key, col], x) => {
          return (
            <div
              className="cell"
              col={col}
              id={x}
              onClick={(x) => onClick(x)}
            ></div>
          );
        })}
      </div>
    );
  }

  //   return (
  //     <div className="container">
  //       <div className="board-container">
  //         {Object.entries(gameState).map(([key, col], x) => {
  //           return (
  //             <GameColumn col={col} id={x} onClick={() => handleClick(x)} />
  //           );
  //         })}
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <div>
      <p>Trip Calendar</p>
      <div className="big-container">
        <SetBoard />
        <TripWishlist />
      </div>
    </div>
  );
}
