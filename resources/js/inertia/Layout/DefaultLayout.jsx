import NavBar from '../Components/Front/NavBar.jsx'
import Menu from "@/inertia/Components/Front/MenuCurved/Menu.jsx";
const DefaultLayout = ({auth, children})=> {
    return (
        <div className="min-vh-100 d-flex flex-column">
            <Menu></Menu>
            {/*<NavBar auth={auth}></NavBar>*/}
            <div className="flex-grow-1 flex-column d-flex">
                {children}
            </div>
        </div>
    )
}
export default DefaultLayout
