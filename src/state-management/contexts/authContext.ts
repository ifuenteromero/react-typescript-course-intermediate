import { Dispatch, createContext } from 'react';
import { AuthAction } from '../reducers/authReducer';

interface AuthContextType {
	user: string;
	dispatch: Dispatch<AuthAction>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);
AuthContext.displayName = 'AuthContext';

export default AuthContext;
