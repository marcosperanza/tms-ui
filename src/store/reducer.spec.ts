import reducer from "./reducer";


describe('activity reducer', () => {
    it('should handle initial state', () => {
        expect(
            reducer(undefined,  {} as any)
        ).toEqual(
            {
                activities: [],
                error: ''
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
                error: ''
            }
        )
    })

    it('should add a error', () => {
        let payload = {errorMessage: 'fake error'};
        expect(
            reducer(undefined,  {type: "ERROR", payload: payload})
        ).toEqual(
            {
                activities: [],
                error: 'fake error'
            }
        )
    })


})
