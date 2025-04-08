import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap'; // Import Nav
import { LinkContainer } from 'react-router-bootstrap'; // Import LinkContainer

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <Container>
        {/* --- NEW LINKS ROW --- */}
        <Row className="py-3">
          <Col className="text-center">
            <Nav className="justify-content-center">
              <LinkContainer to='/about-contact'>
                <Nav.Link className='px-2'>About & Contact Us</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/faq'>
                <Nav.Link className='px-2'>FAQ</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/terms'>
                <Nav.Link className='px-2'>Terms & Conditions</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/privacy'>
                <Nav.Link className='px-2'>Privacy Policy</Nav.Link>
              </LinkContainer>
            </Nav>
          </Col>
        </Row>
        {/* --- END NEW LINKS ROW --- */}

        <Row>
          <Col className='text-center py-3'>
            Copyright &copy; Venteshop {currentYear} {/* Used store name from Header */}
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;