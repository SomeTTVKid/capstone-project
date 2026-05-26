import { useContext, useEffect, useState } from "react"
import { Context } from "../context/ContextProvider"

function ItemCard(props) {
    const { item } = props

    const [ itemUrl, setItemUrl ] = useState()
    const { token } = useContext(Context)
    
    // Grab the items images from the wow api
    async function getImageData(){
        const imageData = await fetch(
            `https://us.api.blizzard.com/data/wow/media/item/${item.item.id}?namespace=static-us&locale=en_US`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )

        const itemImageData = await imageData.json()
        const itemImage = itemImageData.assets.find(asset => asset.key === "icon")
        setItemUrl(itemImage.value)

    }

    // Refresh this component whenever we search a new toon
    useEffect(() => {
        getImageData()
    }, [item])

    return (
        <div className="item-card">
            <div className="image-div">
                <img className='item-image' src={itemUrl ? itemUrl : null} />
            </div>
            <p className="item-name">{item.name}</p>
            <p className="item-ilvl">{item.level.value}</p>
        </div>
    )
}

export default ItemCard

