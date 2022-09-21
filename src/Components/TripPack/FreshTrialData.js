export const initialData = {
  // items from api call
  items: {
    1: { id: 1, name: "passport" },
    2: { id: 2, name: "hat" },
    3: { id: 3, name: "bag" },
    4: { id: 4, name: "cash" },
    5: { id: 5, name: "boarding pass" },
    6: { id: 6, name: "handphone" },
    7: { id: 7, name: "bottle" },
  },

  // columns for each type of baggage
  columns: {
    "column-1": {
      id: "column-1",
      title: "CHECK-IN",
      itemsIds: [1, 2, 3, 4, 5, 6, 7],
    },
    "column-2": {
      id: "column-2",
      title: "Carry-On",
      itemsIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "Tote",
      itemsIds: [],
    },
  },

  // id for columns
  columnOrder: ["column-1", "column-2", "column-3"],
};
