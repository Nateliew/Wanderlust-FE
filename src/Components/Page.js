import React, { useState } from "react";
import {
  createStyles,
  Image,
  Container,
  Title,
  Text,
  List,
  ThemeIcon,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons";
import moment from "moment";
import CountryImage from "./CountryImages";

const UseStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing.xl * 4,
    paddingBottom: theme.spacing.xl * 4,
  },

  content: {
    maxWidth: 480,
    marginRight: theme.spacing.xl * 3,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 44,
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan("xs")]: {
      fontSize: 28,
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,

    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
    borderRadius: theme.radius.xl,
  },

  highlight: {
    position: "relative",
    backgroundColor: theme.fn.variant({
      variant: "light",
      color: theme.primaryColor,
    }).background,
    borderRadius: theme.radius.sm,
    padding: "4px 12px",
  },
}));

export default function PageTrip({ trip }) {
  const { classes } = UseStyles();
  var moment = require("moment");
  var date1 = moment(trip.startDate).format("MMM Do YY");
  var date2 = moment(trip.endDate).format("MMM Do YY");
  const [source, setSource] = useState();

  return (
    <div>
      <Container>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              <span className={classes.highlight}> {trip.country}</span> <br />
            </Title>
            <Text color="dimmed" mt="md">
              From {date1} to {date2}
            </Text>

            <List
              mt={30}
              spacing="sm"
              size="sm"
              icon={
                <ThemeIcon size={20} radius="xl">
                  <IconCheck size={12} stroke={1.5} />
                </ThemeIcon>
              }
            >
              <List.Item>
                <b>Packing list</b> – Check to see if you have ...
              </List.Item>
              <List.Item>
                <b>Calendar</b> – Wishlists??
              </List.Item>
              <List.Item>
                <b>Friends</b> – Text here
              </List.Item>
            </List>

            {/* <Group mt={30}>
              <Button radius="xl" size="md" className={classes.control}>
                Get started
              </Button>
              <Button
                variant="default"
                radius="xl"
                size="md"
                className={classes.control}
              >
                Source code
              </Button>
            </Group> */}
          </div>
          <Image src={source} className={classes.image} />
          {<CountryImage country={trip.country} setSource={setSource} />}
          {/* <Image
            src={
              "https://3.bp.blogspot.com/-f8YEIEmX2iU/XFUltBx9roI/AAAAAAAABz0/DlgVC_hx9eEOY9pyw0S3ehCFJqh1JRbjgCKgBGAs/w0/mount-fuji-japan-nature-landscape-1-4K.jpg"
            }
            className={classes.image}
          /> */}
        </div>
      </Container>
    </div>
  );
}
