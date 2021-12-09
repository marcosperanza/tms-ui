import reducer, {initialState} from "../store/reducer";


describe('activity reducer', () => {
    it('should handle initial state', () => {
        expect(
            reducer(undefined,  {} as any)
        ).toEqual(
            {
                activities: [],
                error: undefined,
                progress: {
                    add: false,
                    edit: false,
                    fetch: false,
                }
            }
        )
    })

    it('should add a new activity', () => {
        let payload = {id: '11-22-33', description: 'test act 1', date: 111111, done: false};
        expect(
            reducer(undefined,  {type: "ADD_ACTIVITY", payload: payload})
        ).toEqual(
            {
                activities: [payload],
                error: undefined,
                progress: {
                    add: false,
                    edit: false,
                    fetch: false
                }

            }
        )
    })

    it('should handle ADD_ACTIVITY_RQ', () => {
        expect(
            reducer(undefined,  {type: "ADD_ACTIVITY_RQ"})
        ).toEqual(
            {
                activities: [],
                error: undefined,
                progress: {
                    add: true,
                    edit: false,
                    fetch: false
                }

            }
        )
    })

    it('should handle FETCH_ACTIVITY_RQ', () => {
        expect(
            reducer(undefined,  {type: "FETCH_ACTIVITY_RQ"})
        ).toEqual(
            {
                activities: [],
                error: undefined,
                progress: {
                    add: false,
                    edit: false,
                    fetch: true
                }

            }
        )
    })


    it('should handle EDIT_ACTIVITY_RQ', () => {
        expect(
            reducer(undefined,  {type: "EDIT_ACTIVITY_RQ"})
        ).toEqual(
            {
                activities: [],
                error: undefined,
                progress: {
                    add: false,
                    edit: true,
                    fetch: false
                }

            }
        )
    })

    it('should edit an existing activity', () => {
        let payload = {id: '11-22-33', description: 'test act 1', date: 111111, done: true};

        const initial = {
            error: undefined, progress: {add: false, edit: true, fetch: false},
            activities: [{id: '11-22-33', description: 'test act 1', date: 111111, done: false}]
        };
        expect(
            reducer(initial,  {type: "EDIT_ACTIVITY", payload: payload})
        ).toEqual(
            {
                ...initial,
                progress: {
                    ...initial.progress,
                    edit: false
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
            reducer(undefined,  {type: "SET_ACTIVITIES", payload: payload})
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

        const initial = {
            error: undefined, progress: {add: false, edit: false, fetch: false},
            activities: [{id: '11-22-33', description: 'test act 1', date: 111111, done: false}]
        };
        expect(
            reducer(initial,  {type: "EDIT_ACTIVITY", payload: payload})
        ).toEqual(
            initial
        )
    })

    it('should add a error', () => {
        let payload = {errorMessage: 'fake error'};
        expect(
            reducer(undefined,  {type: "ERROR", payload: payload})
        ).toEqual(
            {
                ...initialState,
                error: {errorMessage: 'fake error'},
            }
        )
    })


})
