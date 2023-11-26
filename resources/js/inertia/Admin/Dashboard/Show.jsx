import DefaultLayout from "@/inertia/Layout/DefaultLayout.jsx";
import AdminLayout from "@/inertia/Layout/AdminLayout.jsx";

export default function Show() {
    return (
        <h1>Dashboard admin</h1>
    )
}
Show.layout = page =>  <AdminLayout children={page} />
