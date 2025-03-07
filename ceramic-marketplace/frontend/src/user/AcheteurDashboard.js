import { useState, useEffect } from "react";
import "../styles/Shop.css";
import { Search, Tag, ShoppingCart, Heart, GitCompare, PlusCircle } from "lucide-react"; 

const Index = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [inStock, setInStock] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(3);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/products?search=${searchTerm}&category=${category}&sort=${sortOrder}&inStock=${inStock}`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setProducts(data);
        
        const calculatedTotalPages = Math.ceil(data.length / 8);
        setTotalPages(calculatedTotalPages > 0 ? calculatedTotalPages : 1);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, [searchTerm, category, sortOrder, inStock]);

  const handleProductClick = (id) => {
    console.log(`Navigate to product details: /product/${id}`);
  };

  const formatPrice = (price) => {
    if (price === undefined) return "N/A"; 
    return `Rp ${price.toLocaleString()}`;
  };