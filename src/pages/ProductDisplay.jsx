// src/pages/ProductDisplay.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, Card, Spin, message, Input } from 'antd';

const ProductDisplay = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        message.error('Failed to fetch products.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Available Products</h2>
      <Input
        placeholder="Search products..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        style={{ marginBottom: '20px' }}
      />
      {loading ? (
        <Spin />
      ) : (
        <List
          grid={{ gutter: 16, column: 3 }}
          dataSource={filteredProducts}
          renderItem={product => (
            <List.Item>
              <Card title={product.name}>
                <p>{product.description}</p> {/* Fixed the closing tag */}
                <p>Price: ${product.price}</p>
                <img src={product.imageUrl} alt={product.name} style={{ width: '100%' }} />
              </Card>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default ProductDisplay;