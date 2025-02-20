import React from 'react';
import { Container, Col,Row } from 'react-bootstrap';

const Footer: React.FC = () => {
  return (
    <footer className="bg-light py-4">
    <Container>
      <Row>
        {/* <Col md={4}>
          <ul className="list-unstyled">
            <h6>Links</h6>
            <li><a href="#link1">Link One</a></li>
            <li><a href="#link2">Link Two</a></li>
            <li><a href="#link3">Link Three</a></li>
          </ul>
        </Col> */}
        <Col md={4}>
          <ul className="list-unstyled">
            <h6>Socials</h6>
            <li><a href="https://linktr.ee/avaines">Linktree</a></li>
            <li><a href="https://www.vaines.org">My Blog</a></li>
            {/* <li><a href="#instagram">Instagram</a></li> */}
          </ul>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <p>© {new Date().getFullYear()} Vaines.org. All rights reserved.</p>
        </Col>
      </Row>
    </Container>
  </footer>
  );
};

export default Footer;
