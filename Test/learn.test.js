describe('groupe test 2', () => {
    test.concurrent('premier test 2',  () => {
        const a = 2 + 2;
        expect(a).toBe(4)
    })
    test.concurrent('premier test 2',  () => {
        const a = 2 + 2;
        expect(a).toBeGreaterThanOrEqual(4)
    })
})
