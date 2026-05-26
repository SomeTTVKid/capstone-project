import { useContext } from 'react'
import { Context } from '../context/ContextProvider'

function RenderCharacter(){

    const { charAppearance } = useContext(Context)
    if(!charAppearance){ return }
    const fullImage = charAppearance.assets[2].value

    return(
        <img
            className='full-image'
            src={fullImage} 
        />
    )
}

export default RenderCharacter