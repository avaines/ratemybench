import { Routes, Route } from 'react-router-dom';
import BenchForm from './components/BenchForm';
import BenchMap from './components/BenchMap';
import BenchList from './components/BenchList';
import Layout from './components/Layout';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<BenchMap />} />
          <Route path="/add" element={<BenchForm />} />
          <Route path="/list" element={<BenchList />} />
          <Route path="/map" element={<BenchMap />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
