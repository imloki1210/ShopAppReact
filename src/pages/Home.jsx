import React, { useEffect, useState } from 'react';
import Product from '../components/Product';
import Spinner from '../components/Spinner';
import FiltersSidebar from '../components/FiltersSidebar';

const Home = (props) => {
  const API_URL = "https://fakestoreapi.com/products";
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  const filters = [
    { title: 'CLOTHING', options: [ { label: "Men's", value: 'men\'s clothing' }, { label: "Women's", value: 'women\'s clothing' }, { label: 'All', value: 'all-clothing' }] },
    { title: 'ITEMS', options: [ { label: 'Electronics', value: 'electronics' }, { label: 'Jewelry', value: 'jewelery' } ] }
  ];

  const fetchProductionData = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setProducts(data);
      setFilteredProducts(data); // Initialize filtered products with all products
    } catch (error) {
      setProducts([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProductionData();
  }, []);

  const handleFilterChange = (selectedFilters) => {
    let filtered = [...products];

    const clothingFilters = selectedFilters['CLOTHING'] || [];
    const itemFilters = selectedFilters['ITEMS'] || [];

    // Apply Clothing Filters
    if (clothingFilters.length > 0) {
      if (clothingFilters.includes('all-clothing')) {
        filtered = filtered.filter(product => product.category.includes('clothing'));
      } else {
        filtered = filtered.filter(product => clothingFilters.some(filter => product.category === filter));
      }
    }

    // Apply Items Filters
    if (itemFilters.length > 0) {
      filtered = filtered.filter(product => itemFilters.some(filter => product.category === filter));
    }

    // If no filters are selected show all products
    if (clothingFilters.length === 0 && itemFilters.length === 0) {
      filtered = products;
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className="flex mx-16">
  {/* Sidebar */}
  <div
    className={`transition-all duration-300 ${
      props.showNavbar ? "w-1/6" : "w-0"
    }`}
  >
    {props.showNavbar && (
      <FiltersSidebar filters={filters} onFilterChange={handleFilterChange} />
    )}
  </div>

  {/* Product Grid */}
  <div
    className={`transition-all duration-300 ${
      props.showNavbar ? "w-5/6" : "w-full"
    }`}
  >
    {loading ? (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((post) => (
            <Product key={post.id} post={post} />
          ))
        ) : (
          <div className="flex justify-center items-center col-span-full">
            <p>No data found</p>
          </div>
        )}
      </div>
    )}
  </div>
</div>

  );
};

export default Home;
