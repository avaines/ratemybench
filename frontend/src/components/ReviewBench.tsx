import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import { benchService } from '../services/benchService';
import { Bench } from '../types/bench';

const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleDateString();
};

const ReviewBench = () => {
  const [searchParams] = useSearchParams();
  const benchId = searchParams.get('id');
  const navigate = useNavigate();

  const [bench, setBench] = useState<Bench | null>(null);

  useEffect(() => {
    if (benchId) {
      benchService.getBenchById(benchId).then((data) => {
        setBench(data);
      });
    }
  }, [benchId]);

  const handleApprove = () => {
    if (benchId && bench) {
      benchService.updateBench(benchId, { ...bench, reviewed: true }).then(() => {
        alert('Bench approved');
        navigate('/list');
      });
    }
  };

  const handleDelete = () => {
    if (benchId) {
      benchService.deleteBench(benchId).then(() => {
        alert('Bench deleted');
        navigate('/map');
      });
    }
  };

  if (!bench) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Review Bench</h1>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <p><strong>ID: </strong> {bench.id}</p>
          <p><strong>Rating:</strong> {bench.rating}</p>
          <p><strong>Description:</strong> {bench.description}</p>
          <p><strong>Submission Date:</strong> {bench.submissionDate ? formatDate(bench.submissionDate) : 'N/A'}</p>
        </div>
        <div style={{ flex: 1, marginLeft: '20px' }}>
          <Image src={bench.image} alt="Bench" fluid />
        </div>
      </div>
      <div style={{ marginTop: '20px' }}>
        <button onClick={handleApprove} className="btn btn-success">Approve</button>
        <button onClick={handleDelete} className="btn btn-danger" style={{ marginLeft: '10px' }}>Delete</button>
      </div>
    </div>
  );
};

export default ReviewBench;
