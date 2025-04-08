import React from 'react';
import { Container } from 'react-bootstrap';

const TermsScreen = () => {
  return (
    <Container className="my-5">
      <h2>Terms & Conditions</h2>
      <p>Last Updated: [Date]</p>

      <p>Welcome to [Your Store Name]! These terms and conditions outline the rules and regulations for the use of [Your Store Name]'s Website, located at [Your Website URL].</p>

      <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use [Your Store Name] if you do not agree to take all of the terms and conditions stated on this page.</p>

      <h4>1. Introduction</h4>
      <p>[Add your detailed introduction text here...]</p>

      <h4>2. Intellectual Property Rights</h4>
      <p>[Add details about ownership of content, logos, etc. ...]</p>

      <h4>3. Restrictions</h4>
      <p>[Detail what users are restricted from doing on your site...]</p>

      <h4>4. Your Content</h4>
      <p>[Explain terms related to any content users might submit...]</p>

      <h4>5. No warranties</h4>
      <p>This Website is provided "as is," with all faults, and [Your Store Name] express no representations or warranties, of any kind related to this Website or the materials contained on this Website...</p>

      <h4>6. Limitation of liability</h4>
      <p>[Outline limitations of your liability...]</p>

      <h4>7. Indemnification</h4>
      <p>You hereby indemnify to the fullest extent [Your Store Name] from and against any and/or all liabilities...</p>

      {/* Add other sections as needed: Severability, Variation of Terms, Assignment, Entire Agreement, Governing Law & Jurisdiction */}

      <p><strong>Please consult with a legal professional to ensure your Terms & Conditions are comprehensive and legally sound for your specific business and location.</strong></p>

    </Container>
  );
};

export default TermsScreen;