import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../context/ContextProvider'
import SearchForm from './SearchForm'
import logoImg from '../assets/logoImg.jpg'

function NavBar(){

    const { isSearching, setSearchingState } = useContext(Context)

    function handleClick(){
        setSearchingState(!isSearching)
    }

    return(
        <header className='navbar'>
            <Link to='/'><img className='logo' src={logoImg}></img></Link>
            <div className='home-div'>
                <Link className='link' to='/'>Home</Link>
            </div>
            <div className='about-div'>
                <Link className='link' to='/about'>About Me</Link>
            </div>
            <button className='search-btn' onClick={handleClick}>🔍</button>
            {isSearching && <SearchForm />}
        </header>
    )
}

export default NavBar