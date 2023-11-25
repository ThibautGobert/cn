import Menu from "../Components/Menu.jsx";

export default function AdminLayout({children}) {
    return (
        <div>
            Layout
            <hr/>
            <Menu></Menu>
            <div>{children}</div>
        </div>
    )
}
