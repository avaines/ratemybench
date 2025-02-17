import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { benchService, Bench } from '../services/benchService';
import BenchForm from './BenchForm';
import '../styles/main.css';

const mapContainerStyle = {
  width: '60em',
  height: '40em',
};

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const BenchMap: React.FC = () => {
  const [benches, setBenches] = useState<Bench[]>([]);
  const [mapCentre, setMapCentre] = useState({ lat: 0, lng: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <div>
        <h1>Rate My Bench</h1>
        <button onClick={() => setIsModalOpen(true)}>Add Bench</button>
      </div>
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
            />
          ))}
        </GoogleMap>
      </LoadScript>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
            <BenchForm />
          </div>
        </div>
      )}
    </>
  );
};

export default BenchMap;
