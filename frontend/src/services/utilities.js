import {AllowedTags} from "./allowedTags.js";

export const getStatusColor = (status) => {
  switch (status) {
    case "TO_PLAY":    return "bg-light";
    case "UP_NEXT":    return "bg-info-subtle"
    case "PLAYING":    return "bg-primary-subtle";
    case "COMPLETED":  return "bg-success-subtle";
    case "DROPPED":    return "bg-danger-subtle";
    case "HIDDEN":     return "bg-secondary";
    default:           return "bg-light";
  }
};

export const getRatingColor = (value) => {
  if (!value) return "secondary"
  if (value < 5) return "danger";
  if (value < 7) return "warning";
  if (value < 10) return "success";
  return "info";
}

export const searchTags = (query) => {
  const tags = Object.keys(AllowedTags);
  return tags.filter(tag => tag.toLowerCase().includes(query.toLowerCase()));
}

export const getTagsString = (tags) => {
  return tags && tags.length > 0 ? tags.slice(0, 3).join(", ") : "";
};