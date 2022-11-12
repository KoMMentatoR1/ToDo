import { FC, useEffect } from "react"
import "./less/main.less"
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import { useAction } from "./hooks/useAction";

const App: FC = () => {
    const {cheackAuth} = useAction()

    useEffect(() => {
        localStorage.getItem("token") && cheackAuth()
    }, [])

    return (
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    )
}

export default App;