import { Route, Routes, useNavigate, } from "react-router-dom";
import AddressInfo from "../address/get/view/AddressInfo";
import ClientAddresses from "../address/get/view/ClientAddress";
import ClientCreateForm from "../client/edit/ui/ClientCreateForm";
import ClientUpdateForm from "../client/edit/ui/ClientUpdateForm";
import ClientInfo from "../client/get/view/ClientInfo";
import ClientList from "../client/get/view/ClientList";
import NavBar, { NavBarActions } from "./navigation/ui/Navbar";
import routes from "./routes";
import Theme from "./theme/Theme";

const navBarActions: NavBarActions = [
    {label: "Client", id: routes.client.id , path: routes.client.path},
    {label: "Prestation", id:  routes.prestation.id, path: routes.prestation.path},
    {label: "Address", id:  routes.address.id, path: routes.address.path}
]

const Content = () => {

    const navigate = useNavigate()
    return (
        <Theme>
        <div className="content-container">
            <NavBar actions={navBarActions}/>
            <div style={{width: "100%"}}>
                <Routes>
                    <Route index element={<div>Welcome</div>}/>
                    <Route path={routes.client_manager.id}>
                        <Route path={routes.client.id} element={<ClientList/>}>
                            <Route path=":clientId" element={<ClientInfo/>}>
                                <Route path="address" element={<ClientAddresses/>}>
                                    <Route path=":addressId" element={<AddressInfo/>}/>
                                </Route>
                            </Route>
                            <Route path={routes.createClient.id} element={<ClientCreateForm onSubmitCallback={() => navigate(routes.client.path)} onCancel={() => navigate(routes.client.path)} />} />
                            <Route path={routes.updateClient.id}>
                                <Route path=":clientId" element={<ClientUpdateForm onSubmitCallback={() => navigate(routes.client.path)} onCancel={() => navigate(routes.client.path)}/>}/> 
                            </Route>
                        </Route>
                        <Route path={routes.address.id} element="Adresss"></Route>
                    <Route path={routes.prestation.id} element="Peestation"></Route>
                    </Route>
                </Routes>
            </div>
        </div>
    </Theme>
    )
}

export default Content