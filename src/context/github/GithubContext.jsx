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

  return (
    <GithubContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
