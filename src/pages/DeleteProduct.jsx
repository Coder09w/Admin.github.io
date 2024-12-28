// src/pages/DeleteProduct.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, Button, message, Modal } from 'antd';

const DeleteProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const [deletingId, setDeletingId] = useState(null); // ID of the product to delete

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Set loading to true
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        message.error('Failed to fetch products.');
      } finally {
        setLoading(false); // Set loading to false
      }
    };
    fetchProducts();
  }, []);

  const showDeleteConfirm = (id) => {
    setDeletingId(id); // Set the ID of the product to delete
    Modal.confirm({
      title: 'Are you sure you want to delete this product?',
      content: 'This action cannot be undone.',
      onOk: () => handleDelete(id),
      onCancel: () => setDeletingId(null), // Reset deletingId on cancel
    });
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true); // Set loading to true
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      message.success('Product deleted successfully!');
      setProducts(products.filter(product => product.id !== id)); // Update the product list
    } catch (error) {
      console.error('Error deleting product:', error);
      message.error('Failed to delete product.');
    } finally {
      setLoading(false); // Set loading to false
      setDeletingId(null); // Reset deletingId after deletion
    }
  };

  return (
    <div>
      <h2>Delete Product</h2>
      <List
        bordered
        loading={loading} // Show loading indicator
        dataSource={products}
        renderItem={product => (
          <List.Item>
            {product.name}
            <Button type="danger" onClick={() => showDeleteConfirm(product.id)}>Delete</Button>
          </List.Item>
        )}
      />
    </div>
  );
};

export default DeleteProduct;