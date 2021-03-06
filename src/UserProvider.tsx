import React, { useReducer } from "react";
import { UserContext, IUser } from "./UserContext";

interface InitialState {
  user: IUser | null;
}

const initialState: InitialState = { user: null };

if (localStorage.getItem("token")) {
  const token = localStorage.getItem("token") as string;
  if (token) {
    const existUser = {
      id: 4,
      username: "bob",
      email: "bob@bob.com",
      token,
    };
    initialState.user = existUser;
  }
}

interface AuthAction {
  type: string;
  payload?: IUser;
}

interface AuthState {
  user: IUser | null;
}

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload as IUser,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  // const [user, setUser] = useState<IUser | null>(null);
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (user: IUser) => {
    localStorage.setItem("token", user.token);
    // setUser(user);
    dispatch({ type: "LOGIN", payload: user });
  };

  const logout = () => {
    localStorage.removeItem("token");
    // setUser(null);
    dispatch({ type: "LOGOUT" });
  };

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        logout,
        login,
      }}>
      {children}
    </UserContext.Provider>
  );
};
