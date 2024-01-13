import {
	Dispatch,
	ReactNode,
	createContext,
	useContext,
	useReducer,
} from 'react';

interface LoginAction {
	type: 'LOGIN';
	username: string;
}

interface LogoutAction {
	type: 'LOGOUT';
}

export type AuthAction = LoginAction | LogoutAction;

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

interface AuthContextType {
	user: string;
	dispatch: Dispatch<AuthAction>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);
AuthContext.displayName = 'AuthContext';

interface Props {
	children: ReactNode;
}

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: Props) => {
	const [user, dispatch] = useReducer(authReducer, '');

	return (
		<AuthContext.Provider value={{ user, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
};
