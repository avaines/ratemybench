import React, { useState } from 'react';
import { benchService } from '../services/benchService';
import { Button, ButtonGroup, Container, Navbar, Nav, Form, Modal, FloatingLabel, ProgressBar } from 'react-bootstrap';
import { Bench } from '../types/bench';
import { v4 as uuidv4 } from 'uuid';
import ExifReader from 'exifreader';


const Navigation = () => {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [rating, setRating] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      alert("Please upload an image.");
      return;
    }
    if (rating === null) {
      alert("Rate that bench!");
      return;
    }
    const bench: Bench = {
      id: uuidv4(),
      description,
      rating: rating,
      image,
      location: {
        latitude: location.lat,
        longitude: location.lng,
      },
      name: ''
    };
    handleClose();
    await benchService.addBench(bench);
    setShowAlert(true);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadProgress(0);
      const reader = new FileReader();
      reader.onloadend = async () => {
        const img = new Image();
        img.onload = async () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (!ctx) return;

          const maxWidth = 640;
          const scale = Math.min(1, maxWidth / img.width);
          canvas.width = img.width * scale;
          canvas.height = img.height * scale;

          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const resizedImage = canvas.toDataURL('image/jpeg');

          for (let progress = 0; progress <= 100; progress += 10) {
            await new Promise((resolve) => setTimeout(resolve, 50));
            setUploadProgress(progress);
          }

          setImage(resizedImage);
          const tags = await ExifReader.load(file);

          const lat = tags.GPSLatitude?.description as number[] | undefined;
          const lng = tags.GPSLongitude?.description as number[] | undefined;
          const latRef = tags.GPSLatitudeRef?.description as string | undefined; // 'North latitude' or 'South latitude'
          const lngRef = tags.GPSLongitudeRef?.description as string | undefined; // 'East longitude' or 'West longitude'

          if (lat && lng && lat.length === 3 && lng.length === 3 && latRef && lngRef) {
            const isSouth = latRef.includes("South");
            const isWest = lngRef.includes("West");

            const newLocation = {
              lat: (lat[0] + lat[1] / 60 + lat[2] / 3600) * (isSouth ? -1 : 1),
              lng: (lng[0] + lng[1] / 60 + lng[2] / 3600) * (isWest ? -1 : 1),
            };

            console.log(lat, lng, latRef, lngRef);
            console.log(newLocation);

            setLocation(newLocation);
            (document.getElementById('location') as HTMLInputElement).value = `${newLocation.lat}, ${newLocation.lng}`;
          } else {
            handleLocation();
          }
        };
        img.src = reader.result as string;
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
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Add A Bench</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FloatingLabel controlId="description" label="Leave a description of the bench here" className="mb-3">
              <Form.Control
                as="textarea"
                placeholder="Leave a description of the bench here"
                onChange={(e) => setDescription(e.target.value)}
                style={{ height: '100px' }}
                value={description}
              />
            </FloatingLabel>

            <div className="mb-3">
              <Form.Label>Rating:</Form.Label>
              <ButtonGroup>
                {[...Array(5)].map((_star, index) => {
                  const currentRating = index + 1;

                  return (
                    <Form.Check
                      key={index}
                      type="radio"
                      name="rating"
                      id={`rating-${currentRating}`}
                      value={currentRating}
                      onChange={() => setRating(currentRating)}
                      label={
                        <span
                          className="star"
                          style={{
                            color:
                              currentRating <= (hover ?? rating ?? 0) ? "#ffc107" : "#e4e5e9",
                          }}
                          onMouseEnter={() => setHover(currentRating)}
                          onMouseLeave={() => setHover(null)}
                        >
                          &#9733;
                        </span>
                      }
                      style={{ display: 'inline-block', marginRight: '10px' }}
                    />
                  );
                })}
              </ButtonGroup>
            </div>

            <FloatingLabel controlId="image" label="Upload an image" className="mb-3">
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
              {uploadProgress > 0 && uploadProgress <= 100 && (
                <ProgressBar now={uploadProgress} label={`${uploadProgress}%`} className="mt-2" />
              )}
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
                Get Current Location
              </Button>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Submit Bench
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      {showAlert && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          Thanks for your submission, it will be approved shortly!
          <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowAlert(false)}></button>
        </div>
      )}
    </>
  );
};

export default Navigation;