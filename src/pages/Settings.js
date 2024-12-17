import React, { useState, useEffect } from "react";
import { List, Button, Drawer, Form, Input, Typography, notification, Avatar } from "antd";
import { DeleteOutlined, EditOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Banner } from "../components/Banner";
import UserDetailsForm from "../components/UserDetailsForm";

const { Title } = Typography;

export const Settings= () => {
  const [userProfile, setUserProfile] = useState(null);
  const [user, setUser] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [form] = Form.useForm();

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedProfile = localStorage.getItem("userProfile");
    const storedUser = localStorage.getItem("user");

    if (storedProfile) setUserProfile(JSON.parse(storedProfile));
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Update user profile settings
  const updateUserProfile = (values) => {
    const updatedProfile = { ...userProfile, ...values };
    setUserProfile(updatedProfile);
    localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
    notification.success({
      message: "Settings Updated",
      description: "Your profile settings have been successfully updated.",
    });
    setDrawerVisible(false);
  };

  return (
    <div style={{padding: '0px 30px', height: 'calc(100vh - 78px)', overflowY: 'auto', overflowX: 'hidden'}}>
    <Banner icon={<SettingOutlined />} title="Settings" /> 
    <br/>
    <br/>
    <br/>
      {/* Profile Section with img tag */}
      <div style={{ marginBottom: "20px" }}>
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt="User Avatar"
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              marginBottom: "10px",
            }}
          />
        ) : (
          <Avatar
            size={120}
            icon={<UserOutlined />}
            style={{ marginBottom: "10px" }}
          />
        )}
        <Title level={4}>{user?.displayName || "User Name"}</Title>
        <p>{user?.email || "user@example.com"}</p>
      </div>

<br/>
      <div style={{ display: "flex", gap: "15px", marginTop: "20px", justifyContent: 'center' }}>
  <Button
    type="primary"
    icon={<EditOutlined />}
    block
    style={{
      width: 'fit-content',
      display: "flex",
      alignItems: "left",
      justifyContent: "flex-start",
      padding: "10px 20px",
      borderRadius: "8px",
      background: "grey",
    }}
    onClick={() => setDrawerVisible(true)}
  >
    <span>Edit Profile</span>
  </Button>

  <Button
    type="primary"
    danger
    icon={<DeleteOutlined />}
    block
    style={{
      width: 'fit-content',
      display: "flex",
      alignItems: "left",
      justifyContent: "flex-start",
      padding: "10px 20px",
      borderRadius: "8px",
    }}
    onClick={() => {
      localStorage.clear();
      notification.warning({
        message: "Data Cleared",
        description: "All settings have been reset.",
      });
      setUserProfile(null);
      setUser(null);
    }}
  >
    <span>Delete Account</span>
  </Button>
</div>


      {/* Drawer for Editing Profile */}
      <Drawer
        title="Edit Profile"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
      >
       <UserDetailsForm />
      </Drawer>
    </div>
  );
};
