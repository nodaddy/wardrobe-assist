import React from "react";
import { Card, Col, Row, Button } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

const pricingData = [
  {
    title: "Free Version",
    price: "$0",
    features: [
      { feature: "Basic Features", available: true },
      { feature: "Limited Support", available: true },
      { feature: "No Customization", available: false },
    ],
    button: "Get Started",
  },
  {
    title: "Subscription",
    price: "$9.99/month",
    features: [
      { feature: "All Basic Features", available: true },
      { feature: "Priority Support", available: true },
      { feature: "Customizable Themes", available: true },
    ],
    button: "Subscribe Now",
  },
  {
    title: "Premium",
    price: "$199 (Lifetime)",
    features: [
      { feature: "All Features Included", available: true },
      { feature: "24/7 Support", available: true },
      { feature: "Lifetime Updates", available: true },
    ],
    button: "Buy Now",
  },
];

const PricingPage = () => {
  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "left", fontWeight: '500' }}>Choose Your Plan</h2>
      <br/>
      <Row gutter={[16, 16]}>
        {pricingData.map((plan, index) => (
          <Col span={24} key={index}>
            <Card
              title={plan.title}
              bordered
              style={{ textAlign: "center" }}
            >
              <h2 style={{ marginBottom: "20px" }}>{plan.price}</h2>
              <ul style={{ textAlign: "left" }}>
                {plan.features.map((item, idx) => (
                  <li key={idx}>
                    {item.available ? (
                      <CheckOutlined style={{ color: "green", marginRight: "8px" }} />
                    ) : (
                      <CloseOutlined style={{ color: "red", marginRight: "8px" }} />
                    )}
                    {item.feature}
                  </li>
                ))}
              </ul>
              <Button type="primary" style={{ marginTop: "20px" }}>
                {plan.button}
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PricingPage;
