import React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

function Loader() {
  return (
    <div className='loader'>
      <div className='fade-in inner-loader'>
        <Stack sx={{ color: 'grey.500' }} spacing={2} direction='row'>
          <CircularProgress sx={{ color: 'white' }} />
        </Stack>
      </div>
    </div>
  );
}

export default Loader;
