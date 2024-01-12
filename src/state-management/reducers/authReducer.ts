interface LoginAction {
	type: 'LOGIN';
	username: string;
}

interface LogoutAction {
	type: 'LOGOUT';
}

type AuthAction = LoginAction | LogoutAction;

const authReducer = (state: string, action: AuthAction): string => {
	const { type } = action;
	switch (type) {
		case 'LOGIN':
			return action.username;
		case 'LOGOUT':
			return '';
		default:
			return state;
	}
};

export default authReducer;
