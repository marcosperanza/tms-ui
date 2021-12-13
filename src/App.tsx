import React from 'react';
import './App.css';
import Header from "./containers/Header";
import Body from "./containers/Body";

class App extends React.Component {
    render() {
        return (
            <div className={"flex flex-column justify-content-between"}>
               <Header/>
               <Body/>

            </div>);
    }
}

export default App;
