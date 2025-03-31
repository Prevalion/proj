import { Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Loader from '../components/Loader';
import Message from '../components/Message';
import Product from '../components/Product';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        //le chemin le prend depuis proxy dans package.json de frontend
        const { data } = await axios.get('/api/products');
        setProducts(data.products || data); // Handle both pagination and non-pagination responses
        setIsLoading(false);
      } catch (err) {
        setError(err.response && err.response.data.message 
          ? err.response.data.message 
          : err.message);
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);
 
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.message || error}
        </Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;