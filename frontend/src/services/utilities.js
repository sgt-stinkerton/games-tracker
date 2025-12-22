export const getStatusColor = (status) => {
  switch (status) {
    case "TO_PLAY":    return "bg-secondary-subtle text-dark";
    case "UP_NEXT":    return "bg-info"
    case "PLAYING":    return "bg-primary-subtle text-primary";
    case "COMPLETED":  return "bg-success-subtle text-success";
    case "DROPPED":    return "bg-danger-subtle text-danger";
    case "HIDDEN":     return "bg-secondary text-light";
    default:           return "bg-light text-dark";
  }
};