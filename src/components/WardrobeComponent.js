import React, { useEffect, useRef, useState } from "react";
import "./Wardrobe.css";
import { Drawer, Spin } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Loader } from "./Loader";
import { deleteWardrobeItem } from "../services/wardrobeItems";

export const WardrobeComponent = ({ list, loading }) => {
  const containerRef = useRef(null);

  const [removingItem, setRemovingItem] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    const isOverlapping = (el, left, top, size) => {
      const rect = el.getBoundingClientRect();
      const centerX = left + size / 2;
      const centerY = top + size / 2;
      const elCenterX = rect.left + rect.width / 2;
      const elCenterY = rect.top + rect.height / 2;
      const distance = Math.sqrt(
        Math.pow(centerX - elCenterX, 2) + Math.pow(centerY - elCenterY, 2)
      );
      return distance < size + rect.width / 2;
    };

    list.forEach((item, index) => {
      const element = document.getElementById(`item-${index}`);
      if (element) {
        let randomX, randomY, randomSize, attempts;
        attempts = 0;
        do {
          randomX = Math.random() * (containerWidth - 110);
          randomY = Math.random() * (containerHeight - 400);
          randomSize = Math.random() * 80 + 20;
          attempts++;
        } while (
          Array.from(container.children).some((el) =>
            isOverlapping(el, randomX, randomY, randomSize)
          ) && attempts < 20
        );

        element.style.width = `${randomSize}px`;
        element.style.height = `${randomSize}px`;
        element.style.left = `${randomX}px`;
        element.style.top = `${randomY}px`;
      }
    });
  }, [list]);

  const onTouchStart = (e, item, container) => {
    const touch = e.touches[0];
    item.isDragging = true;
    item.startX = touch.clientX;
    item.startY = touch.clientY;
    const rect = item.getBoundingClientRect();
    item.initialLeft = rect.left - container.offsetLeft;
    item.initialTop = rect.top - container.offsetTop;
    item.style.transition = "none";
  };

  const onTouchMove = (e, item) => {
    if (!item.isDragging) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - item.startX;
    const deltaY = touch.clientY - item.startY;
    item.style.left = `${item.initialLeft + deltaX}px`;
    item.style.top = `${item.initialTop + deltaY}px`;
  };

  const onTouchEnd = (item) => {
    item.isDragging = false;
    item.style.transition = "transform 0.4s ease-in-out";
  };

  useEffect(() => {
    const container = containerRef.current;
    const items = Array.from(container.querySelectorAll(".carousel-item"));

    items.forEach((item) => {
      const boundOnTouchStart = (e) => onTouchStart(e, item, container);
      const boundOnTouchMove = (e) => onTouchMove(e, item);
      const boundOnTouchEnd = () => onTouchEnd(item);

      item.addEventListener("touchstart", boundOnTouchStart);
      item.addEventListener("touchmove", boundOnTouchMove);
      item.addEventListener("touchend", boundOnTouchEnd);

      // Store bound functions for cleanup
      item.boundOnTouchStart = boundOnTouchStart;
      item.boundOnTouchMove = boundOnTouchMove;
      item.boundOnTouchEnd = boundOnTouchEnd;
    });

    return () => {
      items.forEach((item) => {
        item.removeEventListener("touchstart", item.boundOnTouchStart);
        item.removeEventListener("touchmove", item.boundOnTouchMove);
        item.removeEventListener("touchend", item.boundOnTouchEnd);
      });
    };
  }, [list]);

  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="wardrobe-carousel-container" style={{
      backgroundImage: list && list.length > 0 ? 'url("https://images.pexels.com/photos/62693/pexels-photo-62693.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")' : '',    }} ref={containerRef}>
      { loading ? <Loader /> : list.length  == 0 ? <><br/><br/><br/><br/>Wardrobe is empty again!</> : list.map((item, index) => (
        <div key={item.id || index} style={{
          cursor: 'pointer',
        }}
        onClick={() => setSelectedItem(item)}
        id={`item-${index}`} className="carousel-item">
          <img src={item.imageUrl} style={{borderRadius: '10px'}} alt={item.name} />
          {/* <p>{item.name}</p> */}
        </div>
      ))}
      <Drawer width={`80%`} style={{}} title="Wardrobe" placement="right" onClose={() => {
        setSelectedItem(null);
      }} open={selectedItem}>
        {selectedItem && (
       <div align="center" style={{
        fontFamily: "'Playfair Display', serif", // Elegant, luxurious font
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#f8f8f8', // Light, neutral background for luxury vibe
        borderRadius: '15px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', // Soft shadow for elegance
        width: '80%',
        margin: 'auto',
      }}>
        <img 
          src={selectedItem.imageUrl} 
          alt={selectedItem.name} 
          style={{
            width: '90%',
            borderRadius: '15px', // Rounded image for elegance
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)', // Soft shadow to give depth
          }} 
        />
        <h2 style={{
          fontSize: '2rem',
          fontWeight: '700',
          color: '#333', // Dark text for readability
          margin: '10px 0',
        }}>
          {selectedItem.name}
        </h2>
        <p style={{
          fontSize: '1.1rem',
          color: '#888', // Subtle text color
          fontWeight: '400',
          marginBottom: '20px',
        }}>
          {selectedItem.colors}
        </p>
      
        <button 
          style={{
            backgroundColor: 'grey', // Dark red for luxury feel
            color: '#fff',
            padding: '12px 30px',
            border: 'none',
            borderRadius: '30px',
            fontSize: '1rem',
            fontWeight: '500',
            cursor: 'pointer',
            transition: '0.3s',
          }} 
          onClick={() => {
            setRemovingItem(true);
            deleteWardrobeItem(list.filter((item) => item.name !== selectedItem.name && item.colors !== selectedItem.colors)).then((data) => {
              console.log(data);
              setRemovingItem(false);
              window.location.reload();
            }).catch((error) => {
              console.log(error);
              setRemovingItem(false);
            });
          }}>
          <DeleteOutlined /> { removingItem ? <>&nbsp;Removing ...</> : <>&nbsp;Remove item</> }
        </button>
      </div>
      
        )}
      </Drawer>
    </div>
  );
};
