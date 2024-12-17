import { Input } from "antd";
import { Banner } from "../components/Banner"
import { useEffect, useState } from "react";
import { EyeFilled, FileImageOutlined, RightCircleOutlined, RightOutlined, ShopOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import { fetchChatCompletion, fetchChatCompletionForShopping } from "../OpenAI";
import { getWardrobeItems } from "../services/wardrobeItems";
import { Loader } from "../components/Loader";
import OutfitPromptExamples from "../components/OutfitPromptsForAI";
import { assist } from "../assets";

export const Additions = () => {
    const [aiResponse, setResponse] = useState(null);
    const [loadingResponse, setLoadingResponse] = useState(false);

    useEffect(() => {
        setLoadingResponse(true);
        getWardrobeItems().then((data) => {
            if(data){
                data.items = data.items.map((item) => {
                    return {
                        wardrobeItemName: item?.name,
                        colourOrDesign: item?.colors,
                        category: item?.category,
                        type: item?.type
                    }
                })
            }
            
            if(!aiResponse){fetchChatCompletionForShopping(`You must give response in very appealing HTML code format only... What things would be best to buy next, advice on everythign from clothing to accessories, I have the following things in my inventry: ${JSON.stringify(data)} and following are my details: ${localStorage.getItem('userProfile')}`).then((data) => {
                console.log(data);
                setResponse(data);
                setLoadingResponse(false);
            }).catch((error) => {
                console.log(error);
                setLoadingResponse(false);
            });}
        })
    }, []);

    return (
        <div style={{padding: '0px 30px', margin: '0px', height: 'calc(100vh - 78px)', overflowY: 'auto', overflowX: 'hidden'}}>
        <Banner icon={<ShopOutlined style={{color: 'white'}} />} title="Shopping Assistant" /> 
        <br/>
        <div
                align="left"
                style={{
                    color: '#946d4c',
                    background: 'white',
                    padding: '10px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    border: '1px solid #c89468'
                }}>
                    <EyeFilled style={{color: '#946d4c'}} />&nbsp;&nbsp;These recommendations are based on your wardrobe and your user details.
                </div> 
                {loadingResponse && <div align="center"><Loader /><br/><br/><br/></div>}
                <br/>
                <br/>
                    <div style={{
                        overflowX: 'hidden'
                    }} dangerouslySetInnerHTML={{__html: aiResponse?.replace('html', '')}}>
                        
                    </div> 
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
    )
}