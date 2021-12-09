import React, {ReactElement} from "react";
import {Activity} from "../generated/api";
import {createRenderer} from "react-test-renderer/shallow";
import {NewActivity} from "../components/NewActivity";
import {ActivityList} from "../components/ActivityList";



let doneToggle: (a: Activity) => {};
let fetchActivities: () => {};

describe('ActivityList suite', () => {

    function setup (activities: Activity[]) {
        doneToggle = jest.fn();
        fetchActivities = jest.fn();
        let instance: NewActivity;
        let container: ReactElement;
        const renderer = createRenderer()
        renderer.render(<ActivityList activities={activities}  fetchActivities={fetchActivities} doneToggle={doneToggle}/>);
        container = renderer.getRenderOutput();
        instance = renderer.getMountedInstance();
        return [container, instance];
    }


    it('should render without throwing an error', function() {
        let [c, i] = setup([]);
        expect(c).not.toBeNull();
        expect(i).not.toBeNull();
    });


    it('should not render any ActionItem', function() {
        let [c, i] = setup([]);
        expect(c).not.toBeNull();
        expect(i).not.toBeNull();

        expect(c.props.children.length).toEqual(2);
        expect(c.props.children[0]).toEqual(false);
        expect(c.props.children[1].type).toEqual('div');

    });

    it('should render one ActionItem', function() {
        let [c, i] = setup([{id: '1', date: 1, done: false, description: 'test'}]);
        expect(c).not.toBeNull();
        expect(i).not.toBeNull();

        expect(c.props.children.length).toEqual(2);
        expect(c.props.children[0].length).toEqual(1);
        expect(c.props.children[0][0].type.name).toEqual('ActivityItem');
        expect(c.props.children[1]).toEqual(false);

    });


});

