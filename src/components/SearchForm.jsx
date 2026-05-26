import { useContext, useState } from "react"
import { Context } from "../context/ContextProvider"
import { useNavigate } from 'react-router-dom'

function SearchForm(props){

    const {name, slug} = props
    const [localFormData, setLocalFormData] = useState({ name: '', slug: '' })
    const { setCharacterInfo, setAccessToken, setRenderState, setSearchingState, setForm, formData, setCharAppearance, slugNames, initState, charInfo } = useContext(Context)
    const [filteredMatches, setFilteredMatches] = useState([])
    const [selected, setSelected] = useState("")
    const navigate = useNavigate()

    function handleSubmit(e){
        e.preventDefault()
        setForm(localFormData)
        const BNET_ID = import.meta.env.VITE_BNET_ID
        const BNET_SECRET = import.meta.env.VITE_BNET_SECRET
        const AUTH_URL = 'https://oauth.battle.net/token'

        async function fetchCharacterInfo(){
            try {
                // Authenticate
                const authResponse = await fetch(AUTH_URL, {
                method: "POST",
                headers: {
                    "Content-Type": 'application/x-www-form-urlencoded',
                },
                body: `grant_type=client_credentials&client_id=${BNET_ID}&client_secret=${BNET_SECRET}`,
                })
                if(!authResponse.ok) throw new Error("Auth failed")

                // Set our token
                const { access_token } = await authResponse.json()
                setAccessToken(access_token)

                // Get character data
                const characterInfo = await fetch(
                `https://us.api.blizzard.com/profile/wow/character/${localFormData.slug.toLowerCase()}/${localFormData.name.toLowerCase()}/equipment?namespace=profile-us&locale=en_US`,
                    {
                        headers: {
                            "Authorization" : `Bearer ${access_token}`
                        }
                    }
                )     
                if(!characterInfo.ok) throw new Error("Character data not found")

                // Set character data state
                const character = await characterInfo.json()
                setCharacterInfo(character)
                console.log("Equipment", character)

                // Get character images
                const characterAppearance = await fetch(
                `https://us.api.blizzard.com/profile/wow/character/${localFormData.slug.toLowerCase()}/${localFormData.name.toLowerCase()}/character-media?namespace=profile-us&locale=en_US`,
                    {
                        headers: {
                            "Authorization": `Bearer ${access_token}`
                        }
                    }
                )
                if(!characterAppearance.ok) throw new Error("Appearance data not found")

                // Set image state
                const appearance = await characterAppearance.json()
                setCharAppearance(appearance)

                setRenderState(true)
                setSearchingState(false)

                const cleanName = localFormData.name.toLowerCase()
                const cleanSlug = localFormData.slug.toLowerCase().replace(/\s+/g, '-')

                navigate(`/${cleanName}/${cleanSlug}`) 
                setLocalFormData(initState)
            
            } catch (error) {
                setSearchingState(false)
                navigate('/notfound')
            }
        }

        fetchCharacterInfo()
    }

    const isFormValid = localFormData.name.length > 1 && localFormData.slug.length > 4

    function handleChange(e){
        const {name, value} = e.target

        // Would be cool to match the current input
        // So Thr
        // Would only show realms starting with thr
        // Would have check the beginning 2-3 letters to do this
        // So multiple trims
        // Or checking the beginning three letters of the slug
        // Would have to modify our .includes() function I think
        // Requires more research
        if(name === "slug" && value.trim().length >= 2){
            const slugMatches = slugNames.filter((slug, i) => {
                return slug.toLowerCase().includes(value.toLowerCase())
            })
            const limitedSlugs = slugMatches.slice(0, 8)
            setFilteredMatches(limitedSlugs)
        }else{
            setFilteredMatches([])
        }

        setLocalFormData(prevLocalFormData => {
            return{
                ...prevLocalFormData, 
                [name] : value
            }
        })
    }

    function handleSelectSlug(chosenSlug) {
        setFilteredMatches([])

        setLocalFormData(prevLocalFormData => {
            return{
                ...prevLocalFormData, 
                slug : chosenSlug
            }
        })
    }

    return(
        <div>
            <form onSubmit={handleSubmit} className="search-form">
                <input 
                    onChange={handleChange} 
                    name="name" value={localFormData.name} 
                    className="name-form" 
                    placeholder="Character Name"
                    autoComplete="off"
                >
                </input>
                <input 
                    type="text"
                    onChange={handleChange} 
                    name="slug" value={localFormData.slug} 
                    className="realm-form" 
                    placeholder="Character Realm"
                    autoComplete="off"
                >
                </input>
                <button 
                    style={{visibility : isFormValid ? "visible" : "hidden"}} 
                    disabled={!isFormValid} 
                    type="submit"
                    className="submit-btn"
                >
                    Submit
                </button>
            </form> 
            {filteredMatches.length > 0 && (
                <ul className="slug-suggestions">
                    {filteredMatches.map((slug, i) => (
                        <li key={i} onClick={() => handleSelectSlug(slug)}>
                            {slug}
                        </li>
                    ))}
                </ul>
            )}  
        </div>
    )
}

export default SearchForm