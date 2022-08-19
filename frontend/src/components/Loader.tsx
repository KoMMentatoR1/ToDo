import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { FC } from 'react';

const Loader: FC = () => {
  return (
    <Box sx={{ display: 'flex', height: "80%", justifyContent: "center", alignItems: "center" }}>
      <CircularProgress />
    </Box>
  );
}

export default Loader;