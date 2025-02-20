import { ReactNode } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Navigation from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
    <div className="d-flex flex-column min-vh-100">
      <Navigation />
      <main className="flex-grow-1">
        <Container className="my-5">
          <Row className="justify-content-center">
            <Col md={8}>
              {children}
            </Col>
          </Row>
        </Container>
      </main>
      <Footer />
    </div>
    </>
  );
};

export default Layout;