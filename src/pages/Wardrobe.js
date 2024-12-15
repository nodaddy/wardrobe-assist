import { ArrowLeftOutlined, ArrowRightOutlined, ExclamationCircleOutlined, FileAddFilled, FileAddOutlined, PlusCircleFilled, PlusCircleOutlined, UploadOutlined } from "@ant-design/icons"
import { Banner } from "../components/Banner"
import { Alert, Button, Card, Drawer, Tabs, Upload, message } from "antd"
import UploadOutfitForm from "../components/AddWardrobeItem";
import { useEffect, useState } from "react";
import { get, set } from "firebase/database";
import { getWardrobeItems } from "../services/wardrobeItems";
import { Meta } from "react-router-dom";
import { fetchChatCompletion } from "../OpenAI";
import { Loader } from "../components/Loader";

export const Wardrobe = () => {
    const [open, setOpen] = useState(false);
    const [wardrobeItems, setWardrobeItems] = useState([]);

    const [loading, setLoading] = useState(false);

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
            <Banner title={`${user.displayName.split(' ')[0]}'s Wardrobe`} />
            <br/>
            <br/>
            <span type="primary" style={{cursor: 'pointer', fontSize: '14px', color: 'white', background: '#3C9CA0', padding: '8px 17px', borderRadius: '5px'}} onClick={() => setOpen(true)}> 
                Add Item &nbsp;<PlusCircleOutlined />
            </span>
            <br/>
            <br/>
            <br/>
            <Drawer
                title="Add New Wardrobe Item"
                placement="right"
                onClose={() => {setOpen(false)}}
                open={open}
                width={'100%'}
            >
                <UploadOutfitForm />
            </Drawer>
           {wardrobeItems ? <Tabs defaultActiveKey="1" items={items} onChange={onChange} /> : <Alert style={{textAlign: 'left'}} message="Wardrobe is empty, kindly add items to your wardrobe!" type="warning" />}
           <br/>
           <br/>
           {
            !wardrobeItems && <img src="https://images.pexels.com/photos/7671166/pexels-photo-7671166.jpeg?auto=compress&cs=tinysrgb&w=600" 
            style={{width: '100%', borderRadius: '10px'}}
            />
           }
        </div>
    )
}
