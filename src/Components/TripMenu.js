import React, { useState } from "react";
import { Link, useParams, Outlet } from "react-router-dom";
import Sidebar from "./CommentSidebar";
import { Tabs, Drawer, Container, Button, Group } from "@mantine/core";
import {
  IconGlobe,
  IconCalendar,
  IconListDetails,
  IconMessage2,
  IconBackpack,
  IconFriends,
} from "@tabler/icons";

import Comments from "./Comments";

export default function TripMenu() {
  // react routes
  const [opened, setOpened] = useState(false);

  return (
    <div>
      <Container>
        <Group position="center">
          <Tabs
            variant="outline"
            radius="md"
            defaultValue="dashboard"
            position="center"
          >
            <Tabs.List grow>
              <Link to="" className="link">
                <Tabs.Tab value="dashboard" icon={<IconGlobe size={14} />}>
                  Dashboard
                </Tabs.Tab>
              </Link>
              <Link to="calendar" className="link">
                <Tabs.Tab value="calendar" icon={<IconCalendar size={14} />}>
                  Calendar
                </Tabs.Tab>
              </Link>
              <Link to="wishlist" className="link">
                <Tabs.Tab value="wishlist" icon={<IconListDetails size={14} />}>
                  Wishlist
                </Tabs.Tab>
              </Link>
              <Link to="packinglist" className="link">
                <Tabs.Tab value="packlist" icon={<IconBackpack size={14} />}>
                  Packing List
                </Tabs.Tab>
              </Link>

              <Tabs.Tab value="add-friend" icon={<IconFriends size={14} />}>
                Add Friend
              </Tabs.Tab>
            </Tabs.List>
          </Tabs>
          <Button position="center" onClick={() => setOpened(true)}>
            <IconMessage2 /> Discuss
          </Button>
        </Group>
      </Container>

      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        padding="xl"
        size="xl"
        position="right"
      >
        {<Comments />}
      </Drawer>

      <Outlet />
    </div>
  );
}
