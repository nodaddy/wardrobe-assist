

import React, { useEffect } from 'react';

export const RazorpayButton = ({ options }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/payment-button.js";
    script.setAttribute("data-payment_button_id", "pl_PYX8918qBt0Xu8");
    script.async = true;
    document.getElementById("razorpay-button-container").appendChild(script);

    const onPaymentSuccess = (response) => {
      const { razorpay_payment_id } = response;
      console.log("Payment successful:", razorpay_payment_id);
    };

    const onPaymentFailure = (error) => {
      console.error("Payment failed:", error);
    };

    window.addEventListener('payment.success', onPaymentSuccess);
    window.addEventListener('payment.failed', onPaymentFailure);

    return () => {
      window.removeEventListener('payment.success', onPaymentSuccess);
      window.removeEventListener('payment.failed', onPaymentFailure);
    };
  }, []);

  return (
    <div id="razorpay-button-container"></div>
  );
};