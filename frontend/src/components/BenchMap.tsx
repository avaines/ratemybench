import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { benchService, Bench } from '../services/benchService';
import { Image, Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const mapContainerStyle = {
  width: '100vw',
  height: '80vh',
};

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const BenchMap: React.FC = () => {
  const [benches, setBenches] = useState<Bench[]>([]);
  const [mapCentre, setMapCentre] = useState({ lat: 0, lng: 0 });
  const [selectedBench, setSelectedBench] = useState<Bench | null>(null);

  const renderRating = (rating: number) => {
    return '⭐'.repeat(rating);
  };

  useEffect(() => {
    const fetchBenches = async () => {
      const data = await benchService.getBenches();
      setBenches(data);
    };
    fetchBenches();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setMapCentre({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  return (
    <>
      <div className="d-flex justify-content-center">
        <LoadScript googleMapsApiKey={googleMapsApiKey}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={mapCentre}
            zoom={10}
          >
            {benches.map((bench, index) => (
              <Marker
                key={index}
                position={{ lat: bench.location.latitude, lng: bench.location.longitude }}
                title={bench.description}
                onClick={() => setSelectedBench(bench)}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>
      <Modal show={!!selectedBench} onHide={() => setSelectedBench(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Bench Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBench && (
            <>
              <p><strong>Description:</strong> {selectedBench.description}</p>
              <p><strong>Latitude:</strong> {selectedBench.location.latitude}</p>
              <p><strong>Longitude:</strong> {selectedBench.location.longitude}</p>
              <p><strong>Rating:</strong> {renderRating(selectedBench.rating)}</p>
              <Image
                  src={selectedBench.image}
                  alt="Bench"
                  thumbnail
                  style={{ width: '100%', height: 'auto', cursor: 'pointer' }}
                />
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelectedBench(null)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BenchMap;
