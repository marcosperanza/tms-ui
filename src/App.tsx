import React from 'react';
import './App.css';
import ActivityList from "./containers/ActivityList";
import NewActivity from "./containers/NewActivity";

class App extends React.Component {
    render() {
        return (
            <div className="main m-auto">
                <NewActivity  />
                <ActivityList />
            </div>);
    }
}

export default App;
