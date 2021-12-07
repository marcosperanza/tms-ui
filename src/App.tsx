import React, {Dispatch} from 'react';
import logo from './logo.svg';
import './App.css';
import {useDispatch} from "react-redux";
import {addActivity} from "./store/actionCreators";
import {NewActivity} from "./components/NewActivity";
import {Activity} from "./generated/api";

function App() {

  const dispatch: Dispatch<any> = useDispatch()

  const saveActivity = React.useCallback(
      (activity: Activity) => dispatch(addActivity(activity)),
      [dispatch]
  )


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <NewActivity createActivity={saveActivity} />

        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
