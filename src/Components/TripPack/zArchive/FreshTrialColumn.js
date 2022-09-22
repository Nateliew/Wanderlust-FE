import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

import { Grid, Stack, Text, Title, Box, useMantineTheme } from "@mantine/core";

export default function Column({ column, items }) {
  const theme = useMantineTheme();
  return (
    <Grid.Col
      span={3}
      sx={{ backgroundColor: theme.colors.red[3], padding: "0" }}
    >
      <Box
        height="60px"
        sx={{
          backgroundColor: theme.colors.red[2],
          padding: theme.spacing.sm,
          marginBottom: theme.spacing.sm,
        }}
      >
        <Title italic>{column.title}</Title>
      </Box>

      <Droppable droppableId={column.id}>
        {(droppableProvided, droppableSnapshot) => (
          <Stack
            spacing="sm"
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
            sx={{
              background: droppableSnapshot.isDraggingOver
                ? "lightgrey"
                : "transparent",
            }}
          >
            {items.map((item, index) => (
              // <Items key={item.id} item={item} index={index} />
              <Draggable
                key={String(item.id)}
                draggableId={String(item.id)}
                index={index}
              >
                {(draggableProvided, draggableSnapshot) => (
                  <Box
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.dragHandleProps}
                    {...draggableProvided.draggableProps}
                    sx={{
                      backgroundColor: theme.colors.red[2],
                      padding: theme.spacing.sm,
                      marginLeft: theme.spacing.md,
                      marginRight: theme.spacing.md,
                      borderRadius: "10px",
                      outline: "2px solid",
                      outlineColor: draggableSnapshot.isDragging
                        ? theme.colors.gray[10]
                        : "transparent",
                      boxShadow: draggableSnapshot.isDragging
                        ? "0 5px 10px rgba(0, 0, 0, 0.6)"
                        : "unset",
                    }}
                  >
                    <Text>{item.name}</Text>
                  </Box>
                )}
              </Draggable>
            ))}
            {droppableProvided.placeholder}
          </Stack>
        )}
      </Droppable>
    </Grid.Col>
  );
}
