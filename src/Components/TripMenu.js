import React, { useEffect, useState } from "react";
import { Link, useParams, Outlet } from "react-router-dom";
import Sidebar from "./CommentSidebar";
import {
  Tabs,
  Drawer,
  Container,
  Button,
  Group,
  Modal,
  Title,
  Avatar,
} from "@mantine/core";
import {
  IconGlobe,
  IconCalendar,
  IconListDetails,
  IconMessage2,
  IconBackpack,
  IconFriends,
} from "@tabler/icons";

import Comments from "./Comments";
import AddFriend from "./AddFriend";
import axios from "axios";

export default function TripMenu() {
  // react routes
  const [opened, setOpened] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [tripUsers, setTripUsers] = useState([]);
  const params = useParams();

  const getAllUsers = async () => {
    try {
      const allUsers = await axios.get(
        `${process.env.REACT_APP_API_SERVER}/users`
      );

      setAllUsers(allUsers.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllUsers();
    getTripUser();
  }, []);

  const getTripUser = async () => {
    console.log(params.tripId);
    try {
      const tripUsers = await axios.get(
        `${process.env.REACT_APP_API_SERVER}/trips/${params.tripId}/users`
      );

      setTripUsers(tripUsers.data);
    } catch (err) {
      console.log(err);
    }
  };

  const renderAvatar = tripUsers.map((user) => (
    <Avatar color="cyan" radius="xl">
      {user.userId}
    </Avatar>
  ));

  const handleAddUser = async (userEmail) => {
    console.log(userEmail);
    try {
      const tripUsers = await axios.post(
        `${process.env.REACT_APP_API_SERVER}/trips/${params.tripId}/add-user`,
        { userEmail: userEmail }
      );
      getTripUser();
      console.log(tripUsers.data);
      setModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

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

              <Tabs.Tab
                onClick={() => setModalOpen(!modalOpen)}
                value="add-friend"
                icon={<IconFriends size={14} />}
              >
                Add Friend
              </Tabs.Tab>
            </Tabs.List>
          </Tabs>
          <Button position="center" onClick={() => setOpened(true)}>
            <IconMessage2 /> Discuss
          </Button>
        </Group>
        <Group mt="xs" position="center">
          <Title order={3}>Travellers:</Title>
          {tripUsers && tripUsers.length ? renderAvatar : "Loading"}
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

      <Modal
        size="lg"
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add A Friend to Trip!"
      >
        <AddFriend allUsers={allUsers} handleAddUser={handleAddUser} />
      </Modal>

      <Outlet />
    </div>
  );
}
