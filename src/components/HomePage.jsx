import NavBar from './NavBar'
import PillarLeft from '../assets/dark-portal-left.jpg'
import PillarRight from '../assets/dark-portal-right.jpg'

function HomePage(){

    return(
        <div className='home-page'>
            <NavBar />
            <img 
                className='pillar-left'
                src={PillarLeft}
            />
            <img
                className='pillar-right'
                src={PillarRight}
            />
            <div className='main-content'>
                <div className='welcome'>
                    <h1>Welcome to my WoW Armory project!</h1>
                    <br />
                    <p>
                        I Started this project because I wanted to put into practice
                        all I had learned from the coding class at Centennial Job Corps.
                        This project is using everything I learned, and some things I did not,
                        from the coding class. 
                    </p>
                </div>
                <div className='workings'>
                    <h2>How does this website work?</h2>
                    <br />
                    <p>
                        This web app uses Blizzard's public API to retrieve WoW character data
                        and then displays it in a layout similar to in-game and the official 
                        WoW Armory website. I did not try to reinvent the layout because it's, 
                        in my own opinion, simply the perfect layout. For more information about 
                        the API calls I have used, I will link the documentation 
                        <a 
                            href='https://community.developer.battle.net/documentation/world-of-warcraft/game-data-apis'
                            target='_blank'
                            className='api-link'
                        >
                            HERE
                        </a>.
                    </p>                    
                </div>
                <div className='using'>
                    <h2>How can we use this website?</h2>
                    <br />
                    <p>
                        The use is really simple. The first thing you must know is a WoW character's name
                        and the realm/server they are on! I'll provide some example ones if you do not have a 
                        WoW character or do not know a WoW character's name and realm. 
                        <br />
                        <br />
                        To search the character
                        simply click the search icon button on the top right. Once the forms have been shown, enter the name
                        and realm. Once the forms are filled out a submit button will appear, you
                        do <b className='underline'>NOT</b> need to click the button, but you can if you want. Simply submit the form I.E. 
                        press enter or click the button, and you will be taken to a new page that handles all the 
                        rendering and data proccessing for that character. The name and realm do not need any capitalization
                        as on the backend I turn it to lowercase for the API request anyways!
                        <br />
                        <br />
                        I <b className='underline'>PAINSTAKINGLY</b> verified all <b className='underline'>207</b> U.S. realm names and have
                        provided an auto-suggest feature that you can click on to select the realm, if you dont feel
                        like typing the full name out.
                    </p>                    
                </div>
                <div className='examples'>
                    <h3>Character Examples:</h3>
                    <br />
                    <p>
                        (Clucktis - Thrall)
                        <br />
                        (Clucktis - Moon-Guard)
                        <br />
                        (Notahealr - Thrall)
                        <br />
                        (Rodriquez - Anetheron)  
                        <br />
                        (Holyshoc - Thrall)
                        <br />
                        (Dmglol - Thrall)  
                    </p>                     
                </div>
                <div className='api-calls'>
                    <h2>What API calls are you using?</h2>
                    <br />
                    <p>
                        The website uses three API's to grab all the neccessary data. 
                        The first one is the Character Equipment API. This returns what items the character
                        has equipped. The second one is the Character Appearance API. This call returns some
                        static images of the character to render on the screen. And the third API call is the 
                        Character Statistics API. This API returns the stats of the character.
                    </p>                    
                </div>
                <div className='difficulty'>
                    <h2>Most difficult parts of making this website?</h2>
                    <br />
                    <p>
                        I would say the most difficult part of this project was understanding how
                        to properly handle the response of the API calls. Many <b className='underline'>MANY</b> console logs 
                        were needed for me to fully understand the path to what data I needed at a given
                        time. 
                        <br />
                        <br />
                        The second most challenging part was making components in a readable way
                        that would handle the data and do what I wanted to do with it. I still think 
                        that I could make the component code more readable and seperate it out into 
                        smaller components, given time, but the final version is more than satisfactory.
                    </p>                    
                </div>
                <div className='future-plans'>
                    <h2>Future plans?</h2>
                    <br />
                    <p>
                        As it stands, this is the final version of the website. While I did want to add in 
                        a 3D model viewer, the documentation and setup proved to be too much of a hassle 
                        for me in the deadline that I set for myself. With more time and motivation, I 
                        believe I could get it working. I think web dev was much more difficult to put into
                        practice than I thought and I do not plan on making any more web apps for the foreseable
                        future.
                    </p>                    
                </div>
            </div>
        </div>
    )
}

export default HomePage