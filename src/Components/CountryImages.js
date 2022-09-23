import React, { useState, useEffect } from "react";

export default function CountryImage({ country, setSource }) {
  let image = null;
  switch (country) {
    case "Japan":
      setSource(
        "https://images.arigatotravel.com/wp-content/uploads/2019/06/27234354/shutterstock_119011768-e1560143978361.jpg"
      );
      break;
    case "Hong Kong":
      setSource(
        "https://st.depositphotos.com/1038117/3088/i/600/depositphotos_30881147-stock-photo-hong-kong-harbour.jpg"
      );
      break;
    case "Singapore":
      setSource(
        "http://cdn.cnn.com/cnnnext/dam/assets/191212182124-04-singapore-buildings.jpg"
      );
      break;
    case "Switzerland":
      setSource(
        "https://www.traveldailymedia.com/assets/2021/10/shutterstock_380882257.jpg"
      );
      break;
    case "Italy":
      setSource(
        "https://www.traveldailymedia.com/assets/2021/10/shutterstock_380882257.jpg"
      );
      break;
    case "Spain":
      setSource(
        "https://cdn.cnn.com/cnnnext/dam/assets/170706113411-spain.jpg"
      );
      break;
    case "Portugal":
      setSource(
        "https://cdn.cnn.com/cnnnext/dam/assets/170706113411-spain.jpg"
      );
      break;
    case "United Kingdom":
      setSource(
        "https://media-cldnry.s-nbcnews.com/image/upload/newscms/2017_20/2000986/170515-better-travelling-healthy-london-se-521p.jpg"
      );
      break;
    default:
      setSource(
        "https://news.climate.columbia.edu/wp-content/uploads/2021/04/mark-koch-KiRlN3jjVNU-unsplash-637x425.jpeg"
      );
  }

  return null;
}
