import React, { useState } from "react";
import { Form, Input, Select, Radio, Button, Alert, message } from "antd";
import { ArrowRightOutlined, EditFilled } from "@ant-design/icons";
import { set } from "firebase/database";
import { createOrUpdateUserProfile } from "../services/profileService";
import { Loader } from "./Loader";

const { Option } = Select;

const UserDetailsForm = () => {
  const [form] = Form.useForm();

  const [savingData, setSavingData] = useState(false);

  const handleSubmit = (values) => {
    setSavingData(true);
    createOrUpdateUserProfile(values).then(() => {
      setSavingData(false);
      window.location.reload();
    }).catch(() => {
      setSavingData(false);
      message.error('Something went wrong');
    });
    console.log("Form Values:", values);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h2 align="left" style={{ fontWeight: '500' }}> &nbsp; &nbsp; <EditFilled /> &nbsp; User Details</h2>
      <Alert message="These details will be used to customize our suggestions for you" type="info"></Alert>
      <br/>
      <br/>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{
          border: "1px solid #d9d9d9",
          padding: "20px",
          borderRadius: "8px",
          background: "#f9f9f9",
        }}
      >
        {/* Build Field */}
        <Form.Item
          label="Body Build"
          name="build"
          rules={[{ required: true, message: "Please select your build!" }]}
        >
          <Select placeholder="Select your build">
            <Option value="hourglass">Hourglass Build (Female)</Option>
            <Option value="pear">Pear Build (Female)</Option>
            <Option value="rectangle">Rectangle Build (Female)</Option>
            <Option value="apple">Apple Build (Female)</Option>
            <Option value="inverted-triangle">Inverted Triangle Build (Female)</Option>
            <Option value="triangle">Triangle Build (Male)</Option>
            <Option value="inverted-triangle-male">Inverted Triangle Build (Male)</Option>
            <Option value="rectangle-male">Rectangle Build (Male)</Option>
            <Option value="oval">Oval Build (Male)</Option>
            <Option value="trapezoid">Trapezoid Build (Male)</Option>
            <Option value="slim">Slim Build (Gender-Neutral)</Option>
            <Option value="athletic">Athletic Build (Gender-Neutral)</Option>
            <Option value="curvy">Curvy Build (Gender-Neutral)</Option>
            <Option value="stocky">Stocky Build (Gender-Neutral)</Option>

          </Select>
        </Form.Item>

        {/* Skin Tone Field */}
        <Form.Item
          label="Skin Tone"
          name="skinTone"
          rules={[{ required: false, message: "Please select your skin tone!" }]}
        >
          <Select placeholder="Select your skin tone">
            <Option value="dark">Dark</Option>
            <Option value="medium">Medium</Option>
            <Option value="light">Light</Option>
          </Select>
        </Form.Item>

        {/* Height Field */}
        <Form.Item
          label="Height"
          name="height"
          rules={[{ required: false, message: "Please enter your height!" }]}
        >
          <Input placeholder="Enter your height (e.g., 5'9)" />
        </Form.Item>

        {/* Gender Field */}
        <Form.Item
          label="Body Type"
          name="gender"
          rules={[{ required: true, message: "Please select your gender!" }]}
        > 
        <div align="left">
          <input type="radio" name="gender" value="male" /> Male &nbsp;&nbsp;&nbsp;
          <input type="radio" name="gender" value="female" /> Female &nbsp;&nbsp;&nbsp;
        </div>
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
        <div align="right">
          <button style={{ padding: '5px 15px'}} type="primary" htmlType="submit" onSubmit={() => {
            handleSubmit();
          }}>
            {savingData ? <Loader /> : <>Submit &nbsp; <ArrowRightOutlined /></>}
          </button>
        </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserDetailsForm;
