import React, { useState } from "react";
import { Text, Accordion } from "@mantine/core";
import { Droppable, Draggable } from "react-beautiful-dnd";

import { dragDropStyles } from "./DragDropStyle";

// e.g. column: "column-1", data : {id: "passport"}
export default function ItemsCatalog({ column, itemsByCategory }) {
  const { classes, cx } = dragDropStyles();
  const [accordionValue, setAccordionValue] = useState([]);

  const renderAccordionCatalog = Object.entries(itemsByCategory).map(
    (data, index) => {
      //data structure: [0:category,1:[{id, itemName},...]
      const categoryName = data[0];
      const items = data[1];

      return (
        <Accordion.Item key={index} value={categoryName}>
          <Accordion.Control>{categoryName}</Accordion.Control>
          <Accordion.Panel>
            <Droppable droppableId={column} direction="vertical" isDropDisabled>
              {(droppableProvided, droppableSnapshot) => (
                <div
                  ref={droppableProvided.innerRef}
                  {...droppableProvided.droppableProps}
                  sx={{
                    backgroundColor: droppableSnapshot.isDraggingOver
                      ? "lightgrey"
                      : "transparent",
                  }}
                >
                  {items.map((item, index) => (
                    <Draggable
                      key={Object.keys(item)}
                      index={Number(Object.keys(item))}
                      draggableId={String(Object.keys(item))}
                    >
                      {(draggableProvided, draggableSnapshot) => (
                        <div
                          className={cx(classes.packItem, {
                            [classes.itemDragging]:
                              draggableSnapshot.isDragging,
                          })}
                          {...draggableProvided.draggableProps}
                          {...draggableProvided.dragHandleProps}
                          ref={draggableProvided.innerRef}
                        >
                          <Text>{`${
                            item[Object.keys(item)]
                          } | itemId: ${Object.keys(item)}`}</Text>
                          {/* {draggableSnapshot.isDragging && (
                            <span style={{ display: "none" }}>
                              {item[Object.keys(item)]}
                            </span>
                          )} */}
                          <span style={{ display: "none" }}>
                            {droppableProvided.placeholder}
                          </span>
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
              )}
            </Droppable>
          </Accordion.Panel>
        </Accordion.Item>
      );
    }
  );

  return (
    <Accordion
      sx={{ maxWidth: 420 }}
      mx="auto"
      variant="filled"
      classNames={classes}
      className={classes.root}
      defaultValue="customization"
      multiple
      value={accordionValue}
      onChange={setAccordionValue}
    >
      {renderAccordionCatalog}
    </Accordion>
  );
}
