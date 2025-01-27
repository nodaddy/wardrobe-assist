import { useEffect, useState } from "react";
import { getWardrobeItems } from "../services/wardrobeItems";
import { message, Input, Button, Checkbox, Modal } from "antd";
import { createOrUpdateOutfitCollection, getOutfits } from "../services/outfitsService";
import { Card, Col, Row } from 'antd';
import { Banner } from "../components/Banner";
import { ShopOutlined } from "@ant-design/icons";
// import "antd/dist/antd.css";

export const OutfitsCollection = () => {
  const [wardrobeItems, setWardrobeItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [collectionName, setCollectionName] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [outfits, setOutfits] = useState([]);

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
  }, []);

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
    createOrUpdateOutfitCollection(collection);
    message.success("Collection saved successfully!");
    setSelectedItems([]);
    setCollectionName("");
    setIsModalVisible(false);
  };

  return (
    <div style={{padding: '69px 30px', margin: '0px', height: 'calc(100vh - 78px)', overflowY: 'auto', overflowX: 'hidden'}}>
    <Banner icon={<ShopOutlined style={{color: 'white'}} />} title="Outfits" /> 
    <br/>
       
    </div>
  );
};

const CollectionList = ({collections}) => {
    return (
      <Row gutter={16} style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
        {collections.map((collection, idx) => (
          <Col span={8} key={idx}>
            <h3>{collection.name}</h3>
            <Row gutter={16} style={{ flexDirection: 'row', overflowX: 'auto', whiteSpace: 'nowrap' }}>
              {collection.items.map((item, index) => (
                <Col span={6} key={index}>
                  <Card
                    hoverable
                    cover={<img alt={item.name} src={item.imageUrl} />}
                  >
                    <Card.Meta title={item.name} description={item.category} />
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        ))}
      </Row>
    );
  };