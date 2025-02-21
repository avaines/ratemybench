import { useState } from 'react';
import BenchForm from './BenchForm';
import { Button, Container, Navbar, Nav } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

const Navigation = () => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home" className="d-flex align-items-center">
            <img src="/logo.png" alt="Logo" height="30" className="me-2" />
            RateMyBench
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <Nav.Link href="/list">Benches</Nav.Link>
              <Nav.Link href="/map">Map</Nav.Link>
              <Nav.Link href="#" onClick={handleShow}>Add Bench</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={show} onHide={handleClose}>
        <BenchForm />
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Navigation;