import React, { useEffect, useState } from 'react';
import { benchService, Bench } from '../services/benchService';

const BenchList: React.FC = () => {
  const [benches, setBenches] = useState<Bench[]>([]);

  useEffect(() => {
    const fetchBenches = async () => {
      const data = await benchService.getBenches();
      setBenches(data);
    };
    fetchBenches();
  }, []);

  return (
    <ul>
      {benches.map((bench, index) => (
        <li key={index}>
          <p>{bench.description}</p>
          <p>Rating: {bench.rating}</p>
          <img src={bench.image} alt="Bench" />
          <p>Location: {bench.location.latitude}, {bench.location.longitude}</p>
        </li>
      ))}
    </ul>
  );
};

export default BenchList;