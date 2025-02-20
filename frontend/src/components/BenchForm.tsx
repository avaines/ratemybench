import React, { useState } from 'react';
import { benchService, Bench } from '../services/benchService';
import { v4 as uuidv4 } from 'uuid';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ExifReader from 'exifreader';

const BenchForm: React.FC = () => {
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState('');
  const [location, setLocation] = useState({ lat: 0, lng: 0 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const bench: Bench = {
      id: uuidv4(),
      description,
      rating,
      image,
      location: {
        latitude: location.lat,
        longitude: location.lng,
      },
    };
    await benchService.addBench(bench);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        setImage(reader.result as string);
        const tags = await ExifReader.load(file);

        const lat = tags.GPSLatitude?.description as number[] | undefined;
        const lng = tags.GPSLongitude?.description as number[] | undefined;
        const latRef = tags.GPSLatitudeRef?.description as string | undefined; // 'North latitude' or 'South latitude'
        const lngRef = tags.GPSLongitudeRef?.description as string | undefined; // 'East longitude' or 'West longitude'

        console.log(lat, lng, latRef, lngRef);

        if (lat && lng && lat.length === 3 && lng.length === 3 && latRef && lngRef) {
          const isSouth = latRef.includes("South");
          const isWest = lngRef.includes("West");

          const newLocation = {
            lat: (lat[0] + lat[1] / 60 + lat[2] / 3600) * (isSouth ? -1 : 1),
            lng: (lng[0] + lng[1] / 60 + lng[2] / 3600) * (isWest ? -1 : 1),
          };

          console.log(newLocation);
          setLocation(newLocation);
          (document.getElementById('location') as HTMLInputElement).value = `${lat}, ${lng}`;
        } else {
          handleLocation();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  };

  return (
    <>
        <Modal.Header closeButton>
          <Modal.Title>Add A Bench</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <FloatingLabel controlId="description" label="Leave a description of the bench here" className="mb-3">
              <Form.Control
                as="textarea"
                placeholder="Leave a description of the bench here"
                onChange={(e) => setDescription(e.target.value)}
                style={{ height: '100px' }}
                value={description}
              />
            </FloatingLabel>

            <FloatingLabel controlId="rating" label="Rating out of 5" className="mb-3">
              <Form.Control
                type="range"
                onChange={(e) => setRating(Number(e.target.value))}
                value={rating}
                min={1}
                max={5}
              />
            </FloatingLabel>

            <FloatingLabel controlId="image" label="Upload an image" className="mb-3">
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </FloatingLabel>

            <FloatingLabel controlId="location" label="Location (Latitude, Longitude)" className="mb-3">
              <Form.Control
                type="text"
                value={`${location.lat}, ${location.lng}`}
                onChange={(e) => {
                  const [lat, lng] = e.target.value.split(',').map(Number);
                  setLocation({ lat, lng });
                }}
              />
            </FloatingLabel>

            <div className="d-flex justify-content-between">
              <Button variant="info" onClick={handleLocation}>
                Get Location
              </Button>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Modal.Body>
    </>
  );
};

export default BenchForm;