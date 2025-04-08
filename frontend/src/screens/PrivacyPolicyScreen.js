import React from 'react';
import { Container } from 'react-bootstrap';

const PrivacyPolicyScreen = () => {
  return (
    <Container className="my-5">
      <h2>Privacy Policy</h2>
      <p>Last Updated: [Date]</p>

      <p>[Your Store Name] ("us", "we", or "our") operates the [Your Website URL] website (the "Service").</p>

      <p>This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.</p>

      <h4>1. Information Collection and Use</h4>
      <p>We collect several different types of information for various purposes to provide and improve our Service to you.</p>
      <h5>Types of Data Collected:</h5>
      <ul>
        <li><strong>Personal Data:</strong> Email address, First name and last name, Phone number, Address, Cookies and Usage Data...</li>
        <li><strong>Usage Data:</strong> Information on how the Service is accessed and used...</li>
        <li><strong>Tracking & Cookies Data:</strong> We use cookies and similar tracking technologies...</li>
      </ul>

      <h4>2. Use of Data</h4>
      <p>[Your Store Name] uses the collected data for various purposes:</p>
      <ul>
        <li>To provide and maintain the Service</li>
        <li>To notify you about changes to our Service</li>
        <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
        <li>To provide customer care and support</li>
        <li>To provide analysis or valuable information so that we can improve the Service</li>
        <li>To monitor the usage of the Service</li>
        <li>To detect, prevent and address technical issues</li>
      </ul>

      <h4>3. Transfer Of Data</h4>
      <p>[Explain if data is transferred outside the user's country and the safeguards...]</p>

      <h4>4. Disclosure Of Data</h4>
      <p>[Explain circumstances under which data might be disclosed, e.g., legal requirements...]</p>

      <h4>5. Security Of Data</h4>
      <p>The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure...</p>

      <h4>6. Your Data Protection Rights</h4>
      <p>[Outline user rights, e.g., access, correction, deletion, depending on applicable laws like GDPR or CCPA...]</p>

      {/* Add other sections as needed: Service Providers, Links To Other Sites, Children's Privacy, Changes To This Privacy Policy, Contact Us */}

      <p><strong>It is highly recommended to consult with a legal professional to ensure your Privacy Policy complies with all relevant laws and regulations (like GDPR, CCPA, etc.) applicable to your business and customers.</strong></p>

    </Container>
  );
};

export default PrivacyPolicyScreen;