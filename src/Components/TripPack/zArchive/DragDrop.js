import { createStyles, Text } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { dragDropStyles } from "./DragDropStyle";

// const useStyles = createStyles((theme) => ({
//   item: {
//     ...theme.fn.focusStyles(),
//     display: "flex",
//     alignItems: "center",
//     borderRadius: theme.radius.md,
//     border: `1px solid ${
//       theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
//     }`,
//     padding: `${theme.spacing.sm}px ${theme.spacing.xl}px`,
//     backgroundColor:
//       theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,
//     marginBottom: theme.spacing.sm,
//   },

//   itemDragging: {
//     boxShadow: theme.shadows.sm,
//   },
// }));

// e.g. data : {id: "passport"}
export default function DragDropList({ data }) {
  const { classes, cx } = dragDropStyles();
  const [state, handlers] = useListState(data);

  const items = state.map((item, index) => (
    <Draggable
      key={Object.keys(item)}
      index={index}
      draggableId={String(Object.keys(item))}
    >
      {(provided, snapshot) => (
        <div
          className={cx(classes.packItem, {
            [classes.itemDragging]: snapshot.isDragging,
          })}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div>
            <Text>{item[Object.keys(item)]}</Text>
          </div>
        </div>
      )}
    </Draggable>
  ));

  return (
    <DragDropContext
      onDragEnd={({ destination, source }) =>
        handlers.reorder({ from: source.index, to: destination.index || 0 })
      }
    >
      <Droppable droppableId="dnd-list" direction="vertical" isDropDisabled>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
