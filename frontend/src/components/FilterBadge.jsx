export default function FilterBadge ({ children, onClick }) {
  return (
    <span
      className="badge bg-secondary d-flex align-items-center gap-1 mt-2 me-1"
      style={{ cursor: "pointer" }}
      onClick={onClick}
    >
    {children} &times;
  </span>
  )
}