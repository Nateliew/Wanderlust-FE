import React, { useState, useEffect } from "react";

export default function CountryImage() {
  const [cities, setCities] = useState([]);

  //extract country options here
  useEffect(() => {
    axios
      .get("https://countriesnow.space/api/v0.1/countries/population/cities")
      .then((response) => {
        setCities(response.data);
        console.log("cities", response.data);
      });
    // Only run this effect on component mount
  }, []);

  return <div>"Hi"</div>;
}
