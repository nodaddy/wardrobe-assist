import { Alert } from "antd"
import { Banner } from "../components/Banner"

export const Additions = () => {
    return (
        <div style={{padding: '0px 30px'}}>
             <Banner title="Shopping assistant" />
             <br/>
             <br/>
            <Alert style={{textAlign: 'left'}} message="Suggested items that complement your wardrobe—plan to add them to your next shopping list! 😊" type="success" />
        </div>
       
    )
}