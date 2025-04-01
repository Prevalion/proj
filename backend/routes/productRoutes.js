import express from 'express';
const router = express.Router();
import { 
  getProducts, 
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// Route /api/products
router.route('/')
  .get(getProducts)
  .post(protect, admin, createProduct);

// Route /api/products/top
router.get('/top', getTopProducts);

// Route /api/products/:id
router.route('/:id')
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

// Route /api/products/:id/reviews
router.route('/:id/reviews')
  .post(protect, createProductReview);

export default router;