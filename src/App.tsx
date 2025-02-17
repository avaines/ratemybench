import { Routes, Route } from 'react-router-dom';
import BenchForm from './components/BenchForm';
// import BenchList from './components/BenchList';
import BenchMap from './components/BenchMap';
import Navbar from './components/Navbar';
import './styles/main.css'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<BenchMap />} />
        <Route path="/add" element={<BenchForm />} />
        {/* <Route path="/list" element={<BenchList />} /> */}
        <Route path="/map" element={<BenchMap />} />
      </Routes>
    </>
  );
}

export default App;
