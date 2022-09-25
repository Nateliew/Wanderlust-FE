import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { dragDropStyles } from "./DragDropStyle";

import {
  Grid,
  Stack,
  Text,
  Title,
  useMantineTheme,
  NumberInput,
  Group,
  ActionIcon,
} from "@mantine/core";

import { TrashX } from "tabler-icons-react";

export default function DroppableColumn({
  column,
  allItems,
  selectedItemsIds,

  handleDeleteItem,
  handleDeleteBag,
}) {
  const theme = useMantineTheme();
  const { classes, cx } = dragDropStyles();

  return (
    <Grid.Col sx={{ backgroundColor: theme.colors.gray[1] }}>
      {column.id !== "shared" ? (
        <Group position="center">
          <Title>{column.id}</Title>
          <ActionIcon size="xs" onClick={() => handleDeleteBag(column.id)}>
            <TrashX />
          </ActionIcon>
        </Group>
      ) : null}
      <Droppable droppableId={column.id} direction="vertical">
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
            {Object.keys(allItems).length && selectedItemsIds.length
              ? selectedItemsIds.map((item, index) => (
                  <Draggable
                    key={Object.keys(item)[0]}
                    draggableId={Object.keys(item)[0]}
                    index={index}
                  >
                    {(draggableProvided, draggableSnapshot) => (
                      <div
                        className={cx(classes.packItem, {
                          [classes.itemDragging]: draggableSnapshot.isDragging,
                        })}
                        {...draggableProvided.draggableProps}
                        {...draggableProvided.dragHandleProps}
                        ref={draggableProvided.innerRef}
                      >
                        <Group spacing="xs" position="center">
                          <ActionIcon
                            size="xs"
                            onClick={() =>
                              handleDeleteItem(Object.keys(item)[0])
                            }
                          >
                            <TrashX />
                          </ActionIcon>
                          <Text>
                            {allItems[item[Object.keys(item)[0]]].itemName}
                          </Text>
                        </Group>
                      </div>
                    )}
                  </Draggable>
                ))
              : "No items added yet"}

            {droppableProvided.placeholder}
          </Stack>
        )}
      </Droppable>
    </Grid.Col>
  );
}
