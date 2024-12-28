// src/pages/AddProduct.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, message, Select } from 'antd';

const { Option } = Select;

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    imageUrl: '',
    category: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleCategoryChange = (value) => {
    setProduct({ ...product, category: value });
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/products', {
        name: values.name,
        price: parseFloat(values.price),
        description: values.description,
        imageUrl: values.imageUrl,
        category: values.category,
      });
      message.success(`Product added with ID: ${response.data.id}`);
      setProduct({
        name: '',
        price: '',
        description: '',
        imageUrl: '',
        category: '',
      });
    } catch (error) {
      if (error.response) {
        message.error(`Failed to add product: ${error.response.data.message || 'Please try again.'}`);
      } else {
        message.error('An error occurred while adding the product.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onFinish={handleSubmit} layout="vertical">
      <Form.Item label="Product Name" name="name" required>
        <Input name="name" value={product.name} onChange={handleChange} />
      </Form.Item>
      <Form.Item label="Price" name="price" required>
        <Input name="price" type="number" value={product.price} onChange={handleChange} />
      </Form.Item>
      <Form.Item label="Description" name="description" required>
        <Input.TextArea name="description" value={product.description} onChange={handleChange} />
      </Form.Item>
      <Form.Item label="Image URL" name="imageUrl" required>
        <Input name="imageUrl" value={product.imageUrl} onChange={handleChange} />
      </Form.Item>
      <Form.Item label="Category" name="category" required>
        <Select onChange={handleCategoryChange} value={product.category}>
          <Option value="dairy">Dairy</Option>
          <Option value="beverages">Beverages</Option>
          <Option value="vegetables">Vegetables</Option>
          <Option value="fruits">Fruits</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Add Product
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddProduct;