import React, { useState } from "react";
import { Modal, Button, Alert } from "antd";
import { RazorpayButton } from "./RazorPayButtons";

const PaymentsPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={styles.container}>
        <br/>
        <Alert style={{fontSize: '18px'}} message={<>😔 You have exhausted your free trial limit of 4 wardrobe items</>} type="warning" />
        
      <h2 style={styles.heading}> Limited-Time Offer </h2>
      <p style={styles.subheading}>
        Unlock the ultimate wardrobe assistant and transform your style!
      </p>
      <div style={styles.pricingBox}>
        <p style={styles.originalPrice}>
          Original Price: <del>₹1600</del>
        </p>
        <p style={styles.discountedPrice}>
          Discounted Price: <strong>₹599</strong>
        </p>
        <p style={styles.offerText}>Hurry! Limited time offer.</p>
      </div>
      <RazorpayButton />
      <br/>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    maxWidth: "600px",
    margin: "0px auto",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#e74c3c",
    marginBottom: "5px",
  },
  subheading: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "20px",
  },
  pricingBox: {
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
  },
  originalPrice: {
    fontSize: "16px",
    color: "gray",
    marginBottom: "5px",
  },
  discountedPrice: {
    fontSize: "22px",
    color: "#164a97",
    marginBottom: "10px",
  },
  offerText: {
    fontSize: "14px",
    color: "#e74c3c",
    fontStyle: "italic",
  },
  buyButton: {
    backgroundColor: "#27ae60",
    borderColor: "#27ae60",
    fontSize: "18px",
    padding: "10px 20px",
  },
  modalContent: {
    textAlign: "center",
    padding: "20px",
  },
  modalText: {
    fontSize: "16px",
    marginBottom: "15px",
  },
  modalPrice: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#27ae60",
    marginBottom: "20px",
  },
  razorpay: {
    display: "inline-block",
    margin: "auto",
  },
};

export default PaymentsPage;
