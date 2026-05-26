import { useContext } from 'react'
import { Context } from '../context/ContextProvider'
import NavBar from './NavBar'
import Tooltip from './Tooltip'
import RenderCharacter from "./RenderCharacter"
import StatRender from './StatRender'
import BG from '../assets/BG.jpg'

function SearchResults(){

    const { isDataPopulated, setRenderState } = useContext(Context)

    return(
        <div>
            <NavBar />
            {<img className='bg-image' src={BG} />}
            <RenderCharacter />
            {isDataPopulated && <Tooltip />}
            {isDataPopulated && <StatRender />}
        </div>
    )
}

export default SearchResults