import React, { useState } from 'react';
import { Form, Input, Select, Button, Upload, message, Spin, notification } from 'antd';
import { FileAddOutlined, PlusOutlined } from '@ant-design/icons';
import { createOrUpdateWardrobeItem, createWardrobeItem, updateWardrobeItem } from '../services/wardrobeItems';
import { uploadImageToFirebase } from '../services/storageService';

const { Option } = Select;

const UploadOutfitForm = () => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [savingData, setSavingData] = useState(false);

  const onFinish = (values) => {
    console.log('Received values of form:', values);
    if(imageUrl) {
      values.imageUrl = imageUrl;
      setSavingData(true);
      createOrUpdateWardrobeItem(values).then(()=>{
        // resest form fields
        form.resetFields();
        notification.success({
          message: 'Item added successfully',
          placement: 'topRight'
        })
        setSavingData(false);
      })
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
          setUploadingImage(true);
          uploadImageToFirebase(file, 'wardrobeItems').then((url) => {
            setImageUrl(url);
            setUploadingImage(false);
          }).catch((error) => {
            console.log(error);
            setUploadingImage(false);
          });
        }} />
      </Form.Item>
      {uploadingImage && <p>Uploading image... <Spin size="small" /></p>}

      <Form.Item wrapperCol={{ offset: 0, span: 14 }}>
        <button
        disabled={!imageUrl}
        style={{
          width: '100%',
          height: '40px',
          borderRadius: '5px',
          border: 'none',
          backgroundColor: '#f0f0f0',
        }} type="primary" htmlType="submit">
          {savingData ? <Spin size="small" /> : 'Submit'}
        </button>
      </Form.Item>
    </Form>
  );
};

export default UploadOutfitForm;