import React, { useEffect, useState } from "react";
import { Modal, Button, notification } from "antd";

const LocationPrompt = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    // Check if location is already stored in localStorage
    const storedLocation = localStorage.getItem("userLocation");
    if (!storedLocation) {
      setIsModalVisible(true); // Show modal if no location is stored
    }
  }, []);

  const requestLocationAccess = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          localStorage.setItem("userLocation", JSON.stringify(location));
          notification.success({
            message: "Location Access Granted",
            description: "Your location has been saved successfully.",
          });
          setIsModalVisible(false);
        },
        (error) => {
          notification.error({
            message: "Location Access Denied",
            description: error.message || "Unable to fetch your location.",
          });
          setIsModalVisible(false);
        }
      );
    } else {
      notification.error({
        message: "Geolocation Not Supported",
        description: "Your browser does not support location access.",
      });
      setIsModalVisible(false);
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    notification.info({
      message: "Location Access Skipped",
      description: "You can enable location access later.",
    });
  };

  return (
    <div>
      <Modal
        title="Allow Location Access"
        visible={isModalVisible}
        footer={[
          <Button key="deny" onClick={closeModal}>
            Close
          </Button>,
          <Button key="allow" type="primary" onClick={requestLocationAccess}>
            Allow Location
          </Button>,
        ]}
        closable={false}
      >
        <p>
          We use your location to know the weather conditions and we recommend outfits on that basis. Please allow location access or close this prompt.
        </p>
      </Modal>
    </div>
  );
};

export default LocationPrompt;
