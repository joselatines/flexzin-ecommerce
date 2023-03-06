const asyncEvery = async (arr: any, predicate: (arg0: any) => any) => {
	for (let e of arr) {
		if (!(await predicate(e))) return false;
	}
	return true;
};


export default asyncEvery