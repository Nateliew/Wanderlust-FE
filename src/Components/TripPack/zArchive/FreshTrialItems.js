import React from "react";

import { Draggable } from "react-beautiful-dnd";

import { Grid, Stack, Text, Title, Box, useMantineTheme } from "@mantine/core";

export default function Items({ item, index }) {
  const theme = useMantineTheme();

  return (
    <Draggable
      key={String(item.id)}
      draggableId={String(item.id)}
      index={index}
    >
      {(draggableProvided, draggableSnapshot) => (
        <Box
          ref={draggableProvided.innerRef}
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
          sx={{
            backgroundColor: theme.colors.red[2],
            padding: theme.spacing.sm,
            marginLeft: theme.spacing.md,
            marginRight: theme.spacing.md,
            borderRadius: "10px",
          }}
        >
          <Text>{item.name}</Text>
        </Box>
      )}
    </Draggable>
  );
}
