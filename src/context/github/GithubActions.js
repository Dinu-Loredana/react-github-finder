const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;

// Get search users
export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  });
  const response = await fetch(`${GITHUB_URL}/search/users?${params}`);
  const { items } = await response.json();

  return items;
};

// Get user repos
export const getUserRepos = async (login) => {
  const params = new URLSearchParams({
    sort: "created",
    per_page: 10,
  });
  const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`);
  const data = await response.json();
  return data;
};

// Get single user
export const getUser = async (login) => {
  const response = await fetch(`${GITHUB_URL}/users/${login}`);
  //added some validation if url is wrong
  if (response.status === 404) {
    window.location = "/notfound";
  } else {
    const data = await response.json();
    // update state with the data received
    return data;
  }
};
