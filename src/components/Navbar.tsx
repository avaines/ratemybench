import { useState } from 'react';
import BenchForm from './BenchForm';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Navbar = () => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="/">Rate My Bench</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="/list">Benches</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/map">Map</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={handleShow}>Add-a-bench</a>
            </li>
          </ul>
        </div>
      </nav>

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

export default Navbar;