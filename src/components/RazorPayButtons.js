import React, { useEffect } from "react";

export const RazorpayButton = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/payment-button.js";
    script.setAttribute("data-payment_button_id", "pl_PYX8918qBt0Xu8");
    script.async = true;
    document.getElementById("razorpay-button-container").appendChild(script);
  }, []);

  return <form><div id="razorpay-button-container"></div></form>;
};
