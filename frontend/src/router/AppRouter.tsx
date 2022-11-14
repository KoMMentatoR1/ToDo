import { Route, Routes } from 'react-router-dom';
import { useTypeSelector } from '../hooks/useTypeSelector';
import { publicRoutes, userRoutes } from './routing';

const AppRouter = () => {
	const { isAuth, user } = useTypeSelector((state) => state.user);

	if (isAuth && user.user.isActivated) {
		return (
			<Routes>
				{userRoutes.map((route) => (
					<Route path={route.path} element={route.element} key={route.path} />
				))}
			</Routes>
		);
	} else {
		return (
			<Routes>
				{publicRoutes.map((route) => (
					<Route path={route.path} element={route.element} key={route.path} />
				))}
			</Routes>
		);
	}
};

export default AppRouter;
