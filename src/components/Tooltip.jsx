import { useContext, useState } from "react"
import { Context } from "../context/ContextProvider"
import ItemCard from "./ItemCard"
import SocketRender from "./SocketRender"
import CopperCoin from "../assets/copperCoin.jpg"
import SilverCoin from "../assets/silverCoin.jpg"
import GoldCoin from "../assets/goldCoin.jpg"

function Tooltip(){

    const { charInfo, token } = useContext(Context)
    const [ gemUrl, setGemUrl ] = useState()

    // Maybe split this up into two components?

    const equipped = charInfo?.equipped_items.map((item, i) => {
        const sellPrice = item.sell_price ? item.sell_price.display_strings : null
        return(
            <div className={`${item.slot.type} ${item.quality.type}`} key={i}>
                <ItemCard item={item} />
                <div className="tool-tip">
                    <h3 className={`${item.quality.type} item-card-name`}>{item.name}</h3>
                    <h5 className="tooltip-ilvl">{item.level.display_string}</h5>
                    <h5>{item.binding.name}</h5>
                    <div className="slot-material">
                        <h5>{item.inventory_type.name}</h5>
                        <h5>{item.item_subclass.name !== "Miscellaneous" ? item.item_subclass.name : ""}</h5>
                    </div>

                    {/* Check if item.stats exists */}
                    {item.stats?.length ? (
                        // Map over the array
                        item.stats.map((stat, statIndex) => {
                            // Grab and convert the color array to rgba
                            const color = stat.display?.color
                            const statColor = color ? `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})` : "inherit"
                            return(
                                <h5
                                    key={statIndex}
                                    // Check if that stat is negated for our character
                                    // If not set the color to the tert stat color
                                    style={{ color: stat.is_negated ? "grey" : statColor }}
                                >
                                    {stat.display?.display_string}
                                </h5>
                            )
                        })
                    ) 
                    : 
                    (
                        <h5>No stats available</h5>
                    )}

                    {/* Check for enchantments */}
                    {item.enchantments? <h5 className="enchantment">{item.enchantments[0].display_string.replace(/\|A.*\|a/, "").trim()}</h5> : null}

                    {/* Do check here for sockets */}
                    {item.sockets?.length ? (
                        <div className="socket-div">
                            {item.sockets.map((socket, socketIndex) => (
                                <SocketRender
                                    socket={socket}
                                    key={socketIndex}
                                />
                            ))}
                        </div>
                    ) 
                    : 
                        null
                    }

                    {/* Socket bonus stat value */}
                    {item.socket_bonus? <h5 className="socket-bonus">{item.socket_bonus}</h5> : null}

                    {/* Check if any items are part of a set */}
                    {/* Display the set name */}
                    {item.set? <h4 className="set-name">{item.set.display_string}</h4> : null}

                    {/* Check if there are any sets */}
                    {item.set?.items?.length ? (
                        // Loop through and create list items for each piece
                        <div className="set-data">
                            {item.set.items.map((setPiece, index) => {
                                return(
                                    <div key={index}>
                                        <ul
                                            className="set-list"
                                            style={{ color: setPiece.is_equipped ? "gold" : "darkgrey"}}
                                        >
                                            <li>{setPiece.item.name}</li>
                                        </ul>
                                    </div>
                                )
                            })}
                        </div>
                    )
                    :
                    (
                        null
                    )}

                    {/* Loop through set effects */}
                    {item.set?.effects?.length ? (
                        // Loop through and create list items for each piece
                        <div className="set-effects">
                            {item.set.effects.map((setEffect, index) => {
                                return(
                                    <div key={index}>
                                        <h5
                                            className="set-effect"
                                            style={{ color: setEffect.is_active ? "gold" : "darkgrey"}}
                                        >
                                            {setEffect.display_string}
                                        </h5>
                                    </div>
                                )
                            })}
                        </div>
                    )
                    :
                    (
                        <div></div>
                    )}

                    {/* On Use or Equip */}
                    {item.spells ? 
                        <div className="item-effect-div">
                            <h5 className="item-effect">{item.spells[0].description}</h5> 
                        </div>
                        : null}

                    {/* Durability */}
                    {item.durability ? <h5 className="durability">{item.durability.display_string}</h5> : null}

                    {/* Level requirements */}
                    {item.requirements && (
                    <div className="requirements-div">
                        {/* Class constraint*/}
                        {item.requirements.playable_classes?.display_string && (
                        <h5 className="class-requirement">
                            {item.requirements.playable_classes.display_string}
                        </h5>
                        )}
                        {item.requirements.level?.display_string && (
                        <h5>{item.requirements.level.display_string}</h5>
                        )}
                    </div>
                    )}

                    {/* Sell price */}
                    {sellPrice !== null ? (
                        <div className="sell-price-div">
                            <h5>{sellPrice.header}</h5>

                            {sellPrice.gold !== "0" ? 
                                <div className="gold-div">
                                    <h5 className="gold">{sellPrice.gold}</h5> 
                                    <img className="gold-icon" src={GoldCoin}/>
                                </div>
                                : null}

                            {sellPrice.silver !== "0" ?
                                <div className="silver-div">
                                    <h5 className="silver">{sellPrice.silver}</h5> 
                                    <img className="silver-icon" src={SilverCoin}/>
                                </div>
                                : null}

                            {sellPrice.copper !== "0" ? 
                                <div className="copper-div">
                                    <h5 className="copper">{sellPrice.copper}</h5>
                                    <img className="copper-icon" src={CopperCoin}/>
                                </div>
                                : null}
                        </div>
                    )
                    :
                    (
                        null
                    )
                    }

                </div>
            </div>
        )
    })

    return(
        <div>
            {equipped}
        </div>
    )
}

export default Tooltip