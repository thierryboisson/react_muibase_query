import { Route, Routes } from "react-router-dom";
import ClientList from "../client/get/view/ClientList";
import NavBar, { NavBarActions } from "./navigation/ui/Navbar";
import routes from "./routes";
import Theme from "./theme/Theme";

const navBarActions: NavBarActions = [
    {label: "Client", id: routes.client.id , path: routes.client.path},
    {label: "Prestation", id:  routes.prestation.id, path: routes.prestation.path},
    {label: "Address", id:  routes.address.id, path: routes.address.path}
]

const Content = () => (
    <Theme>
        <div className="content-container">
            <NavBar actions={navBarActions}/>
                <Routes>
                    <Route path={routes.app.path}>Welcome</Route>
                    <Route path={routes.client.path} element={<ClientList/>}></Route>
                    <Route path={routes.address.path} element="Adresss"></Route>
                    <Route path={routes.prestation.path} element="Peestation"></Route>
                </Routes>
        </div>
    </Theme>
)

export default Content