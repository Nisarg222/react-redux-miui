import {Home} from '../views/Home.jsx';
import AddEditUser from "../views/AddEditUser.jsx"

export const routes = [
  {
    id: 1,
    name: 'home',
    path: '/',
    component: <Home />
  },
  {
    id: 2,
    name: 'addUser',
    path: 'add-user',
    component: <AddEditUser />
  },
  {
    id: 3,
    name: 'editUser',
    path: 'edit-user/:id',
    component: <AddEditUser />
  }
 ];
