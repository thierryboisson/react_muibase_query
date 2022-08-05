export interface RoutePath {
    id: string;
    path: string;
  }
  
  export interface RoutesPath {
    app: RoutePath
    client: RoutePath
    prestation: RoutePath
    address: RoutePath
  }

  const clientManagement= "/client_manager"

  const routes: RoutesPath = {
    app: {id: "app", path: "/"},
    client:{id: "client", path: `${clientManagement}/client`},
    prestation:{id: "prestation", path: `${clientManagement}/prestation`},
    address:{id: "address", path: `${clientManagement}/address`},
  }
  
  
  export default routes;