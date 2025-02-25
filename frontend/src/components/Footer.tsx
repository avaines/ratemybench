import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer: React.FC = () => {
  return (
    <footer className="bg-light py-4 border-top">
      <Container>
        <Row className="justify-content-between">
          <Col lg={4} className="mb-4 mb-lg-0">
            <h5>RateMyBench</h5>
            <p className="text-muted mt-4 max-w-sm">
              A Silly project to rate benches. RateMyBench is a platform where you can rate benches and leave reviews. This was just a silly project to learn more about React, Typescript, and Cloudflare Workers, full source code available on <a href="https://github.com/avaines/ratemybench">Github</a>
            </p>
            <div className="d-flex mt-2">
              <div className="d-flex space-x-2 mt-2">
                <h2><a href="https://www.vaines.org"><i className="bi bi-globe text-muted-foreground hover:text-foreground transition-colors" style={{ textDecoration: 'none', color: 'black' }}></i></a></h2>
                <h2><a href="https://linktr.ee/avaines"><i className="bi bi-signpost-2-fill text-muted-foreground hover:text-foreground transition-colors" style={{ textDecoration: 'none', color: 'black' }}></i></a></h2>
                <h2><a href="https://github.com/avaines/ratemybench"><i className="bi bi-github text-muted-foreground hover:text-foreground transition-colors" style={{ textDecoration: 'none', color: 'black' }}></i></a></h2>
              </div>
            </div>
          </Col>
          <Col lg={4} className="mt-4 mt-lg-0">
            <ul className="list-unstyled space-y-4">
              <li><a href="/about" className="text-muted hover:text-dark">About</a></li>
              <li><a href="/sitemap" className="text-muted hover:text-dark">Sitemap</a></li>
              <li><a href="/privacy-policy" className="text-muted hover:text-dark">Privacy Policy</a></li>
              <li><a href="/terms-and-conditions" className="text-muted hover:text-dark">Terms and Conditions</a></li>
            </ul>
          </Col>
        </Row>
        <Row className="border-top pt-4 mt-4">
          <Col>
            <p className="text-center text-muted">© {new Date().getFullYear()} Vaines.org. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
