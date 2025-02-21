import React, { useEffect, useState } from 'react';
import { Table, Image, Modal } from 'react-bootstrap';
import { benchService, Bench } from '../services/benchService';

const BenchList: React.FC = () => {
  const [benches, setBenches] = useState<Bench[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBench, setSelectedBench] = useState<Bench | null>(null);

  useEffect(() => {
    const fetchBenches = async () => {
      const data = await benchService.getBenches();
      setBenches(data);
    };
    fetchBenches();
  }, []);

  const handleImageClick = (bench: Bench) => {
    setSelectedBench(bench);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBench(null);
  };

  const renderRating = (rating: number) => {
    return '⭐'.repeat(rating);
  };

  return (
    <div>
      <h1>Benches</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Description</th>
            <th>Rating</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {benches.map((bench) => (
            <tr key={bench.id}>
              <td>{bench.description}</td>
              <td>{renderRating(bench.rating)}</td>
              <td>
                <Image
                  src={bench.image}
                  alt="Bench"
                  thumbnail
                  style={{ width: '100px', height: 'auto', cursor: 'pointer' }}
                  onClick={() => handleImageClick(bench)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Bench Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBench && (
            <>
              <p><strong>ID:</strong> {selectedBench.id}</p>
              <p><strong>Rating:</strong> {renderRating(selectedBench.rating)}</p>
              <Image src={selectedBench.image} alt="Bench" fluid />
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default BenchList;