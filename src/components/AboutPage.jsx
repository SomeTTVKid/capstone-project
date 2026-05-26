import NavBar from './NavBar'

function AboutPage(){

    return(
        <div className='about-page'>
            <NavBar />
            <div className='main-content'>
                <div className='introduction'>
                    <h1>
                        Hello all, my name is Zayne and I am a <i>mostly</i> self taught 
                        programmer.
                    </h1>
                </div>
                <div className='first-experience'>
                    <h2>
                        I started my programming journey around 3 years ago now. In the beginning
                        I didnt understand anything as I was just following C# tutorials for unity,
                        and that really bothered me. So I quit that and started Angela Yu's Web Dev Bootcamp course
                        on Udemy. 
                    </h2>
                    <br />
                    <h2>
                        I managed to get through the HTML and CSS portion, but the CSS bored me so bad
                        I quit that as well (I know, I know), and started...Angela Yu's 100 Days of Python.
                        <br />
                        <br />
                        I got most of the way through that course but Python never really spoke to me. It was 
                        too vague and I still felt my fundamentals were lacking. I ended up grabbing a C++ Udemy course
                        for a cheap price and really dived deep into the course.
                    </h2>
                    <br />
                </div>  
                <div className='jobcorps-experience'>
                    <h2>
                        I joined Centennial Job Corps on August 19th, 2025 and I am going to be graduating
                        on May 28th, 2026. While at Job Corps, I got my A+ certification as well as the certifications
                        for: HTML, CSS, JavaScript, and React.
                    </h2>
                </div> 
                <div className='end'>
                    <h2>
                        Honestly, this is where the About Me section ends. I don't really have much more to share.
                        I plan to start CWI in the fall for software development to continue my programming journey
                        and I have plans to self study things that interest me, such as databases and potentially backend 
                        stuff. I hope you all found this informational and that the website isn't too horrendous.
                    </h2>
                </div>             
            </div>
        </div>
    )
}

export default AboutPage