import { useState } from 'react';
import axios from 'axios';

const BenchForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [alert, setAlert] = useState('');

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const bench = {
      name,
      description,
      submissionDate: new Date().toISOString(),
      reviewed: false
    };
    axios.post('/api/benches', bench).then(() => {
      setAlert('Bench submitted for review.');
      setName('');
      setDescription('');
    });
  };

  return (
    <div>
      {alert && <div className="alert alert-success">{alert}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default BenchForm;
