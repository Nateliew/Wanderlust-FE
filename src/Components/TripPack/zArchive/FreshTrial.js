import React, { useState, Suspense } from "react";
import { DragDropContext } from "react-beautiful-dnd";

import { Title, Text, Box, Grid, Stack, useMantineTheme } from "@mantine/core";

import { initialData } from "./FreshTrialData";

import Column from "./FreshTrialColumn";
// const Column = React.lazy(() => import("./FreshTrialColumn"));
// const Column = dynamic(() => import("./FreshTrialColumn"), { ssr: false });

const reorderColumnList = (sourceCol, startIndex, endIndex) => {
  const newItemIds = Array.from(sourceCol.itemsIds);
  const [removed] = newItemIds.splice(startIndex, 1);
  newItemIds.splice(endIndex, 0, removed);

  const newColumn = {
    ...sourceCol,
    itemsIds: newItemIds,
  };

  return newColumn;
};

export default function FreshTrial(props) {
  const theme = useMantineTheme();

  const [state, setState] = useState(initialData);

  const onDragEnd = (result) => {
    const { destination, source } = result;

    // if user tries to drop in on unknown destination
    if (!destination) return;

    // if user drags and drops back in same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    // if user drops within the same column but in diff position
    const sourceCol = state.columns[source.droppableId];
    const destinationCol = state.columns[destination.droppableId];

    if (sourceCol.id === destinationCol.id) {
      const newColumn = reorderColumnList(
        sourceCol,
        source.index,
        destination.index
      );

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };
      setState(newState);
      return;
    }

    // if user moves from one column to another
    const startItemsIds = Array.from(sourceCol.itemsIds);
    const [removed] = startItemsIds.splice(source.index, 1);
    console.log("[removed]", [removed]);
    console.log("remove", removed);
    const newStartCol = {
      ...sourceCol,
      itemsIds: startItemsIds,
    };

    const endItemIds = Array.from(destinationCol.itemsIds);
    endItemIds.splice(destination.index, 0, removed);
    const newEndCol = {
      ...destinationCol,
      itemsIds: endItemIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      },
    };

    setState(newState);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Grid
        justify="space-between"
        gutter="xs"
        style={{
          backgroundColor: theme.colors.gray[8],
          height: "75vh",
          width: "95vh",
          padding: theme.spacing.md,
          textAlign: "center",
        }}
      >
        {state.columnOrder.map((columnId) => {
          const column = state.columns[columnId];
          const items = column.itemsIds.map((itemId) => state.items[itemId]);
          return <Column key={column.id} column={column} items={items} />;
        })}
        {/* <Column type="Check-In" />
        <Column type="Carry-On" />
        <Column type="Tote" /> */}
      </Grid>
    </DragDropContext>
  );
}
