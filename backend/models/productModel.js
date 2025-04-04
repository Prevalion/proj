import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Reference to the User model
    },
    name: {
      // Denormalized user name for easier display
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = mongoose.Schema(
  {
    user: {
      // User who created the product (admin)
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'Please provide a product name'],
      trim: true, // Remove whitespace from ends
    },
    image: {
      type: String,
      required: [true, 'Please provide a product image URL'],
      default: '/images/sample.jpg', // Default image if not provided
    },
    brand: {
      type: String,
      required: [true, 'Please provide a product brand'],
    },
    category: {
      type: String,
      required: [true, 'Please provide a product category'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a product description'],
    },
    reviews: [reviewSchema], // Embed reviews within the product document
    rating: {
      // Average rating, calculated from reviews
      type: Number,
      required: true,
      default: 0,
      min: 0,
      max: 5,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'Please provide a product price'],
      default: 0,
      min: 0,
    },
    countInStock: {
      type: Number,
      required: [true, 'Please provide product stock count'],
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// --- Indexes ---
// Index on name for faster lookups/sorting
productSchema.index({ name: 1 });
// Index on price for sorting/filtering by price
productSchema.index({ price: 1 });
// Index on category and brand for filtering
productSchema.index({ category: 1 });
productSchema.index({ brand: 1 });
// Index on user for finding products by creator
productSchema.index({ user: 1 });
// Text index for searching across name, description, brand, category
productSchema.index(
  {
    name: 'text',
    description: 'text',
    brand: 'text',
    category: 'text',
  },
  {
    weights: {
      name: 10, // Give higher weight to matches in 'name'
      brand: 5,
      category: 3,
      description: 1,
    },
    name: 'ProductTextIndex', // Optional: name the index
  }
);


const Product = mongoose.model('Product', productSchema);

export default Product;
