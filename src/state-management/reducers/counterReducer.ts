interface Action {
	type: 'INCREMENT' | 'RESET';
}

const counterReducer = (state: number, action: Action): number => {
	const { type } = action;
	switch (type) {
		case 'INCREMENT':
			return state + 1;
		case 'RESET':
			return 0;
		default:
			return state;
	}
};

export default counterReducer;
