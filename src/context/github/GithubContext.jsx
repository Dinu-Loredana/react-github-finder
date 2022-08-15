import { createContext, useReducer } from "react";
import { GithubReducer } from "./GithubReducer";

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    isLoading: false,
  };
  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Get search users
  const searchUsers = async (text) => {
    setIsLoading();

    const params = new URLSearchParams({
      q: text,
    });
    const response = await fetch(
      `${GITHUB_URL}/search/users?${params}`
      // , {
      //   headers: {
      //     Authorization: `token ${GITHUB_TOKEN}`,
      //   },
      // }
    );
    const { items } = await response.json();
    // update state with the data received
    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  };

  // Get single user
  const getUser = async (login) => {
    setIsLoading();

    const response = await fetch(
      `${GITHUB_URL}/users/${login}`
      // , {
      //   headers: {
      //     Authorization: `token ${GITHUB_TOKEN}`,
      //   },
      // }
    );
    //added some validation if url is wrong
    if (response.status === 404) {
      window.location = "/notfound";
    } else {
      const data = await response.json();
      console.log("data", data);
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
        users: state.users,
        user: state.user,
        isLoading: state.isLoading,
        searchUsers,
        clearUsers,
        getUser,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
