import React from "react";
import "./list.css";
import nothing from "../../assets/no-results.png";
import { useDispatch } from "react-redux";
import {
  fetchAddUser,
  fetchRemoveUser,
  fetchUpdateUserData,
  fetchUpdateUserDataDragDrop,
} from "../../redux/Slice/user";
import Loader from "../loader/loader";

const List = ({ data, isLoading }) => {
  const [newUsername, setNewUsername] = React.useState("");
  const [newRank, setNewRank] = React.useState("");
  const [isUpdate, setIsUpdate] = React.useState(false);
  let inputStyle = isUpdate ? { display: "none" } : { display: "inline" };
  const dragItem = React.useRef(null);
  const dragOverItem = React.useRef(null);
  const currentUpdateId = React.useRef("");
  const dispatch = useDispatch();

  const handleSort = () => {
    let _users = JSON.parse(JSON.stringify(data));

    const params = {
      firstUser: {
        name: _users[dragItem.current].name,
        id: _users[dragItem.current]._id,
      },
      secondUser: {
        name: _users[dragOverItem.current].name,
        id: _users[dragOverItem.current]._id,
      },
    };

    dragItem.current = null;
    dragOverItem.current = null;

    dispatch(fetchUpdateUserDataDragDrop(params));
  };

  const handleNameChange = (e) => {
    setNewUsername(e.target.value);
  };
  const handleRankChange = (e) => {
    setNewRank(e.target.value);
  };

  const handleMainButton = async () => {
    const newData = {
      name: newUsername,
      rank: newRank,
    };
    const params = {
      id: currentUpdateId.current,
      newName: newUsername,
    };
    try {
      isUpdate
        ? dispatch(fetchUpdateUserData(params))
            .then(setIsUpdate(!isUpdate))
            .then((currentUpdateId.current = null))
        : dispatch(fetchAddUser(newData));
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemove = (id, name) => {
    if (window.confirm(`You really want delete ${name}?`)) {
      dispatch(fetchRemoveUser(id));
    }
  };
  const handleUpdate = (id, name) => {
    if (window.confirm(`You really want update ${name}?`)) {
      setIsUpdate(!isUpdate);
      currentUpdateId.current = id;
    }
  };

  return (
    <div className="list">
      <div className="input-group">
        <input
          type="text"
          name="userName"
          placeholder="e.g Nazar"
          onChange={handleNameChange}
        />
        <input
          type="text"
          style={inputStyle}
          name="userRank"
          placeholder="e.g 13"
          onChange={handleRankChange}
        />
        <button className="btn" disabled={isLoading} onClick={handleMainButton}>
          {isUpdate ? "Update user" : "Add user"}
        </button>
      </div>
      {data.length === 0 ? (
        <img className="empty__list" src={nothing} alt="Empty-list" />
      ) : (
        <ol className="list-container" start="1">
          {isLoading ? (
            <Loader />
          ) : (
            data.map((item, index) => (
              <>
                <li
                  id={item._id}
                  className="list-item"
                  draggable
                  onDragStart={() => (dragItem.current = index)}
                  onDragEnter={() => (dragOverItem.current = index)}
                  onDragEnd={handleSort}
                  onDragOver={(e) => e.preventDefault()}
                  key={item._id}
                >
                  <div className="user__container">
                    <div className="username">{item.name}</div>
                    <div className="user__info">
                      <span className="user__rank">Rank:{item.rank}</span>
                      <div>
                        <button
                          className="delete-btn"
                          onClick={(e) =>
                            handleRemove(e.target.id, e.target.name)
                          }
                          id={item._id}
                          name={item.name}
                        ></button>
                        <button
                          className="edit-btn"
                          onClick={(e) =>
                            handleUpdate(e.target.id, e.target.name)
                          }
                          id={item._id}
                          name={item.name}
                        ></button>
                      </div>
                    </div>
                  </div>
                </li>
              </>
            ))
          )}
        </ol>
      )}
    </div>
  );
};

export default List;
