import React,{useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import { setUsersData,updateLoader,getUser } from "../redux/slice/userReducer";
import { useNavigate, generatePath, useParams } from 'react-router-dom';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
const AddEditUser = () => {
  const fromPath = useSelector((state) => state?.users?.fromPath);
  const { id: id } = useParams();
  const dispatch=useDispatch()
  useEffect(()=>{
    if(fromPath=='edit'){
      // api call
      const formdata = {
          id: id
      }
      async function getUserDetail(){
        try {
            dispatch(updateLoader(true))
            const action = await dispatch(getUser(formdata));
            const response = action.payload;
            if (response?.length) {
                dispatch(setUsersData(response))
                setTimeout(()=>{
                    dispatch(updateLoader(false))
                },1000)
            } else {
                setTimeout(()=>{
                    dispatch(updateLoader(false))
                },1000)                
            }
          } catch (error) {
            throw error;
          }
      }
      getUserDetail()
    }
  },[fromPath])

  const onSubmit=()=>{
    // add or edit based on the call
  }

  return (
    <>
     <div>Add/EditUser</div>
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          id="outlined-required"
          label="Required"
        />
        <TextField
          id="outlined-disabled"
          label="Disabled"
          required
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          required
        />
        <TextField
          id="outlined-read-only-input"
          label="Read Only"
          defaultValue="Hello World"
          required
        />
        <TextField
          id="outlined-number"
          label="Number"
          type="number"
          required
        />
        <Button style={{marginRight:'5px'}} color="secondary" onClick={()=>onSubmit()}>{fromPath=='edit'?'Edit':'Add'}</Button>
      </div>
    </Box>
    </>
  )
}

export default AddEditUser