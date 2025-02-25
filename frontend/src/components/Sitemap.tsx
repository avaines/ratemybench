import { Link } from 'react-router-dom';
import { routes } from '../App';

const Sitemap = () => {
  return (
    <div>
      <h1>Sitemap</h1>
      <ul>
        {routes.map((route) => (
          <li key={route.path}>
            <Link to={route.path}>{route.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sitemap;
