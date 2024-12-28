// src/pages/ProductList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { List, Button, message, Spin, Input } from 'antd';

const ProductList = () => {
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

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      message.success('Product deleted successfully!');
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
      message.error('Failed to delete product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Filter products based on search term
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <Spin />;
  }

  return (
    <div>
      <h2>Product List</h2>
      <Input
        placeholder="Search products..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        style={{ marginBottom: '20px' }}
      />
      <Link to="/add">
        <Button type="primary" style={{ marginBottom: '20px' }}>Add Product</Button>
      </Link>
      <List
        bordered
        dataSource={filteredProducts} // Use filtered products
        renderItem={product => (
          <List.Item>
            <List.Item.Meta
              title={product.name}
              description={`Price: $${product.price} - Category: ${product.category}`}
            />
            <Link to={`/update/${product.id}`}>
              <Button type="link">Update</Button> {/* Update button */}
            </Link>
            <Button type="link" danger onClick={() => handleDelete(product.id)}>
              Delete
            </Button>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ProductList;