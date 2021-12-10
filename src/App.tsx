import React from 'react';
import './App.css';
import ActivityList from "./containers/ActivityList";
import NewActivity from "./containers/NewActivity";

class App extends React.Component {
    render() {
        return (
            <div>
                <div className="w-full header"></div>
                <div className="md:w-6 m-auto p-2">
                    <NewActivity/>
                    <ActivityList/>
                </div>
            </div>);
    }
}

export default App;
