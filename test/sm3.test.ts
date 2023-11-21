import sm3 from "../src/sm3";
test('printStudent', () => {
	console.log(sm3('123'))
	expect(sm3('123').toString());
});
