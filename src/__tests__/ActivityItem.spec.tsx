import React, {ReactElement} from "react";
import {Activity} from "../generated/api";
import {createRenderer} from "react-test-renderer/shallow";
import {NewActivity} from "../components/NewActivity";
import {ActivityList} from "../components/ActivityList";
import ActivityItem from "../components/ActivityItem";
import {render} from "@testing-library/react";
import {create} from "react-test-renderer";
import {Checkbox} from "primereact/checkbox";



let doneToggle: (a: Activity) => {};
let fetchActivities: () => {};

describe('ActivityItem suite', () => {

    function setup (activity: Activity) {
        doneToggle = jest.fn();
        fetchActivities = jest.fn();
        let instance: NewActivity;
        let container: ReactElement;
        const renderer = createRenderer()
        renderer.render(<ActivityItem
                            activity={activity}
                            doneToggle={doneToggle}
                            removeActivity={() => {}}
                            loading={{
                                remove: [],
                                edit: [],
                                fetch: false,
                                add: false
                            }}
        />);
        container = renderer.getRenderOutput();
        instance = renderer.getMountedInstance();

        let render1 = create((<ActivityItem activity={activity}
                                            doneToggle={doneToggle}
                                            removeActivity={() => {}}
                                            loading={{
                                                remove: [],
                                                edit: [],
                                                fetch: false,
                                                add: false
                                            }}

        />));
        return [container, instance, render1];
    }


    it('should render without throwing an error', function() {
        let [c, i, r] = setup({id: '1', date: 1, done: false, description: 'test'});
        expect(c).not.toBeNull();
        expect(i).not.toBeNull();

        let instance = r.root;
        expect(instance.findByProps({className: "description-item"}).children).toEqual(['test']);
        expect(instance.findByProps({className: "date"}).children).toEqual(['1970-01-01']);
    });


    it('should render invoke call back', function() {
        let [c, i, r] = setup({id: '1', date: 1, done: false, description: 'test'});
        expect(c).not.toBeNull();
        expect(i).not.toBeNull();

        let instance = r.root;
        instance.findByType(Checkbox).props.onChange({checked: true});
        expect(doneToggle).toHaveBeenCalledWith({id: '1', date: 1, done: true, description: 'test'});
    });



});

