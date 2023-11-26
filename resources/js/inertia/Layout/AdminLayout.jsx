import Menu from "../Components/Menu.jsx";
import SideBar from "@/inertia/Components/Admin/SideBar.jsx";

export default function AdminLayout({children}) {
    return (
        <div>
            Layout
            <hr/>
            <Menu></Menu>
            <SideBar></SideBar>
            <div>{children}</div>
        </div>
    )
}
