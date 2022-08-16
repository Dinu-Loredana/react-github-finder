export const GithubReducer = (state, action) => {
  switch (action.type) {
    case "GET_USERS":
      return {
        ...state,
        users: action.payload,
        isLoading: false,
      };
    case "GET_USER_AND_REPOS":
      return {
        ...state,
        user: action.payload.user,
        repos: action.payload.repos,
        isLoading: false,
      };
    case "SET_IS_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "CLEAR_USERS":
      return {
        ...state,
        users: [],
      };
    default: {
      return state;
    }
  }
};
