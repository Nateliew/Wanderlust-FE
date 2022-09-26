import React from "react";

const propTypes = {};

function CalendarCard({ children, className, style }) {
  return (
    <div className={`${className || ""} card`} style={style}>
      {children}
    </div>
  );
}

CalendarCard.propTypes = propTypes;

export default CalendarCard;
