import React from 'react';
import './App.css';
import ActivityList from "./containers/ActivityList";
import NewActivity from "./containers/NewActivity";

class App extends React.Component {
    render() {
        return (
            <div className={"flex flex-column justify-content-between"}>
                <div className="header flex flex-row">
                    <span className={'font-bold text-xl ml-2 my-auto title'}>Task Management System</span>
                </div>
                <div className="md:w-6 md:m-auto p-2">
                    <NewActivity/>
                    <ActivityList/>
                </div>
            </div>);
    }
}

export default App;
