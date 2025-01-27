import React, { useState } from "react";
import "./Wardrobe.css";
import { Drawer } from "antd";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { Loader } from "./Loader";
import { deleteWardrobeItem } from "../services/wardrobeItems";

export const WardrobeComponent = ({ list, loading, loadItems }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [removingItem, setRemovingItem] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredList = list.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      style={{
        // backgroundImage: "linear-gradient(to right, #ffecd2, #fcb69f)",
        minHeight: "100vh",
        width: '100vw',
        marginLeft: '-30px',
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        {/* <h2 style={{ fontSize: "2.2rem", color: "#333", fontWeight: "500" }}>My Wardrobe</h2> */}
        <SearchOutlined style={{ fontSize: "1.2rem", color: "#555" }} />
        &nbsp;
        &nbsp;
        <input
          type="text"
          placeholder="Search your wardrobe..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "68%",
            padding: "10px 15px",
            marginBottom: "20px",
            border: "1px solid #ccc",
            borderRadius: "25px",
            outline: "none",
            fontSize: "1rem",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        />
      </div>

      <div
        className="wardrobe-grid-container"
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          padding: '0px 20px',
          gap: "15px",
        }}
      >
        {loading ? (
          <div align="center" style={{ width: "100vw" }}>
            <br />
            <br />
            <Loader />
          </div>
        ) : filteredList.length === 0 ? (
          <div style={{ textAlign: "center", marginTop: "20px", fontSize: "1.2rem" }}>
            No results found!
          </div>
        ) : (
          filteredList.map((item, index) => (
            <div
              key={item.id || index}
              style={{
                cursor: "pointer",
                position: "relative",
                backgroundColor: "#ffffff",
                padding: "4px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                height: "19vw",
                width: "19vw",
                transition: "transform 0.3s, box-shadow 0.3s"
              }}
              onClick={() => setSelectedItem(item)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
              }}
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            </div>
          ))
        )}

        <Drawer
          // width={`80%`}
          title="Wardrobe"
          placement="right"
          style={{marginTop: '69.9px'}}
          onClose={() => setSelectedItem(null)}
          open={selectedItem}
        >
          {selectedItem && (
            <div
              style={{
                textAlign: "center",
                padding: "20px",
              }}
            >
              <img
                src={selectedItem.imageUrl}
                alt={selectedItem.name}
                style={{
                  width: "100%",
                  borderRadius: "12px",
                  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
                }}
              />
              <h2 style={{ marginTop: "15px", color: "#333" }}>{selectedItem.name}</h2>
              <p style={{ color: "#666" }}>{selectedItem.colors}</p>
              <button
                style={{
                  backgroundColor: "#d9534f",
                  color: "#fff",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "25px",
                  cursor: "pointer",
                  fontSize: "1rem",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  transition: "background-color 0.3s, box-shadow 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#c9302c";
                  e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#d9534f";
                  e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
                }}
                onClick={() => {
                  setRemovingItem(true);
                  deleteWardrobeItem(
                    list.filter(
                      (item) =>
                        item.name !== selectedItem.name &&
                        item.colors !== selectedItem.colors
                    )
                  )
                    .then((data) => {
                      console.log(data);
                      setRemovingItem(false);
                      loadItems();
                      setSelectedItem(null);
                    })
                    .catch((error) => {
                      console.log(error);
                      setRemovingItem(false);
                    });
                }}
              >
                <DeleteOutlined /> {removingItem ? "Removing..." : "Remove Item"}
              </button>
            </div>
          )}
        </Drawer>
      </div>
    </div>
  );
};
