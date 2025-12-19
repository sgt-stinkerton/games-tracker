import {Nav, Navbar, Container} from 'react-bootstrap';
import {Link, NavLink} from 'react-router';

// todo does this need to be collapsible? also, when it collapses, the dropdown is awful

export default function TopBar ({  }) {
  return (
    <header className="border-bottom shadow-sm">
      <Navbar expand="lg" className="py-2">
        <Container fluid className="px-4">

          <div className="d-flex col-lg-3 align-items-center">
            <Navbar.Brand as={Link} to="/" className="fs-4 m-0">
              Games Tracker
            </Navbar.Brand>
          </div>

          <Navbar.Toggle aria-controls="main-navbar"/>

          <Navbar.Collapse id="main-navbar" className="col-lg-9">
            <div className="col-lg-8 d-flex justify-content-center">
              <Nav className="gap-2">
                <Nav.Link as={NavLink} to="/" end className="px-3">Home</Nav.Link>
                <Nav.Link as={NavLink} to="/games" className="px-3">Games</Nav.Link>
                <Nav.Link as={NavLink} to="/completed" className="px-3">Completed</Nav.Link>
                <Nav.Link as={NavLink} to="/reviews" className="px-3">Reviews</Nav.Link>
              </Nav>
            </div>

            <div className="col-lg-4 d-flex justify-content-end align-items-center">
              <Nav>
                <Nav.Link as={NavLink} to="/profile" className="px-3">Profile</Nav.Link>
              </Nav>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}