import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Image } from "react-bootstrap";

export function NavBarComponent() {
  const location = useLocation();
  const [pathName, setPathName] = useState("/");

  useEffect(() => {
    setPathName(location.pathname);
  }, [location, location.pathname]);

  return (
    <Navbar expand="lg" className="navbar-dark bg-primary">
      <Container>
        <Link to="/" className="navbar-brand">
          <Image src="/img/logo.svg" width={30} className="me-2 mb-1" />
          My Pokemon Deck
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse role="navigation" id="basic-navbar-nav">
          <Nav activeKey={pathName} className="ms-4 me-auto nav-item">
            <Nav.Item>
              <Nav.Link as={Link} eventKey="/" to="/">
                Search
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} eventKey="/deck" to="/deck">
                My Deck
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
