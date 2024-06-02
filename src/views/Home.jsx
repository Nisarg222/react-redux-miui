import React,{useEffect} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch,useSelector } from "react-redux";
import { loadUsers,setUsersData,updateLoader,deleteUser,setFromPath } from "../redux/slice/userReducer";
import Loader from "./Loader";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import { useNavigate, generatePath } from 'react-router-dom';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
  
export const Home=()=>{
    const dispatch=useDispatch();
    const data = useSelector((state) => state?.users?.users);
    const navigate=useNavigate()

    const addEditUser=async(mode,id='')=>{
        if(mode=='add'){
            dispatch(setFromPath(mode))
            navigate('add-user  ');
        } else if(mode=='edit'){
            dispatch(setFromPath(mode))
            const path = generatePath('edit-user/:id', { id });
            navigate(path);
        }
    }

    /** Deletes the user */
    const deleteUserWithId = async (id) => {
        if(window.confirm("Are you sure you want to delete this user?")){
            const formdata = {
                id: id
            }
            try {
                const action = await dispatch(deleteUser(formdata))
                const response = action.payload;
                if (response) {
                    const action = await dispatch(loadUsers());
                    const response = action.payload;
                    dispatch(setUsersData(response))
                    setTimeout(() => {
                        dispatch(updateLoader(false))
                    }, 1000)
                }
            } catch (err) {
                console.error(err);
            }
        }
    }

    useEffect(()=>{
        async function getUsers(){
            try {
                dispatch(updateLoader(true))
                const action = await dispatch(loadUsers());
                const response = action.payload;
                if (response.length) {
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
        getUsers()
    },[])

    return(
        <>
        {data?.users?.loading?<Loader/>:<>
        <div style={{margin:'5px'}}>    
            <Button color="primary" variant="contained" onClick={()=>addEditUser('add','')}>
                Add user
            </Button>
        </div>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center">Contact</TableCell>
                    <TableCell align="center">Website</TableCell>
                    <TableCell align="center">Action</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {data && data.map((user) => (
                    <TableRow
                    key={user.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            {user.name}
                        </TableCell>
                        <TableCell align="center">{user.email}</TableCell>
                        <TableCell align="center">{user.phone}</TableCell>
                        <TableCell align="center">{user.website}</TableCell>
                        <TableCell
                            className='mobile-hide font-inter'
                            style={{ color: '#000000', cursor: 'pointer' }}
                        >
                            <ButtonGroup
                                variant="contained"
                                aria-label="Disabled button group"
                            >
                                <Button style={{marginRight:'5px'}} color="secondary" onClick={()=>addEditUser('edit',user.id)}><ModeEditIcon/></Button>
                                <Button color="primary" onClick={()=>deleteUserWithId(user.id)}><DeleteIcon/></Button>
                            </ButtonGroup>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </>}
        </>
    )
}
