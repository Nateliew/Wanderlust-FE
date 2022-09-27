import { Card, Image, Text, Button } from "@mantine/core";
import moment from "moment";
import React from "react";

export default function Single({ trip, handleDelete }) {
  const countryImages = {
    Japan:
      "https://images.arigatotravel.com/wp-content/uploads/2019/06/27234354/shutterstock_119011768-e1560143978361.jpg",
    "Hong Kong":
      "https://st.depositphotos.com/1038117/3088/i/600/depositphotos_30881147-stock-photo-hong-kong-harbour.jpg",
    Switzerland:
      "https://www.traveldailymedia.com/assets/2021/10/shutterstock_380882257.jpg",
    Guatemala:
      "https://static.euronews.com/articles/stories/06/44/52/98/1100x619_cmsv2_2473f2e7-6f61-56c4-9cd3-c0e437945066-6445298.jpg",
    Philippines:
      "https://a.cdn-hotels.com/gdcs/production16/d15/70589415-4617-4205-804f-210fbb296933.jpg",
    Thailand:
      "https://a.cdn-hotels.com/gdcs/production172/d459/3af9262b-3d8b-40c6-b61d-e37ae1aa90aa.jpg?impolicy=fcrop&w=800&h=533&q=medium",
    "South Korea":
      "https://media.istockphoto.com/photos/cherry-blossoms-in-spring-seoul-in-korea-picture-id1137568153?b=1&k=20&m=1137568153&s=170667a&w=0&h=yOZqDs9B7JJbuyJHU5Di5BuZEfWvNDDOJXLa4kndKPY=",
    Italy:
      "https://www.traveldailymedia.com/assets/2021/10/shutterstock_380882257.jpg",
    Spain: "https://cdn.cnn.com/cnnnext/dam/assets/170706113411-spain.jpg",

    Portugal: "https://cdn.cnn.com/cnnnext/dam/assets/170706113411-spain.jpg",
    "United Kingdom":
      "https://media-cldnry.s-nbcnews.com/image/upload/newscms/2017_20/2000986/170515-better-travelling-healthy-london-se-521p.jpg",
    default:
      "https://news.climate.columbia.edu/wp-content/uploads/2021/04/mark-koch-KiRlN3jjVNU-unsplash-637x425.jpeg",
  };

  return (
    <div>
      <Card shadow="sm" p="xl">
        <Card.Section>
          <Image
            src={countryImages[trip.country] || countryImages.default}
            height={160}
            alt="Trips"
          />
        </Card.Section>

        <Text weight={500} size="lg" mt="md" style={{ textDecoration: "none" }}>
          {trip.country}{" "}
        </Text>

        <Text mt="xs" color="dimmed" size="sm">
          {moment(trip.startDate).format("MMM Do YY")} to{" "}
          {moment(trip.endDate).format("MMM Do YY")}
        </Text>
        <Button
          variant="light"
          color="blue"
          fullWidth
          mt="md"
          radius="md"
          onClick={() => handleDelete(trip.id)}
        >
          Delete{" "}
        </Button>
      </Card>
    </div>
  );
}
