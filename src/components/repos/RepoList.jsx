import React from "react";
import PropTypes from "prop-types";

const RepoList = ({ repos }) => {
  return (
    <div className="rounded-lg shadow-lg card bg-base-100">
      <div className="card-body">
        <h2 className="text-3xl my-4 font-bold card-title">
          Latest Respositories
        </h2>
        {repos.map((repo) => (
          <h3 key={repo.name}>{repo.name}</h3>
        ))}
      </div>
    </div>
  );
};

export default RepoList;

RepoList.propTypes = {
  repos: PropTypes.array.isRequired,
};
