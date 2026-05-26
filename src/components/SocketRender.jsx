import { useEffect, useState, useContext } from "react";
import { Context } from "../context/ContextProvider";
import MissingIcon from "../assets/MissingIcon.jpg"

function SocketRender({socket}){

    const { token } = useContext(Context)
    const [gemUrl, setGemUrl] = useState("");

    useEffect(() => {
        const gemId = socket.item?.id; 

        if(!gemId){
            setGemUrl(MissingIcon)
        }

        const getGemImage = async () => {
            const gemLink = await fetch(
                `https://us.api.blizzard.com/data/wow/media/item/${gemId}?namespace=static-us&locale=en_US`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    }
                }
            )

            const gemData = await gemLink.json()

            const iconAsset = gemData.assets?.find(asset => asset.key === "icon");
            if (iconAsset) {
                setGemUrl(iconAsset.value)
            }
        }

        getGemImage()

    }, [socket])

    return(
        <div className="sockets">
            {gemUrl && <img className='gem-image' src={gemUrl}/>}
            <h5 className="gem-value">{socket.display_string ? socket.display_string : "No Gem Data"}</h5>
        </div>
    )
}

export default SocketRender