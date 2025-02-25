import { Routes, Route } from 'react-router-dom';
import BenchMap from './components/BenchMap';
import BenchList from './components/BenchList';
import Layout from './components/Layout';
import Sitemap from './components/Sitemap';
import TermsAndConditions from './components/TermsAndConditions';
import PrivacyPolicy from './components/PrivacyPolicy';
import ReviewBench from './components/ReviewBench';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";

// eslint-disable-next-line react-refresh/only-export-components
export const routes = [
  { path: "/", name: "Home", element: <BenchMap /> },
  { path: "/list", name: "Bench List", element: <BenchList /> },
  { path: "/map", name: "Bench Map", element: <BenchMap /> },
  { path: "/sitemap", name: "Sitemap", element: <Sitemap /> },
  { path: "/terms-and-conditions", name: "Terms and Conditions", element: <TermsAndConditions /> },
  { path: "/privacy-policy", name: "Privacy Policy", element: <PrivacyPolicy /> },
  { path: "/review", name: "Review Bench", element: <ReviewBench /> },
];

function App() {
  return (
    <>
      <Layout>
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Layout>
    </>
  );
}

export default App;
