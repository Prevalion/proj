import React from 'react';
import { Container, Accordion } from 'react-bootstrap';

const FAQScreen = () => {
  // Placeholder FAQ data - replace with your actual FAQs
  const faqs = [
    {
      question: 'How do I place an order?',
      answer: 'Simply browse our products, add items to your cart, and proceed to checkout. Follow the on-screen instructions to enter shipping and payment information.'
    },
    {
      question: 'What are the shipping options?',
      answer: 'We offer standard and express shipping. Costs and delivery times vary based on location. You can see the options during checkout.'
    },
    {
      question: 'How can I track my order?',
      answer: 'Once your order ships, you will receive an email with a tracking number and link. You can also track your order status in your account profile page.'
    },
     {
      question: 'What is your return policy?',
      answer: 'Please refer to our Terms & Conditions page for detailed information about returns and exchanges.'
    },
    // Add more FAQs as needed
  ];

  return (
    <Container className="my-5">
      <h2>Frequently Asked Questions</h2>
      <Accordion defaultActiveKey="0" flush className="mt-4">
        {faqs.map((faq, index) => (
          <Accordion.Item eventKey={String(index)} key={index}>
            <Accordion.Header>{faq.question}</Accordion.Header>
            <Accordion.Body>{faq.answer}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
};

export default FAQScreen;