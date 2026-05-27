import { useContext, useState, useEffect } from 'react'
import { Context } from '../context/ContextProvider'

// This will have to call the statistics api
// Then just render out the stats in a readable way
function StatRender(){

    const { formData, token } = useContext(Context)
    const [stats, setStats] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const formattedName = formData.name.toLowerCase()
    const formattedSlug = formData.slug.toLowerCase()

    useEffect(() => {
        const getStats = async () => {
            try {
                const statResponse = await fetch(
                `https://us.api.blizzard.com/profile/wow/character/${formattedSlug}/${formattedName}/statistics?namespace=profile-us&locale=en_US`,
                    {
                        headers: {
                                "Authorization": `Bearer ${token}`
                        }
                    }
                )

                const statData = await statResponse.json()
                console.log("Stats", statData) 
                setStats(statData)
                setIsLoading(false)
            } catch (error) {
                console.log(error)
                setIsLoading(false)
            }
        }
        getStats()
    }, [formattedName, formattedSlug, token])

    const renderResource = () => {
        if (!stats || !stats.power_type) return null

        const powerName = stats.power_type.name
        let iconSrc = null
        let textColor = null

        switch (powerName) {
            case 'Mana':
                iconSrc = 'https://warcraft.wiki.gg/images/Attribute_mana.svg?ce4948'
                textColor = '#006eff'
                break
            case 'Rage':
                iconSrc = 'https://warcraft.wiki.gg/images/Attribute_rage.svg?a1ea1b'
                textColor = 'red'
                break
            case 'Pain':
                iconSrc = 'https://warcraft.wiki.gg/images/Attribute_pain.svg?c139e5'
                textColor = 'rgb(255, 111, 0)'
                break
            case 'Fury':
                iconSrc = 'https://warcraft.wiki.gg/images/Attribute_fury.svg?bc119a'
                textColor = 'rgb(106, 0, 255)'
                break
            case 'Insanity':
                iconSrc = 'https://warcraft.wiki.gg/images/Attribute_insanity.svg?6211e2'
                textColor = 'rgb(93, 0, 255)'
                break
            case 'Focus':
                iconSrc = 'https://warcraft.wiki.gg/images/Attribute_focus.svg?bdd833'
                textColor = 'rgb(255, 111, 0)'
                break
            case 'Energy':
                iconSrc = 'https://warcraft.wiki.gg/images/Attribute_energy.svg?562c4d'
                textColor = 'rgb(255, 196, 0)'
                break
            case 'Runic Power':
                iconSrc = 'https://warcraft.wiki.gg/images/Attribute_runicpower.svg?1304eb'
                textColor = 'rgb(0, 204, 255)'
                break
            case 'Maelstrom':
                iconSrc = 'https://warcraft.wiki.gg/images/Attribute_maelstrom.svg?7947e6'
                textColor = 'rgb(0, 204, 255)'
                break
            default:
                iconSrc = null
                break
        }

        return (
            <>
                {iconSrc && <img className='stat-image' src={iconSrc} />}
                <h3 className='stat-name'>{powerName}:</h3>
                <h4 style={{ color: textColor }} className='stat-value'>{stats.power.toLocaleString('en-US')}</h4>
            </>
        )
    }

    if (isLoading) return <div className='player-stats'>Loading...</div>

    return(
        // Display the percentage, rounded up
        // On hover, show the normalized rating
        // On hover change text decoration to underlined
        // Create two divs, group stats by 4 in each
        <div className='player-stats'>
            <div className='top-stats'>
                {/* Health */}
                <div className='health'>
                    <img className='stat-image' src='https://warcraft.wiki.gg/images/Attribute_health.svg?f85a3b'/>
                    <h3 className='stat-name'>Health:</h3>
                    <h3 style={{ color: '#48ff00' }} className='stat-value'>{stats.health.toLocaleString('en-US')}</h3>
                </div>
                {/* Resource */}
                <div className='resource'>
                    {renderResource()}
                </div>
                {/* Primary Stat */}
                    {/* Compare Primary Stats to find Main Stat */}
                <div className='primary-stat'>
                    {
                    (stats.agility.effective >= stats.intellect.effective && 
                    stats.agility.effective >= stats.strength.effective) ? 
                        <>
                            <img className='stat-image' src='https://warcraft.wiki.gg/images/Attribute_agility.svg?12080d'/>
                            <h3 className='stat-name'>Agility:</h3>
                            <h3 style={{ color: '#ffd900' }}className='stat-value'>{stats.agility.effective.toLocaleString('en-US')}</h3>
                        </> 
                    :
                    (stats.intellect.effective >= stats.strength.effective) ? 
                        <>
                            <img className='stat-image' src='https://warcraft.wiki.gg/images/Attribute_intellect.svg?634428'/>
                            <h3 className='stat-name'>Intellect:</h3>
                            <h3 style={{ color: '#dd00ff' }}className='stat-value'>{stats.intellect.effective.toLocaleString('en-US')}</h3>
                        </> 
                    :
                    <>
                        <img className='stat-image' src='https://warcraft.wiki.gg/images/Attribute_strength.svg?ae5a26'/>
                        <h3 className='stat-name'>Strength:</h3>
                        <h3 style={{ color: 'rgb(255, 1, 1)' }} className='stat-value'>{stats.strength.effective.toLocaleString('en-US')}</h3>
                    </>
                    }
                </div>
                {/* Stamina */}
                <div className='stamina'>
                    <img className='stat-image' src='https://warcraft.wiki.gg/images/Attribute_stamina.svg?1bddaf'/>
                    <h3 className='stat-name'>Stamina:</h3>
                    <h3 style={{ color: 'rgb(255, 115, 1)' }} className='stat-value'>{stats.stamina.effective.toLocaleString('en-US')}</h3>
                </div>
            </div>

            {/* Secondary Stats */}
            <div className='bottom-stats'>
                {/* Crit Strike */}
                <div className='crit-strike'>
                    <img className='stat-image' src='https://warcraft.wiki.gg/images/Attribute_criticalstrike.svg?69da96'/>
                    <h3 className='stat-name'>Critical Strike:</h3>
                    <h3 style={{ color: 'rgb(255, 1, 1)' }} className='stat-value'>{Math.round(stats.melee_crit.value)}%</h3>
                    <div className='crit-tooltip'>
                        <h3>Critical Strike</h3>
                        <h4>{Math.round(stats.melee_crit.value)}%</h4>
                        <h3>Total Rating:</h3>
                        <h4>{stats.melee_crit.rating_normalized}</h4>
                    </div>
                </div>
                {/* Haste */}
                <div className='haste'>
                    <img className='stat-image' src='https://warcraft.wiki.gg/images/Attribute_haste.svg?a71547'/> 
                    <h3 className='stat-name'>Haste:</h3>
                    <h3 style={{ color: 'rgb(62, 255, 178)' }} className='stat-value'>{Math.round(stats.melee_haste.value)}%</h3>
                    <div className='haste-tooltip'>
                        <h3>Haste</h3>
                        <h4>{Math.round(stats.melee_haste.value)}%</h4>
                        <h3>Total Rating:</h3>
                        <h4>{stats.melee_haste.rating_normalized}</h4>
                    </div>
                </div>
                {/* Mastery */}
                <div className='mastery'>
                    <img className='stat-image' src='https://warcraft.wiki.gg/images/Attribute_mastery.svg?a0e006'/>
                    <h3 className='stat-name'>Mastery:</h3>
                    <h3 style={{ color: '#9256ff' }} className='stat-value'>{Math.round(stats.mastery.value)}%</h3>
                    <div className='mastery-tooltip'>
                        <h3>Mastery</h3>
                        <h4>{Math.round(stats.mastery.value)}%</h4>
                        <h3>Total Rating:</h3>
                        <h4>{stats.mastery.rating_normalized}</h4>
                    </div>
                </div>
                {/* Vers */}      
                <div className='versatility'>
                    <img className='stat-image' src='https://warcraft.wiki.gg/images/Attribute_versatility.svg?72321f'/>
                    <h3 className='stat-name'>Versatility:</h3>
                    <h3 style={{ color: 'grey' }} className='stat-value'>{Math.round(stats.versatility_damage_done_bonus)}%</h3>
                    <div className='versatility-tooltip'>
                        <h3>Versatility</h3>
                        <h4>{Math.round(stats.versatility_damage_done_bonus)}%</h4>
                        <h3>Total Rating:</h3>
                        <h4>{stats.versatility}</h4>
                    </div>
                </div> 
            </div>
        </div>
    )
}

export default StatRender