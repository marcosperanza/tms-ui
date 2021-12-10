import React, {ReactElement} from 'react';
import App from '../App';
import {create} from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from 'redux-mock-store'
import {createRenderer} from "react-test-renderer/shallow";
import NewActivity from "../containers/NewActivity";
import ActivityList from "../containers/ActivityList"; //ES6 modules

const mockStore = configureStore([])

let container: ReactElement;

describe('APP', () => {

    beforeEach(() => {
        const renderer = createRenderer()
        renderer.render(<App />);
        container = renderer.getRenderOutput();
    });


    it('app should render', function() {
        const [header] = container.props.children
        expect(header.type).toBe("div")
    });

});
