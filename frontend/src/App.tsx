import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const BenchMap = React.lazy(() => import('./components/BenchMap'));
const BenchList = React.lazy(() => import('./components/BenchList'));
const Sitemap = React.lazy(() => import('./components/Sitemap'));
const TermsAndConditions = React.lazy(() => import('./components/TermsAndConditions'));
const PrivacyPolicy = React.lazy(() => import('./components/PrivacyPolicy'));
const ReviewBench = React.lazy(() => import('./components/ReviewBench'));

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
        <React.Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {routes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Routes>
        </React.Suspense>
      </Layout>
    </>
  );
}

export default App;
