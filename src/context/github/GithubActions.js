import axios from "axios";

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;

const github = axios.create({
  baseURL: GITHUB_URL,
});

// Get search users
export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  });
  const response = await github.get(`/search/users?${params}`);
  return response.data.items;
};

// Get user and repos (replace getUser and getUserRepos actions)
export const getUserAndRepos = async (login) => {
  const params = new URLSearchParams({
    sort: "created",
    per_page: 10,
  });
  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos?${params}`),
  ]);

  return { user: user.data, repos: repos.data };
};
