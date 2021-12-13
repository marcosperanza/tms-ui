import activityReducer, {ActivityState, initialState} from "../store/activity-reducer";


describe('activity reducer', () => {
    it('should handle initial state', () => {
        expect(
            activityReducer(undefined,  {} as any)
        ).toEqual(
            {
                activities: [],
                progress: {
                    remove: [],
                    edit: [],
                    fetch: false,
                    add: false
                },
            }
        )
    })

    it('should add a new activity', () => {
        let payload = {id: '11-22-33', description: 'test act 1', date: 111111, done: false};
        expect(
            activityReducer(undefined,  {type: "ADD_ACTIVITY", payload: payload})
        ).toEqual(
            {
                activities: [payload],
                progress: {
                    remove: [],
                    edit: [],
                    fetch: false,
                    add: false
                },
            }
        )
    })

    it('should handle ADD_ACTIVITY_RQ', () => {
        expect(
            activityReducer(undefined,  {type: "ADD_ACTIVITY_RQ"})
        ).toEqual(
            {
                activities: [],
                progress: {
                    add: true,
                    remove: [],
                    edit: [],
                    fetch: false
                },
            }
        )
    })

    it('should handle FETCH_ACTIVITY_RQ', () => {
        expect(
            activityReducer(undefined,  {type: "FETCH_ACTIVITY_RQ"})
        ).toEqual(
            {
                activities: [],
                progress: {
                    add: false,
                    remove: [],
                    edit: [],
                    fetch: true
                },
            }
        )
    })


    it('should handle EDIT_ACTIVITY_RQ', () => {
        expect(
            activityReducer(undefined,  {type: "EDIT_ACTIVITY_RQ", payload: {id: "111"}})
        ).toEqual(
            {
                activities: [],
                progress: {
                    add: false,
                    remove: [],
                    edit: ["111"],
                    fetch: false
                },
            }
        )
    })

    it('should handle REMOVE_ACTIVITY_RQ', () => {
        expect(
            activityReducer(undefined,  {type: "REMOVE_ACTIVITY_RQ", payload: {id: "111"}})
        ).toEqual(
            {
                activities: [],
                progress: {
                    add: false,
                    remove: ["111"],
                    edit: [],
                    fetch: false
                },
            }
        )
    })

    it('should edit an existing activity', () => {
        let payload = {id: '11-22-33', description: 'test act 1', date: 111111, done: true};

        const initial = {
            error: undefined, progress: {
                add: false,
                remove: [],
                edit: ["11-22-33"],
                fetch: false
            },
            activities: [{id: '11-22-33', description: 'test act 1', date: 111111, done: false}]
        };
        expect(
            activityReducer(initial,  {type: "EDIT_ACTIVITY", payload: payload})
        ).toEqual(
            {
                ...initial,
                progress: {
                    ...initial.progress,
                    edit: []
                },
                activities: [payload]
            }
        )
    })

    it('should set activity and sort by date', () => {
        let payload = [
            {id: '11-22-33', description: 'test act 1', date: 1, done: true},
            {id: '11-22-33', description: 'test act 1', date: 3, done: true},
            {id: '11-22-33', description: 'test act 1', date: 2, done: true},
        ]

        expect(
            activityReducer(undefined,  {type: "SET_ACTIVITIES", payload: payload})
        ).toEqual(
            {
                ...initialState,
                activities: [
                    {id: '11-22-33', description: 'test act 1', date: 3, done: true},
                    {id: '11-22-33', description: 'test act 1', date: 2, done: true},
                    {id: '11-22-33', description: 'test act 1', date: 1, done: true},
                ]
            }
        )
    })

    it('should not change state if activity doesnt exist', () => {
        let payload = {id: 'not exists', description: 'test act 1', date: 111111, done: true};

        const initial: ActivityState = {
            activities: [{id: '11-22-33', description: 'test act 1', date: 111111, done: false}],
            progress: {
                add: false,
                fetch: false,
                edit: [],
                remove: [],
        }}
        expect(
            activityReducer(initial,  {type: "EDIT_ACTIVITY", payload: payload})
        ).toEqual(
            initial
        )
    })

    it('should remove activity', () => {
        let payload =
            {id: '11-22-33', description: 'test act 1', date: 1, done: true};

        const initial = {
            progress: {
                add: false,
                remove: ['11-22-33'],
                edit: [],
                fetch: false
            },
            activities: [{id: '11-22-33', description: 'test act 1', date: 111111, done: false}],
        };

        expect(
            activityReducer(initial,  {type: "REMOVE_ACTIVITY", payload: payload})
        ).toEqual(
            {
                ...initialState,
                progress: {
                    ...initial.progress,
                    remove: []
                },
                activities: [],
            }
        )
    })


})
