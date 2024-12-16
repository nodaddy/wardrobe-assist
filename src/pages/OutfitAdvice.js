import { Input } from "antd";
import { Banner } from "../components/Banner"
import { useState } from "react";
import { EyeFilled, FileImageOutlined, RightCircleOutlined, RightOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import { fetchChatCompletion } from "../OpenAI";
import { getWardrobeItems } from "../services/wardrobeItems";
import { Loader } from "../components/Loader";
import OutfitPromptExamples from "../components/OutfitPromptsForAI";
import { assist } from "../assets";

export const OutfitAdvice = () => {
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState('');
    const [loadingResponse, setLoadingResponse] = useState(false);

    const handleChange = (e) => {
        setQuery(e.target.value);
        };

    const handleSubmit = () => {
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
            
            fetchChatCompletion(query + `Keep the response under 70 words, I have the following things in my inventry: ${JSON.stringify(data)}, ${JSON.stringify(data)} and following are my details: ${localStorage.getItem('userProfile')}`).then((data) => {
                console.log(data);
                setResponse(data);
                setLoadingResponse(false);
            }).catch((error) => {
                console.log(error);
                setLoadingResponse(false);
            });
        })
        };

    return (
        <div style={{padding: '0px 30px', height: 'calc(100vh - 78px)', overflowY: 'auto', overflowX: 'hidden'}}>
             <Banner title="Outfit Assistant" />
             <br/>
             <br/>
             <img src={assist} style={{width: '130px'}} />
             <br/>
             <br/>
             <br/>
             <div align="right"> 
                
                <Input.TextArea
                    placeholder="Type here... ask me anything, explain in detail if you can e.g. 'What should I wear to the party tonight, I am confused between a white t-shirt and a blue t-shirt, should I pair them up with jeans or formal pants?'"
                    value={query}
                    autoSize={{ minRows: 3}}
                    onChange={handleChange}
                    onPressEnter={handleSubmit}
                    style={{borderRadius: '10px 10px 0px 0px'}}
                /> 
                <div
                align="left"
                style={{
                    color: 'white',
                    background: '#946d4c',
                    padding: '10px',
                    borderRadius: '0px 0px 10px 10px',
                    fontSize: '12px'
                }}>
                    <EyeFilled style={{color: 'white'}} /> Make sure you have added items to you wardrobe, the assistant works better that way
                </div> 
                <br/> 
                <button
                style={{
                    background: '#3C9CA0',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    border: '0px',
                    fontSize: '15px'
                }}
                onClick={handleSubmit}
                >Submit</button>
             </div> 
            { 
                    <div align="left">
                        { loadingResponse ? <div align="center"><Loader /></div> : response ? <><p
                            style={{padding: '10px', background: '#3C9CA0', color: 'white', borderRadius: '10px'}}
                        >{response}</p>
                       
                        <button style={{
                            background: '#946d4c',
                            color: 'white',
                            padding: '8px 10px',
                            borderRadius: '5px',
                            border: '0px'
                        }}
                        onClick={() => {
                           
                        }}
                        ><FileImageOutlined /> See images for these suggestions</button>

                        </> : ''}
                    </div>
            } 
            {/* {!response && <OutfitPromptExamples />} */}
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
    )
}