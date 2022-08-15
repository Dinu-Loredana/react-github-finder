import React, { useContext } from "react";
import GithubContext from "../../context/github/GithubContext";
import { Spinner } from "../layout/Spinner";
import { UserItem } from "./UserItem";

export const UserResults = () => {
  const { users, isLoading } = useContext(GithubContext);

  //   useEffect(() => {
  //     fetchUsers();
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  if (!isLoading) {
    return (
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {users.map((user) => {
          return <UserItem key={user.id} user={user} />;
        })}
      </div>
    );
  } else {
    return <Spinner />;
  }
};
