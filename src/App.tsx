import React, {Dispatch} from 'react';
import logo from './logo.svg';
import './App.css';
import {useDispatch} from "react-redux";
import {addActivity} from "./store/actionCreators";
import {Activity} from "./generated/api";
import NewActivity from "./components/NewActivity";

function App() {

  const dispatch: Dispatch<any> = useDispatch()

  const saveActivity = React.useCallback(
      (activity: Activity) => dispatch(addActivity(activity)),
      [dispatch]
  )


  return (
    <div className="main m-auto">
        <NewActivity createActivity={saveActivity} />
    </div>
  );
}

export default App;
