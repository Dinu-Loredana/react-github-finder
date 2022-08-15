export const GithubReducer = (state, action) => {
  switch (action.type) {
    case "GET_USERS":
      return {
        ...state,
        users: action.payload,
        isLoading: false,
      };
    case "SET_IS_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    default: {
      return state;
    }
  }
};