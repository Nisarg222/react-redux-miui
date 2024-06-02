import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const HTTP = axios.create({
    baseURL: process.env.REACT_APP_API, // Assuming your backend server is running on the same host
    headers: {
      'Content-Type': 'application/json'
    }
  });

  export const loadUsers = createAsyncThunk(
    'loadUsers',
    async (formData, { dispatch, navigate }) => {
      try {
        const response = await HTTP.get('', formData);
        if (response.status == 200) {
            return response.data
        }
      } catch (error) {
        if (error.response.status == 401) {
          
        } else {
          throw error.response.data;
        }
      }
    }
  );

  export const getUser = createAsyncThunk(
    'getUser',
    async (formData, { dispatch, navigate }) => {
      try {
        const response = await HTTP.get(''+formData.id);
        if (response.status == 200) {
            return response.data
        }
      } catch (error) {
        if (error.response.status == 401) {
          
        } else {
          throw error.response.data;
        }
      }
    }
  );

  export const deleteUser = createAsyncThunk(
    'deleteUser',
    async (formData) => {
      debugger;
        console.log("form data",formData)
      try {
        const response = await HTTP.delete('',{
          id:formData.id
        });
        if (response.status == 200) {
            return response.data
        }
      } catch (error) {
        if (error.response.status == 401) {
          
        } else {
          throw error.response.data;
        }
      }
    }
  );


const initialStateValue = {
  loading: false,
  users:[],
  user:{},
  fromPath:''
};

const userSlice = createSlice({
  name: 'login',
  initialState: { ...initialStateValue },
  reducers: {
    setUsersData(state,action){
       state.users=action.payload
    },
    updateLoader(state,action){
        state.loading=action.payload
    },
    setFromPath(state,action){
      state.fromPath=action.payload
    }
  }
});

export const {
    setUsersData,updateLoader,deleteUsers,setFromPath
} = userSlice.actions;

export default userSlice.reducer;
