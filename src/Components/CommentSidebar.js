import { useState } from "react";
import { Drawer, Button, Group } from "@mantine/core";
import Comments from "./Comments";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        padding="xl"
        size="xl"
        position="right"
      >
        {<Comments />}
      </Drawer>

      <Group position="center">
        <p onClick={() => setOpened(true)}>Comments</p>
      </Group>
    </>
  );
}
