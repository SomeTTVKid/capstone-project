import NavBar from "./NavBar"

function NotFound(){

    return(
        <div className="not-found">
            <NavBar />
            <h1 style={{color: "red"}}>
                ERROR 404! CHARACTER NOT FOUND
            </h1>
        </div>
    )
}

export default NotFound