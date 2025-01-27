import { useEffect, useState } from "react";
import { getWardrobeItems } from "../services/wardrobeItems";
import { message, Input, Button, Checkbox, Modal, Alert } from "antd";
import { createOrUpdateOutfitCollection, getOutfits } from "../services/outfitsService";
import { Card, Col, Row, List } from 'antd';
import { Banner } from "../components/Banner";
import { DeleteOutlined, FileAddOutlined, ShopOutlined } from "@ant-design/icons";
// import "antd/dist/antd.css";

export const OutfitsCollection = () => {
  const [wardrobeItems, setWardrobeItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [collectionName, setCollectionName] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [outfits, setOutfits] = useState(null);

  useEffect(() => {
    getWardrobeItems()
      .then((data) => {
        setWardrobeItems(data?.items);
      })
      .catch((error) => {
        message.error("Something went wrong");
      });

      getOutfits().then((data) => {
        setOutfits(data.collections);
      }).catch((error) => {
        message.error("Something went wrong");
      })
  }, [isModalVisible]);

  const handleSelectItem = (item) => {
    setSelectedItems((prev) => {
      if (prev.includes(item)) {
        return prev.filter((i) => i !== item);
      } else {
        return [...prev, item];
      }
    });
  };

  const handleSaveCollection = () => {
    if (!collectionName) {
      message.error("Please provide a name for the collection");
      return;
    }
    if (selectedItems.length === 0) {
      message.error("Please select at least one item");
      return;
    }

    const collection = {
      name: collectionName,
      items: selectedItems,
    };

    console.log("Saved Collection:", collection);
    createOrUpdateOutfitCollection(collection).then(() => {
        setSelectedItems([]);
        setCollectionName("");
        setIsModalVisible(false);
        setIsModalOpen(false);
        message.success("Collection saved successfully!");
    });
  };

  return (
    <div style={{padding: '69px 30px', paddingBottom: '0px', margin: '0px', height: 'calc(100vh - 78px)', overflowY: 'auto', overflowX: 'hidden'}}>
    <Banner icon={<ShopOutlined style={{color: 'white'}} />} title="Outfits" /> 
    <br/>
    <div align="left">Your outfit collection</div>
    <br/>
      <CollectionList collections={outfits}/>
      
      <button style={{
        border: '1px solid #3C9CA0',
        borderRadius: '999px',
        padding: '10px 15px',
        background: '#3C9CA0',
        color: 'white',
        fontSize: '17px',
        position: 'absolute',
        bottom: '83px',
        right: '20px'
      }}
      onClick={() => {
        setIsModalOpen(true);
    }}
      >
        Create Outfit <FileAddOutlined />
      </button>
      
    <Modal
      title="Your Wardrobe"
      open={isModalOpen}
      onCancel={() => {setIsModalOpen(false)}}
      footer={null}
      bodyStyle={{ padding: "20px" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxHeight: "50vh",
          overflow: "auto",
        }}
      >
        {wardrobeItems?.map((item) => (
          <div
            key={item.name}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img
                src={item.imageUrl}
                alt={item.name}
                style={{ width: "50px", height: "50px", borderRadius: "5px" }}
              />
              <div>
                <h4 style={{ margin: 0 }}>{item.name}</h4>
                {/* <p style={{ margin: 0, color: "#888" }}>{item.colors}</p> */}
              </div>
            </div>
            <Checkbox
              checked={selectedItems.includes(item)}
              onChange={() => handleSelectItem(item)}
            />
          </div>
        ))}
      </div>
      <Button
        type="primary"
        style={{ marginTop: "20px", width: "100%" }}
        onClick={() => setIsModalVisible(true)}
      >
        Save Collection 
      </Button>
    </Modal>


      <Modal
        title="Save Your Collection"
        visible={isModalVisible}
        onOk={handleSaveCollection}
        onCancel={() => setIsModalVisible(false)}
        okText="Save"
        cancelText="Cancel"
      >
        <Input
          placeholder="Enter collection name"
          value={collectionName}
          onChange={(e) => setCollectionName(e.target.value)}
        />
      </Modal>
    </div>
  );
};

const CollectionList = ({ collections }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedCollection, setSelectedCollection] = useState(null);
  
    const handleCollectionClick = (collection) => {
      setSelectedCollection(collection);
      setIsModalVisible(true);
    };
  
    const handleModalClose = () => {
      setIsModalVisible(false);
      setSelectedCollection(null);
    };
  
    const cardStyle = {
      borderRadius: "999px",
      overflow: "hidden",
      padding: '10px 25px',
      marginRight: '20px',
      position: "relative",
      boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      marginBottom: '16px'
    };
  
    const cardHoverStyle = {
      transform: "scale(1.05)",
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.15)",
    };
  
    const imageStyle = {
      height: "120px",
      width: "120px",
      objectFit: 'cover',
      borderRadius: '50%',
    };
  
    const glareStyle = {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background:
        "linear-gradient(45deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0) 70%)",
      opacity: 0,
      transition: "opacity 0.3s ease",
    };
  
    const cardContainerStyle = {
      position: "relative",
      cursor: "pointer",
    };
  
    const handleMouseEnter = (e) => {
      const card = e.currentTarget;
      card.querySelector(".glare").style.opacity = 1;
    };
  
    const handleMouseLeave = (e) => {
      const card = e.currentTarget;
      card.querySelector(".glare").style.opacity = 0;
    };
  
    return (
      <>
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
        }}>
          { collections ? collections.map((collection, idx) => (
  <div
    key={idx}
    style={{ ...cardContainerStyle, position: 'relative' }}
    onClick={() => handleCollectionClick(collection)}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
  >
    <div
      hoverable
      style={cardStyle}
    >
      <span style={{ fontWeight: '500' }}>{collection.name.substring(0, 7).toUpperCase()}</span>
    </div>
    <div className="glare" style={glareStyle}></div>
  </div>
)) : <Alert message={"No outfits found, please create outfits"} /> }

        </div>
  
        {selectedCollection && (
          <Modal
            title={selectedCollection.name.toUpperCase()}
            visible={isModalVisible}
            onCancel={handleModalClose}
            footer={<DeleteOutlined style={{color: 'red', fontSize: '20px'}}/>}
            style={{textAlign: 'center'}}
          >
            <List
              grid={{ gutter: 16, column: 2 }}
              dataSource={selectedCollection.items}
              renderItem={(item) => (
                <List.Item>
                  <img
                        alt={item.name}
                        src={item.imageUrl}
                        style={imageStyle}
                      />
                </List.Item>
              )}
            />
          </Modal>
        )}
      </>
    );
  };
  