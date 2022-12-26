import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("/fetchUsers", async () => {
  const { data } = await axios.get(`https://mernlist.onrender.com/`);
  return data;
});
export const fetchAddUser = createAsyncThunk(
  "/fetchAddUser",
  async (params) => {
    try {
      await axios.post(`https://mernlist.onrender.com/`, params);
      const { data } = await axios.get(`https://mernlist.onrender.com/`);
      return data;
    } catch (err) {
      if (err) {
        alert(
          err.response.data.message ||
            err.response.data.map((error) => error.msg)
        );
        const { data } = await axios.get(`https://mernlist.onrender.com/`);
        return data;
      }
    }
  }
);
export const fetchUpdateUserData = createAsyncThunk(
  "/fetchUpdateUserData",
  async (data) => {
    try {
      await axios.patch(`https://mernlist.onrender.com/${data.id}`, data);
    } catch (err) {
      if (err) {
        alert(
          err.response.data.message ||
            err.response.data.map((error) => error.msg)
        );
        throw err;
      }
    }
  }
);
export const fetchUpdateUserDataDragDrop = createAsyncThunk(
  "/fetchUpdateUserDataDragDrop",
  async (params) => {
    try {
      await axios.patch(`https://mernlist.onrender.com/`, params);
      const { data } = await axios.get(`https://mernlist.onrender.com/`);
      return data;
    } catch (err) {
      if (err) {
        alert(err.response.data.map((error) => error.msg));
      }
    }
  }
);
export const fetchRemoveUser = createAsyncThunk("/fetchRemoveUser", (id) => {
  axios.delete(`https://mernlist.onrender.com/${id}`);
});

const initialState = {
  data: [],
  status: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    [fetchUsers.pending]: (state) => {
      state.status = true;
      state.data = [];
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.status = false;
      state.data = action.payload;
    },
    //----------------------------------------//
    [fetchAddUser.pending]: (state) => {
      state.status = true;
    },
    [fetchAddUser.fulfilled]: (state, action) => {
      state.status = false;
      state.data = action.payload;
    },

    //----------------------------------------//
    [fetchUpdateUserData.pending]: (state) => {
      state.status = true;
    },
    [fetchUpdateUserData.fulfilled]: (state, action) => {
      // eslint-disable-next-line
      state.data.map((user) => {
        if (user._id === action.meta.arg.id)
          user.name = action.meta.arg.newName;
      });
      state.status = false;
    },
    [fetchUpdateUserData.rejected]: (state) => {
      state.status = false;
    },
    //----------------------------------------//
    [fetchUpdateUserDataDragDrop.pending]: (state) => {
      state.status = true;
    },
    [fetchUpdateUserDataDragDrop.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = false;
    },
    //----------------------------------------//
    [fetchRemoveUser.pending]: (state, action) => {
      state.data = state.data.filter((obj) => obj._id !== action.meta.arg);
    },
  },
});

export const { dragDrop } = userSlice.actions;
export const usersReducer = userSlice.reducer;
