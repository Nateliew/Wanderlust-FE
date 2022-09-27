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
import "react-datepicker/dist/react-datepicker.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import CalendarCard from "./CalendarCard";
import { useParams } from "react-router-dom";

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

const newDraggableEvents = [];

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
  const params = useParams();
  const tripId = params.tripId;
  const trip_id = params.tripId;

  const getWishlistItems = async () => {
    try {
      let initialItems = await axios.get(
        `${process.env.REACT_APP_API_SERVER}/trips/${trip_id}/wishlist`
      );
      console.log(initialItems.data, "initial data in get wishlist items");

      const newArray = initialItems.data.map((item, index) => {
        return { index: index + 1, title: initialItems.data.placeName };
      });

      console.log(newArray, "new array");
      let source = {
        title: initialItems.data.placeName,
        id: initialItems.data.length + 1,
      };
      console.log(initialItems.data, "inital items before second array");
      const secondArray = [];
      const combiningArray = newDraggableEvents.concat(initialItems.data);
      console.log(combiningArray, "combined array");
      setCounters(combiningArray);
      console.log(counters, "counters in get wl data");
    } catch (err) {
      console.log(err, "error in get wishlsit");
    }
  };

  useEffect(() => {
    getWishlistItems();
  }, []);

  const eventPropGetter = useCallback(
    (event) => ({
      ...(event.isDraggable
        ? { className: "isDraggable" }
        : { className: "nonDraggable" }),
    }),
    []
  );

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
          { id: newId, trip_id: trip_id, placeName: event.title },
        ];
        console.log(data, "prev into myevent with newid");
        return [
          ...prev,
          { id: newId, trip_id: trip_id, placeName: event.title },
        ];
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
        const idx = events.indexOf(event);
        events.splice(idx, 1);
        return events;
      });
    }
    return myEvents;
  };

  const defaultDate = useMemo(() => new Date(2022, 9, 0), []);

  return (
    <Fragment>
      <div className="calendar-main-container">
        <div className="item-list">
          <label>
            <input
              type="checkbox"
              checked={displayDragItemInCell}
              onChange={handleDisplayDragItemInCell}
            />
            Display event while dragging over
          </label>
          <CalendarCard className="dndOutsideSourceExample">
            <div className="inner">
              {Object.entries(counters).map(([name, count]) => (
                <div
                  className="place-single"
                  draggable="true"
                  key={name}
                  onDragStart={() =>
                    handleDragStart({ title: count.placeName })
                  }
                >
                  {console.log(counters, name, count, "name and count")}
                  {count.placeName}
                </div>
              ))}
            </div>
          </CalendarCard>
        </div>
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
      </div>
    </Fragment>
  );
}
