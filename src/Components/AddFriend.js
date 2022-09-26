import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

export default function AddFriend() {
  const getAllUsers = async () => {
    try {
      const allUsers = await axios.get(
        `${process.env.REACT_APP_API_SERVER}/users`
      );
      console.log(allUsers);
    } catch (err) {}
  };

  useEffect(() => {});

  return <></>;
}
