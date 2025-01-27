import { AppstoreOutlined, ArrowLeftOutlined, ArrowRightOutlined, BoxPlotOutlined, ExclamationCircleOutlined, FileAddFilled, FileAddOutlined, PlusCircleFilled, PlusCircleOutlined, UploadOutlined } from "@ant-design/icons"
import { Banner } from "../components/Banner"
import { Alert, Button, Card, Drawer, Tabs, Upload, message } from "antd"
import UploadOutfitForm from "../components/AddWardrobeItem";
import { useEffect, useState } from "react";
import { get, set } from "firebase/database";
import { getWardrobeItems } from "../services/wardrobeItems";
import { Meta } from "react-router-dom";
import { fetchChatCompletion } from "../OpenAI";
import { Loader } from "../components/Loader";
import {WardrobeComponent} from "../components/WardrobeComponent";
import { emptywar } from "../assets";
import { WardrobeComponentFreeStyle } from "../components/WardrobeComponentFreeStyle";

export const Wardrobe = () => {
    const [open, setOpen] = useState(false);
    const [wardrobeItems, setWardrobeItems] = useState([]);
    const [wardrobeItemsFreeStyle, setWardrobeItemsFreeStyle] = useState(false);
    const [loading, setLoading] = useState(false);

    const loadItems = () => {
      setLoading(true);
                  getWardrobeItems().then((data) => {
                      setWardrobeItems(data?.items);
                      setLoading(false);
                  }).catch((error) => {
                      message.error('Something went wrong');
                      setLoading(false);
                  })
    }

    useEffect(() => {
        setLoading(true);
        getWardrobeItems().then((data) => {
            setWardrobeItems(data?.items);
            setLoading(false);
        }).catch((error) => {
            message.error('Something went wrong');
            setLoading(false);
        })

        // fetchChatCompletion('Hello I have three pair of jeans red, white and grey, which one would go best with a white t-shirt').then((data) => {
        //     console.log(data);
        // });
    }, []);

    const user = JSON.parse(localStorage.getItem('user'));

    const onChange = (key) => {
        console.log(key);
      };
      const items = [
        {
          key: '1',
          label: 'Formals',
          children: loading ? <Loader /> : <div style={{
            display: 'flex',
            height: '55vh', overflow: 'auto',
            flexDirection: 'column',
            flexWrap: 'wrap'
          }}>
            {wardrobeItems?.filter((item) => item.category === 'formals').map((item) => {
            return (
                <div align="left" style={{padding: '10px', marginTop:'10px', border: '1px solid silver', display: 'flex', borderRadius: '8px', marginRight: '11px'}}>
                   <img src={item.imageUrl} style={{width: '60px', height: '60px', marginRight: '30px'}} />
                  
                   <div>
                   <span style={{color: ' #946d4c'}}>{item.name}</span>
                   <br/>
                   <span style={{color: ' #946d4c'}}>{item.colors}</span>
                   <br/>
                   <span style={{color: ' #946d4c'}}>{item.type}</span>
                   </div>
                </div>
            )
          })}</div>,
        },
        {
          key: '2',
          label: 'Casuals',
          children: loading ? <Loader /> : <div style={{
            display: 'flex',
            height: '55vh', overflow: 'auto',
            flexDirection: 'column',
            flexWrap: 'wrap'
          }}>
            {wardrobeItems?.filter((item) => item.category === 'casuals').map((item) => {
            return (
                <div align="left" style={{padding: '10px', marginTop:'10px', border: '1px solid silver', display: 'flex', borderRadius: '8px', marginRight: '11px'}}>
                   <img src={item.imageUrl} style={{width: '60px', height: '60px', marginRight: '30px'}} />
                  
                   <div>
                   <span style={{color: ' #946d4c'}}>{item.name}</span>
                   <br/>
                   <span style={{color: ' #946d4c'}}>{item.colors}</span>
                   <br/>
                   <span style={{color: ' #946d4c'}}>{item.type}</span>
                   </div>
                </div>
            )
          })}</div>,
        }
      ];

    return (
        <div align="center" style={{padding: '0px 30px', height: 'calc(100vh - 78px)', overflowY: 'auto', overflowX: 'hidden'}}>
            <Banner icon={<AppstoreOutlined style={{fontSize: '18px'}} />} title={`${user.displayName.split(' ')[0]}'s Wardrobe`} />
            <br/>
             {/*switch wardrobe view  */}
             <div align="right" >
            <button style={{ padding: '10px 15px', background: '#3C9CA0', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px'}} 
            onClick={() => setWardrobeItemsFreeStyle(!wardrobeItemsFreeStyle)}>Switch view  </button>
            </div>
            <br/>
            <span
                type="primary"
                style={{
                  position: 'fixed',            // Fix the position relative to the viewport
                  bottom: `${wardrobeItems?.length > 0 ? '95px' : '95px'}`,            // Distance from the bottom of the screen
                  right: `${wardrobeItems?.length > 0 ? '44px' : '44px'}`,                // Distance from the right of the screen
                  cursor: 'pointer',            // Pointer cursor for hover effect
                  fontSize: '14px',             // Font size
                  color: 'white',               // Text color
                  background: '#3C9CA0',        // Button background color
                  padding: '20px 20px',         // Padding inside the button
                  borderRadius: '50%',         // Rounded button appearance
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Add shadow for hover effect
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease', // Smooth hover animation
                  zIndex: 1000,                 // Ensure it appears above other elements
                }}
                onClick={() => setOpen(true)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)'; // Slightly enlarge on hover
                  e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.3)'; // Intensify shadow
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'; // Reset size
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'; // Reset shadow
                }}
              >
              <PlusCircleOutlined style={{fontSize: '30px'}} />
            </span>
 
            <Drawer
                title="Add New Wardrobe Item"
                placement="right"
                onClose={() => {setOpen(false);
                  loadItems();
          
                }}
                open={open}
                width={'100%'}
            >
                <UploadOutfitForm />
            </Drawer>
            {wardrobeItems ? 
            wardrobeItemsFreeStyle ? <WardrobeComponentFreeStyle loadItems={loadItems} loading={loading} list={wardrobeItems} />
            :
            <WardrobeComponent loadItems={loadItems} loading={loading} list={wardrobeItems}></WardrobeComponent> : 
            <>
              <Alert style={{textAlign: 'left'}} message="Wardrobe is empty, kindly add items to your wardrobe!" type="warning" />
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <img src={emptywar} style={{width:'50%'}} />
            </>
          }
            
           {/* {
            !wardrobeItems && <img src="https://images.pexels.com/photos/7671166/pexels-photo-7671166.jpeg?auto=compress&cs=tinysrgb&w=600" 
            style={{width: '100%', borderRadius: '10px'}}
            />
           } */}
        </div>
    )
}
