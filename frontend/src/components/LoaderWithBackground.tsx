import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const LoaderWithBackground = () => {
	return (
		<Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
			<CircularProgress color="inherit" />
		</Backdrop>
	);
};

export default LoaderWithBackground;
