import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const AboutContactScreen = () => {
  // Placeholder state for contact form
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    // Placeholder: Add logic to send the contact message
    console.log('Form submitted:', { name, email, message });
    alert('Thank you for your message!'); // Replace with actual success handling
    // Reset form
    setName('');
    setEmail('');
    setMessage('');
  };


  return (
    <Container>
      <Row className="my-5">
        <Col md={6}>
          <h2>About Us</h2>
          <p>
            Welcome to [Your Store Name]! We are passionate about providing...
            [Add your store's story, mission, or values here].
          </p>
          <p>
            Our commitment is to offer high-quality products and excellent customer service...
            [Continue with more details about your business].
          </p>
        </Col>
        <Col md={6}>
          <h2>Contact Us</h2>
          <p>Have questions? Fill out the form below, and we'll get back to you soon!</p>
          <p>
            <strong>Address:</strong> [Your Business Address, Optional]<br/>
            <strong>Phone:</strong> [Your Phone Number, Optional]<br/>
            <strong>Email:</strong> [Your Contact Email Address]
          </p>
          <hr/>
          <h5>Send us a message:</h5>
           <Form onSubmit={submitHandler}>
             <Form.Group controlId='name' className='my-2'>
               <Form.Label>Name</Form.Label>
               <Form.Control
                 type='text'
                 placeholder='Enter name'
                 value={name}
                 onChange={(e) => setName(e.target.value)}
                 required
               ></Form.Control>
             </Form.Group>

             <Form.Group controlId='email' className='my-2'>
               <Form.Label>Email Address</Form.Label>
               <Form.Control
                 type='email'
                 placeholder='Enter email'
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 required
               ></Form.Control>
             </Form.Group>

             <Form.Group controlId='message' className='my-2'>
               <Form.Label>Message</Form.Label>
               <Form.Control
                 as='textarea'
                 rows={3}
                 placeholder='Your message'
                 value={message}
                 onChange={(e) => setMessage(e.target.value)}
                 required
               ></Form.Control>
             </Form.Group>

             <Button type='submit' variant='primary' className='my-3'>
               Send Message
             </Button>
           </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutContactScreen;