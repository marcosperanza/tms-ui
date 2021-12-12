import React from 'react';
import './App.css';
import ActivityList from "./containers/ActivityList";
import NewActivity from "./containers/NewActivity";
import Header from "./containers/Header";

class App extends React.Component {
    render() {
        return (
            <div className={"flex flex-column justify-content-between"}>
               <Header/>
                <div className="md:w-6 md:m-auto p-2">
                    <NewActivity/>
                    <ActivityList/>
                </div>
            </div>);
    }
}

export default App;
