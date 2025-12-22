import {Nav} from "react-bootstrap";
import {PersonCircle, Controller, JournalText, HouseDoor, PlusCircle} from "react-bootstrap-icons";
import {Link, NavLink} from "react-router";

// TODO make nicer games tracker logo

export default function SideBar ({  }) {
  return (
    <div className="d-flex flex-column p-3 border-end"
         style={{ width: "220px", height: "100vh", position: "fixed" }}>
      <Link to="/" className="link-dark text-decoration-none">
        <span className="fs-4 fw-bold">Games Tracker</span>
      </Link>

      <hr></hr>

      <Nav variant="pills" className="flex-column mb-auto gap-2">
        <Nav.Item>
          <Nav.Link as={NavLink} to="/" end className="d-flex align-items-center gap-2">
            <HouseDoor />Home
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/games" className="d-flex align-items-center gap-2">
            <Controller />Games
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/add" className="d-flex align-items-center gap-2">
            <PlusCircle />Add Game
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/sync" className="d-flex align-items-center gap-2">
            <PlusCircle />Sync With Steam
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/reviews" className="d-flex align-items-center gap-2">
            <JournalText />Reviews
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <hr></hr>

      <Nav variant="pills">
        <Nav.Item className="w-100">
          <Nav.Link as={NavLink} to="/profile" end className="d-flex align-items-center gap-2">
            <PersonCircle size={24} /><span>Profile</span>
          </Nav.Link>
        </Nav.Item>
      </Nav>

    </div>
  )
}