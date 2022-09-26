import React, { useState } from "react";
import {
  NativeSelect,
  Button,
  Stack,
  Group,
  Divider,
  Box,
} from "@mantine/core";

export default function AddFriend({ allUsers, handleAddUser }) {
  const userNames = allUsers.map((user) => user.email);
  const [userAdded, setUserAdded] = useState("");

  return (
    <Stack>
      <Group position="center">
        <NativeSelect
          value={userAdded}
          data={userNames}
          placeholder="Choose user by email"
          onChange={(event) => setUserAdded(event.currentTarget.value)}
        />
        <Button onClick={() => handleAddUser(userAdded)}>Add</Button>
      </Group>

      <Divider
        my="xs"
        variant="dashed"
        labelPosition="center"
        label={
          <>
            <Box ml={5}>If your friend has not joined</Box>
          </>
        }
      />
      <Group position="center">
        <Button sx={{ width: "10rem" }} size="xs">
          Send Invite to Join
        </Button>
      </Group>
    </Stack>
  );
}
