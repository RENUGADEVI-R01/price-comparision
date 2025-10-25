# Price Comparison Website Frontend

A modern, responsive React frontend for a price comparison website built with Vite, Material UI, and React Router.

## 🚀 Features

- **Smart Search**: Dynamic product suggestions as you type
- **Price Comparison**: Compare prices across multiple e-commerce platforms
- **Product Details**: Detailed product information with images and descriptions
- **Trust Scores**: Vendor ratings and trust scores for informed decisions
- **Delivery Info**: Detailed delivery, return policy, and payment information
- **Similar Products**: Product suggestions based on current selection
- **Responsive Design**: Works seamlessly across all devices

## 🛠️ Tech Stack

- **React 18** - Frontend framework
- **Vite** - Build tool and development server
- **Material UI (MUI)** - UI component library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **PapaParse** - CSV parsing (if needed)

## 📦 Installation

1. **Navigate to the project directory:**
   ```bash
   cd price-compare-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:4000
```

### Backend Connection

The frontend expects a backend API running on `http://localhost:4000` with the following endpoints:

- `GET /api/products` - Fetch all products
- `GET /api/products/:id` - Fetch product by ID
- `GET /api/products/search?q=query` - Search products
- `GET /api/suggestions/:id` - Fetch product suggestions
- `GET /api/vendors` - Fetch all vendors
- `GET /api/vendors/product/:id` - Fetch product listings

## 📁 Project Structure

```
price-compare-frontend/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx          # Smart search with suggestions
│   │   ├── CompareTable.jsx       # Price comparison table
│   │   ├── ViewMoreModal.jsx      # Detailed product info modal
│   │   ├── Suggestions.jsx        # Similar products section
│   │   └── ProductCard.jsx        # Product card component
│   ├── pages/
│   │   ├── Home.jsx              # Landing page with search
│   │   └── ComparePage.jsx       # Product comparison page
│   ├── services/
│   │   └── api.js                # API service functions
│   ├── App.jsx                   # Main app with routing
│   ├── main.jsx                  # App entry point
│   └── index.css                 # Global styles
├── .env                          # Environment variables
├── package.json                  # Dependencies and scripts
└── vite.config.js               # Vite configuration
```

## 🎨 Design System

### Color Palette
- **Primary**: #f2aa00 (Golden Yellow)
- **Background**: #fffbea (Light Cream)
- **Text**: #333 (Dark Gray)

### Typography
- **Font Family**: Roboto, Helvetica, Arial
- **Weights**: Regular, Bold

## 🔄 Application Flow

1. **Home Page**: User searches for products using the smart search bar
2. **Search Suggestions**: Dynamic suggestions appear as user types
3. **Product Selection**: User clicks on a product suggestion
4. **Compare Page**: Navigate to `/compare/:id` with product details
5. **Price Comparison**: View comparison table with multiple vendors
6. **View More**: Click "View More" to see detailed delivery/payment info
7. **Similar Products**: Browse suggested similar products at the bottom

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🔗 API Integration

The frontend integrates with your existing backend through the API service (`src/services/api.js`). Make sure your backend is running and accessible at the configured URL.

## 🎯 Key Components

### SearchBar
- Real-time search suggestions
- Debounced API calls
- Loading states
- Error handling

### CompareTable
- Vendor comparison
- Trust scores and ratings
- Price formatting
- Action buttons (Visit, View More)

### ViewMoreModal
- Delivery information
- Payment options
- Return policy
- Additional details

### Suggestions
- Similar products
- Product cards with compare buttons
- Responsive grid layout

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Error**: Ensure backend is running on `http://localhost:4000`
2. **CORS Issues**: Configure CORS in your backend to allow requests from `http://localhost:3000`
3. **Missing Images**: Placeholder images are used for missing product images

### Development Tips

- Use browser dev tools to inspect API calls
- Check console for error messages
- Verify environment variables are loaded correctly

## 📄 License

This project is part of a price comparison website system.

