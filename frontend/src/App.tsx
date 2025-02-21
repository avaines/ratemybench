import { Routes, Route } from 'react-router-dom';
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
          <Route path="/list" element={<BenchList />} />
          <Route path="/map" element={<BenchMap />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
