export interface RoutePath {
    id: string;
    path: string;
  }
  
  export interface RoutesPath {
    app: RoutePath
    client_manager: RoutePath
    client: RoutePath
    createClient: RoutePath
    updateClient: RoutePath
    prestation: RoutePath
    address: RoutePath
  }

  const clientManagement= "/client_manager"
  const client= "client"

  const routes: RoutesPath = {
    app: {id: "app", path: "/"},
    client_manager:{id: "client_manager", path: `${clientManagement}`},
    client:{id: "client", path: `${clientManagement}/${client}`},
    createClient:{id: "createClient", path: `${clientManagement}/${client}/createClient`},
    updateClient:{id: "updateClient", path: `${clientManagement}/${client}/updateClient`},
    prestation:{id: "prestation", path: `${clientManagement}/prestation`},
    address:{id: "address", path: `${clientManagement}/address`},
  }
  
  
  export default routes;