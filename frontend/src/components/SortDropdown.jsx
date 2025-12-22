import {Dropdown} from "react-bootstrap";
import {ArrowUp, ArrowDown} from "react-bootstrap-icons";

export default function SortDropdown({ currentSort, onSortChange }) {
  const sortOptions = ["Title", "Year", "Rating"];

  const getArrow = (type) => {
    return type === "ASC" ? <ArrowUp /> : <ArrowDown />
  }

  const renderItem = (type, sort) => {
    const isActive = currentSort === `${type} ${sort}`;

    return (
      <Dropdown.Item
        key={`${type}-${sort}`}
        onClick={() => onSortChange(`${type} ${sort}`)}
        className="d-flex justify-content-between align-items-center"
        active={isActive}
      >
        {type} {getArrow(sort)}
      </Dropdown.Item>
    )
  }

  const [type, dir] = currentSort.split(" ");

  return (
    <Dropdown autoClose="outside">
      <Dropdown.Toggle variant="light" className="fw-bold px-2 py-0 d-flex align-items-center gap-1">
        Sort By: {type} {getArrow(dir)}
      </Dropdown.Toggle>

      <Dropdown.Menu className="py-2 shadow-lg" style={{ minWidth: 'auto' }}>
        {sortOptions.map(type => (<>
          <div className="m-0 p-0" key={type}>
            {renderItem(type, "ASC")}
            {renderItem(type, "DESC")}
          </div>
        </>))}
      </Dropdown.Menu>
    </Dropdown>
  );
}