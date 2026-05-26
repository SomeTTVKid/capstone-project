import { useContext } from 'react'
import { Context } from '../context/ContextProvider'

// This will have to call the statistics api
// Then just render out the stats in a readable way
function StatRender(){

    const { formData, token } = useContext(Context)
    const formattedName = formData.name.toLowerCase()
    const formattedSlug = formData.slug.toLowerCase()

    async function getStats(){
        const statResponse = await fetch(
        `https://us.api.blizzard.com/profile/wow/character/${formattedSlug}/${formattedName}/statistics?namespace=profile-us&locale=en_US`,
            {
                headers: {
                        "Authorization": `Bearer ${token}`
                }
            }
        )

        const statData = await statResponse.json()
        console.log(statData)
    }

    getStats()

    return(
        <div className='player-stats'>

        </div>
    )
}

export default StatRender