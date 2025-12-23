import {useEffect, useState} from "react";
import {Star, StarHalf, StarFill} from "react-bootstrap-icons";

export default function StarRating ({ numStars = 10, getCurrentRating, defaultRating = 0, type }) {
  const [currentRating, setCurrentRating] = useState(defaultRating);
  const [hover, setHover] = useState(0);

  useEffect(() => {
    setCurrentRating(defaultRating)
  }, [defaultRating]);

  const calculateValue = (e, index) => {
    const {left, width} = e.currentTarget.getBoundingClientRect();
    const isHalf = (e.clientX - left) < width / 2;
    return index + (isHalf ? 0.5 : 1);
  }

  const handleHover = (e, index) => {
    const value = calculateValue(e, index);
    if (value !== hover) {
      setHover(value);
    }
  };

  const handleClick = (e, index) => {
    const value = calculateValue(e, index);
    setCurrentRating(value);
    if (getCurrentRating) {
      getCurrentRating(type, value);
    }
  };

  const renderStar = (index) => {
    const value = index + 1;
    const displayValue = hover > 0 ? hover : currentRating;

    const iconStyle = { pointerEvents: "none" };

    if (displayValue >= value) {
      return <StarFill size={30} className="text-warning" style={iconStyle} />
    }
    if (displayValue >= value - 0.5) {
      return <StarHalf size={30} className="text-warning" style={iconStyle} />
    }
    return <Star size={30} className="text-warning" style={iconStyle} />
  }

  return (
    <div
      className="d-flex align-items-center gap-1"
      onMouseLeave={() => setHover(0)}
    >
      {Array.from({ length: numStars }).map((_, index) => (
        <span
          key={index}
          onClick={(e) => handleClick(e, index)}
          onMouseMove={(e) => handleHover(e, index)}
          style={{ cursor: "pointer", display: "inline-block", userSelect: "none" }}
        >
          {renderStar(index)}
        </span>
      ))}
      <span className="ms-2 text-muted small fw-bold" style={{ minWidth : "25px" }}>
        {hover > 0 ? hover : (currentRating > 0 ? currentRating : "")}
      </span>
    </div>
  )
}