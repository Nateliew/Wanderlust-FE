import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { dragDropStyles } from "./DragDropStyle";

import {
  Grid,
  Stack,
  Text,
  Title,
  Box,
  useMantineTheme,
  NumberInput,
  Button,
} from "@mantine/core";

export default function DroppableColumn({
  column,
  allItems,
  selectedItemsIds,
  dragIds,
  handleDeleteItem,
}) {
  const theme = useMantineTheme();
  const { classes, cx } = dragDropStyles();

  return (
    <Grid.Col sx={{ backgroundColor: theme.colors.gray[1] }}>
      <Title>{column.id}</Title>
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
            {selectedItemsIds &&
            selectedItemsIds.length &&
            Object.keys(allItems).length
              ? selectedItemsIds.map((itemUid, index) => (
                  <Draggable key={itemUid} draggableId={itemUid} index={index}>
                    {(draggableProvided, draggableSnapshot) => (
                      <div
                        className={cx(classes.packItem, {
                          [classes.itemDragging]: draggableSnapshot.isDragging,
                        })}
                        {...draggableProvided.draggableProps}
                        {...draggableProvided.dragHandleProps}
                        ref={draggableProvided.innerRef}
                      >
                        <div>
                          <Text>{allItems[dragIds[itemUid]]["name"]}</Text>
                          <NumberInput defaultValue={1} />
                          <Button onClick={() => handleDeleteItem()}></Button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))
              : null}
            {droppableProvided.placeholder}
          </Stack>
        )}
      </Droppable>
    </Grid.Col>
  );
}
