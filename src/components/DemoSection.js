import React from "react";
import { Steps, Card } from "antd";
import { UploadOutlined, ThunderboltOutlined, ShoppingOutlined } from "@ant-design/icons";

const { Step } = Steps;

const DemoSection = () => {
  return (
    <div style={styles.container}>
      <Card style={styles.card} bodyStyle={styles.cardBody}>
        <h2 style={styles.heading}>How It Works</h2>
        <Steps
          direction="vertical"
          size="small"
          progressDot
          current={3}
          style={styles.steps}
        >
          <Step
            title="Upload Images"
            description="Add pictures of your clothes to create your wardrobe."
            icon={<UploadOutlined style={styles.icon} />}
          />
          <Step
            title="Get Outfit Suggestions"
            description="Receive tailored outfit ideas based on the occasion, weather, your body type, and more."
            icon={<ThunderboltOutlined style={styles.icon} />}
          />
          <Step
            title="Enhance Your Wardrobe"
            description="Discover items you can buy to elevate your style and expand your collection."
            icon={<ShoppingOutlined style={styles.icon} />}
          />
        </Steps>
      </Card>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    background: "linear-gradient(#f0f2f5, white)", // Light gray background for a clean look
    // minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    maxWidth: "400px",
    width: "100%",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  cardBody: {
    padding: "20px",
  },
  heading: {
    fontSize: "22px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  steps: {
    gap: "20px",
  },
  icon: {
    color: "#1890ff", // Ant Design primary color
    fontSize: "20px",
  },
};

export default DemoSection;
