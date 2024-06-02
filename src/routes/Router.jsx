import React from 'react';
import { Routes, Route } from 'react-router-dom';
import  {routes}  from './route';
import { Container } from '@mui/material';
const Router = () => {
  return (
        <main className='main'>
            <Container maxWidth='xl'>
                    <Routes>
                        {routes.map((ele) => {
                            return (
                                <Route
                                    key={ele.id}
                                    path={ele.path}
                                    element={ele.component}
                                    name={ele.name}
                                />
                                );
                            })}
                    </Routes>
            </Container>
        </main>
  )
}

export default Router