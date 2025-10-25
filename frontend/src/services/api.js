//src/ser
import axios from "axios";

// Prefer using Vite dev proxy in development. If VITE_API_URL is set, use it.
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "",
});

// Products API
export const fetchProducts = () => API.get("/api/products");
export const fetchProductById = (id) => API.get(`/api/products/id/${id}`);
export const searchProducts = (query) => API.get(`/api/products/search?q=${encodeURIComponent(query)}`);
export const fetchFilterMeta = () => API.get(`/api/products/filters/meta`);

// Suggestions API
export const fetchSuggestions = (id) => API.get(`/api/products/${id}/suggestions`);

// Vendors/Listings API
export const fetchVendors = () => API.get("/api/vendors");
export const fetchProductListings = (productId) => API.get(`/api/vendors/product/${productId}`);

export default API;
