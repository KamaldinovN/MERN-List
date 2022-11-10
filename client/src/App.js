import React from "react";
import "./App.css";
import List from "./components/list/list";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "./redux/Slice/user";

function App() {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.users);

  React.useEffect(() => {
    dispatch(fetchUsers());
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <h2>Users List</h2>
      <List data={data} isLoading={status} />
    </div>
  );
}

export default App;
