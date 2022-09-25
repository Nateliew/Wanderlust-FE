import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";
import moment from "moment";
import React, { useState, useEffect } from "react";

import CountryImage from "./CountryImages";

export default function Single({ trip, handleDelete }) {
  const [source, setSource] = useState();

  return (
    <Card shadow="sm" p="xl" component="a">
      <Card.Section>
        <Image src={source} height={160} alt="Trips" />
        {<CountryImage country={trip.country} setSource={setSource} />}
      </Card.Section>

      <Text weight={500} size="lg" mt="md">
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
  );
}
