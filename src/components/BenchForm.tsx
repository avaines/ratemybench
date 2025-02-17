import React, { useState } from 'react';
// import { benchService, Bench } from '../services/benchService';
import { benchService, Bench } from '../services/benchService';
import { v4 as uuidv4 } from 'uuid';

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
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
    <form onSubmit={handleSubmit}>
      <div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
      </div>
      <div>
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          placeholder="Rating out of 5"
          max={5}
          min={0}
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>
      <div>
        <button type="button" onClick={handleLocation}>
          Get Location
        </button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default BenchForm;