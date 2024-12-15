import React, { useState } from 'react';
import { Form, Input, Select, Button, Upload, message } from 'antd';
import { FileAddOutlined, PlusOutlined } from '@ant-design/icons';
import { createOrUpdateWardrobeItem, createWardrobeItem, updateWardrobeItem } from '../services/wardrobeItems';
import { uploadImageToFirebase } from '../services/storageService';

const { Option } = Select;

const UploadOutfitForm = () => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState(null);

  const onFinish = (values) => {
    console.log('Received values of form:', values);
    if(imageUrl) {
      values.imageUrl = imageUrl;
      createOrUpdateWardrobeItem(values);
    } else {
        message.error('Please upload an image');
    }
     
    // Handle form submission, e.g., send data to server
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      onFinish={onFinish}
      initialValues={{}}
      autoComplete="off"
      align="left"
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input the title of the outfit item!',
          },
        ]}
      >
        <Input placeholder="What would you like to call this item?" />
      </Form.Item>

      <Form.Item
        label="Describe color/print/design"
        name="colors"
        rules={[
          {
            required: true,
            message: 'Please select a color!',
          },
        ]}
      >
      <Input placeholder="e.g. Red, white with black stripes, green with blue dots etc." />
      </Form.Item>

      <Form.Item
        label="Type"
        name="type"
        rules={[
          {
            required: true,
            message: 'Please select a type!',
          },
        ]}
      >
        <Select placeholder="Select a type">
          <Option value="top">Top</Option>
          <Option value="bottom">Bottom</Option>
          <Option value="shoes">Footwear</Option>
          <Option value="shoes">Other Accessories</Option>
          {/* Add more options as needed */}
        </Select>
      </Form.Item>

      <Form.Item
        label="Category"
        name="category"
        rules={[
          {
            required: true,
            message: 'Please select a category!',
          },
        ]}
      >
        <Select placeholder="Select a category">
          <Option value="formals">Formals</Option>
          <Option value="casuals">Casuals</Option>
          {/* Add more options as needed */}
        </Select>
      </Form.Item>

      <Form.Item
        label="Image"
        name="imageUrl"
        rules={[
          {
            message: 'Please upload an image!',
          },
        ]}
      >
        <input type="file" accept="image/*" onChange={(e) => {
          const file = e.target.files[0];
          uploadImageToFirebase(file, 'wardrobeItems').then((url) => {
            setImageUrl(url);
          }).catch((error) => {
            console.log(error);
          });
        }} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 0, span: 14 }}>
        <button type="primary" htmlType="submit">
          Submit
        </button>
      </Form.Item>
    </Form>
  );
};

export default UploadOutfitForm;