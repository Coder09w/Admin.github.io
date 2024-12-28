// src/pages/UpdateProduct.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Form, Input, Button, message, Spin } from 'antd';

const UpdateProduct = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState({ name: '', price: '', description: '', imageUrl: '', category: '' });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      console.log('Fetching product with ID:', id); // Log the ID
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
        if (error.response) {
          message.error(`Failed to fetch product details: ${error.response.data.message || 'Product not found.'}`);
        } else {
          message.error('Failed to fetch product details. Please check your network connection.');
        }
      } finally {
        setFetching(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Validate input data
      if (!values.name || !values.price || !values.description || !values.imageUrl || !values.category) {
        message.error('All fields are required.');
        return;
      }

      // Send PUT request to update the product
      const response = await axios.put(`http://localhost:5000/api/products/${id}`, values);
      message.success('Product updated successfully!');
    } catch (error) {
      console.error('Error updating product:', error);
      if (error.response) {
        message.error(`Failed to update product: ${error.response.data.message}`);
      } else {
        message.error('Failed to update product. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <Spin />;
  }

  return (
    <div>
      <h2>Update Product</h2>
      <Form onFinish={handleSubmit} initialValues={product}>
        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input the product name!' }]}>
          <Input name="name" value={product.name} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Please input the product price!' }]}>
          <Input name="price" type="number" value={product.price} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea name="description" value={product.description} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Image URL" name="imageUrl">
          <Input name="imageUrl" value={product.imageUrl} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Category" name="category" rules={[{ required: true, message: 'Please select a category!' }]}>
          <Input name="category" value={product.category} onChange={handleChange} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Update Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateProduct;