import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Image } from "react-bootstrap";

export function NavBarComponent() {
  return (
    <Navbar expand="lg" className="bg-body-secondary">
      <Container>
        <Link to="/" className="navbar-brand">
          <Image
            src="/img/logo.svg"
            width={30}
            className="me-2"
          />
          My Pokemon Deck
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-4 me-auto nav-item">
            <Nav.Item>
              <Link to="/" className="nav-link fw-normal">
                Search
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/deck" className="nav-link">
                My Deck
              </Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
