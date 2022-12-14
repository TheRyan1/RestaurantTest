import React, {useEffect} from "react";
import "./App.css";
import Layout from "./Components/Layout";
import Login from "./Pages/Login";
import {Authenticate} from "./API/Auth";

function App() {

    const [loggedIn, setLoggedIn] = React.useState(Authenticate());


    useEffect(() => {
        setLoggedIn(Authenticate())
    }, [loggedIn]);

    return <div className="App">{loggedIn ? <Layout/> : <Login setLoggedIn={setLoggedIn}/>}</div>;
}

export default App;
