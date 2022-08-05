import ClientList from "../client/get/view/ClientList";
import NavBar from "./navigation/ui/Navbar";
import Theme from "./theme/Theme";

const Content = () => (
    <Theme>
        <div className="content-container">
            <NavBar/>
            <ClientList/>
        </div>
    </Theme>
)

export default Content