import {Dropdown, Button} from 'react-bootstrap';

export default function FilterDropdown({ type, children, onReset }) {
  return (
    <Dropdown autoClose="outside">
      <Dropdown.Toggle variant="light" className="fw-bold px-2 py-0">
        {type}
      </Dropdown.Toggle>

      <Dropdown.Menu className="p-3 shadow-lg" style={{ minWidth: '320px' }}>
        <div className="mb-3">
          {children}
        </div>

        {/* reset footer */}
        {onReset && (
          <div className="border-top border-secondary pt-2">
            <Button
              variant="link" size="sm" onClick={onReset}
              className="text-decoration-none text-muted p-0"
            >
              Reset {type} Filters
            </Button>
          </div>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}