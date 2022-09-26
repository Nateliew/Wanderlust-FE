import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  Fragment,
} from "react";
import axios from "axios";
import "./Calendar.css";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import CalendarCard from "./CalendarCard";

const DragAndDropCalendar = withDragAndDrop(Calendar);

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [];

const newDraggableEvents = [
  {
    item: "Akihabara",
  },
  {
    item: "Ueno",
  },
  {
    item: "Sudobashi",
  },
];

const adjEvents = events.map((it, ind) => ({
  ...it,
  isDraggable: ind % 2 === 0,
}));

const formatName = (name, count) => `name ${name} ID ${count}`;

export default function TripCalendar() {
  const [myEvents, setMyEvents] = useState(events);
  const [draggedEvent, setDraggedEvent] = useState();
  const [displayDragItemInCell, setDisplayDragItemInCell] = useState(true);
  const [counters, setCounters] = useState(newDraggableEvents);
  const [addEvent, setAddEvent] = useState();
  const [alldayCheck, setAlldayCheck] = useState(false);
  const trip_id = 5;

  const getWishlistItems = async () => {
    let initialItems = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/trips/${trip_id}/wishlist`
    );
    console.log(initialItems.data, "initial data in get wishlist items");

    const newArray = initialItems.data.map((item, index) => {
      return { index: index + 1, title: initialItems.data.place_name };
    });

    console.log(newArray, "new array");
    let source = {
      title: initialItems.data.place_name,
      id: initialItems.data.length + 1,
    };

    setMyEvents(initialItems.data);
  };

  useEffect(() => {
    getWishlistItems();
  }, []);

  // const addEventToBackend = async () => {
  //   let response = await axios.post(
  //     `${process.env.REACT_APP_API_SERVER}/trips/${trip_id}/calendar`,
  //     {
  //       placeName: input,
  //       trip_id,
  //       wishlist_id,
  //     }
  //   );
  //   console.log(response.data, "response data in handle submit");
  // };

  // // USEEFFECT when events change - will ensure any changes get pushed to backend
  // // - axios call for get, post, delete
  // // call axios for wishlist items to be mapped into draggable events state

  const eventPropGetter = useCallback(
    (event) => ({
      ...(event.isDraggable
        ? { className: "isDraggable" }
        : { className: "nonDraggable" }),
    }),
    []
  );

  const handleAddEvent = () => {
    setMyEvents([...myEvents, newEvent()]);
  };

  const handleDragStart = useCallback((event) => setDraggedEvent(event), []);

  const dragFromOutsideItem = useCallback(() => draggedEvent, [draggedEvent]);

  const handleDisplayDragItemInCell = useCallback(
    () => setDisplayDragItemInCell((prev) => !prev),
    []
  );

  // const handleAlldayCheck = useCallback(
  //   () => setAlldayCheck((prev) => !prev),
  //   []
  // );

  const moveEvent = useCallback(
    ({ event, start, end, isAllDay: droppedOnAllDaySlot = false }) => {
      const { allDay } = event;
      if (!allDay && droppedOnAllDaySlot) {
        event.allDay = true;
      }

      setMyEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {};
        const filtered = prev.filter((ev) => ev.id !== event.id);
        return [...filtered, { ...existing, start, end, allDay }];
      });
    },
    [setMyEvents]
  );

  const newEvent = useCallback(
    (event) => {
      setMyEvents((prev) => {
        console.log("new event and prev", event, prev);
        const idList = prev.map((item) => item.id);
        console.log(idList, " id list in new event");
        const newId = Math.max(...idList) + 1;
        console.log(newId, "newid in new event");
        const data = [
          ...prev,
          { id: newId, trip_id: 5, place_name: event.title },
        ];
        console.log(data, "prev into myevent with newid");
        return [...prev, { id: newId, trip_id: 5, place_name: event.title }];
      });

      console.log(myEvents, "my events in new event");
    },
    [setMyEvents]
  );

  const onDropFromOutside = useCallback(
    ({ start, end, allDay: isAllDay }) => {
      if (draggedEvent === "undroppable") {
        setDraggedEvent(null);
        return;
      }

      const { name } = draggedEvent;
      console.log(
        name,
        draggedEvent,
        "dragged event as name in ondropfromoutside"
      );
      const event = {
        title: draggedEvent.title,
        start,
        end,
        isAllDay,
      };
      console.log(event, "event before set state in on drop from outside");
      setDraggedEvent(null);
      newEvent({
        title: draggedEvent.title,
        start,
        end,
        isAllDay,
      });
      setMyEvents([...myEvents, newEvent]);
      console.log(myEvents, "my events after setting in ondropfromoutside");
    },
    [draggedEvent, counters, setDraggedEvent, setCounters, newEvent]
  );

  const resizeEvent = useCallback(
    ({ event, start, end }) => {
      setMyEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {};
        const filtered = prev.filter((ev) => ev.id !== event.id);
        return [...filtered, { ...existing, start, end }];
      });
    },
    [setMyEvents]
  );

  const onSelectEvent = (event) => {
    const r = window.confirm("Would you like to remove this event?");
    if (r === true) {
      setMyEvents((prev) => {
        console.log(prev, "previous state in onselectevent");
        const events = prev;
        events.splice(3, 1);
        return events;
      });
    }
    return myEvents;
  };

  const defaultDate = useMemo(() => new Date(2022, 9, 0), []);

  return (
    <Fragment>
      {/* <h2>Add New Event</h2>
      <div>
        <input
          type="text"
          placeholder="Add Title"
          value={newEvent.title}
          onChange={(e) => setAddEvent({ ...newEvent, e.target.value })}
        />
        <DatePicker
          placeholderText="Start Date"
          selected={newEvent.start}
          onChange={(start) => setAddEvent({ ...newEvent, start })}
        />
        <DatePicker
          placeholderText="End Date"
          selected={newEvent.end}
          onChange={(end) => setAddEvent({ ...newEvent, end })}
        />
        <input
          type="checkbox"
          placeholderText="Full day"
          onChange={(allday) => setAddEvent({ ...newEvent, allday })}
        />
        <button onClick={handleAddEvent}>Add Event</button>
      </div> */}
      <div>
        <label>
          <input
            type="checkbox"
            checked={displayDragItemInCell}
            onChange={handleDisplayDragItemInCell}
          />
          Display event while dragging over
        </label>
      </div>
      <CalendarCard className="dndOutsideSourceExample">
        <div className="inner">
          {Object.entries(counters).map(([name, count]) => (
            <div
              draggable="true"
              key={name}
              onDragStart={() => handleDragStart({ title: count.item })}
            >
              {console.log(name, count, "name and count")}
              {count.item}
            </div>
          ))}
        </div>
      </CalendarCard>

      <div className="height600">
        <DragAndDropCalendar
          defaultDate={defaultDate}
          dragFromOutsideItem={
            displayDragItemInCell ? dragFromOutsideItem : null
          }
          draggableAccessor="isDraggable"
          eventPropGetter={eventPropGetter}
          events={myEvents}
          localizer={localizer}
          onDropFromOutside={onDropFromOutside}
          onEventDrop={moveEvent}
          onEventResize={resizeEvent}
          onSelectSlot={newEvent}
          style={{ height: 500 }}
          onSelectEvent={(event) => onSelectEvent(event)}
          resizable
          selectable
        >
          {console.log(myEvents, "my events")}
        </DragAndDropCalendar>
      </div>
    </Fragment>
  );
}
