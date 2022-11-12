import { FC, useEffect } from "react"
import "./less/main.less"
import { HashRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import { useAction } from "./hooks/useAction";

const App: FC = () => {
    const {cheackAuth} = useAction()

    useEffect(() => {
        localStorage.getItem("token") && cheackAuth()
    }, [])

    return (
        <HashRouter>
            <AppRouter />
        </HashRouter>
    )
}

export default App;