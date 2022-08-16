import { createContext, useReducer } from "react";
import { GithubReducer } from "./GithubReducer";

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;

const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    isLoading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Set loading to true
  const setIsLoading = () => dispatch({ type: "SET_IS_LOADING" });
  // Clear users from state
  const clearUsers = () => dispatch({ type: "CLEAR_USERS" });

  return (
    <GithubContext.Provider
      value={{
        ...state,
        dispatch,
        clearUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
