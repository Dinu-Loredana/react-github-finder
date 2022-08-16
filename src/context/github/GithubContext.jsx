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

  // Get user repos
  const getUserRepos = async (login) => {
    setIsLoading();

    const params = new URLSearchParams({
      sort: "created",
      per_page: 10,
    });
    const response = await fetch(
      `${GITHUB_URL}/users/${login}/repos?${params}`
    );
    const data = await response.json();
    dispatch({
      type: "GET_REPOS",
      payload: data,
    });
  };

  // Get single user
  const getUser = async (login) => {
    setIsLoading();

    const response = await fetch(`${GITHUB_URL}/users/${login}`);
    //added some validation if url is wrong
    if (response.status === 404) {
      window.location = "/notfound";
    } else {
      const data = await response.json();
      // update state with the data received
      dispatch({
        type: "GET_USER",
        payload: data,
      });
    }
  };

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
        getUser,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
