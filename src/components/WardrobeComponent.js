import React, { useEffect, useRef, useState } from "react";
import "./Wardrobe.css";
import { Drawer } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Loader } from "./Loader";

export const WardrobeComponent = ({ list, loading }) => {
  const containerRef = useRef(null);

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
          randomSize = Math.random() * 50 + 50;
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
    <div className="wardrobe-carousel-container" ref={containerRef}>
      
      { loading ? <Loader /> : list.map((item, index) => (
        <div key={item.id || index} style={{
          cursor: 'pointer',
        }}
        onClick={() => setSelectedItem(item)}
        id={`item-${index}`} className="carousel-item">
          <img src={item.imageUrl} alt={item.name} />
          {/* <p>{item.name}</p> */}
        </div>
      ))}
      <Drawer width={`80%`} title="Wardrobe" placement="right" onClose={() => {
        setSelectedItem(null);
      }} open={selectedItem}>
        {selectedItem && (
          <div align="center">
            <img src={selectedItem.imageUrl} style={{
              width: '60%'
            }} alt={selectedItem.name} />
            <p>{selectedItem.name}</p>
            <p>{selectedItem.colors}</p>

            <hr/>
            <br/>
            <button style={{
              padding: '7px 20px'
            }} onClick={() => {
              setSelectedItem(null);
            }}><DeleteOutlined /> Remove item from wardrobe</button>
             
          </div>
        )}
      </Drawer>
    </div>
  );
};
