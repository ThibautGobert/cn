import DefaultLayout from "@/inertia/Layout/DefaultLayout.jsx";
import Show from "@/inertia/Pages/Agence/Show.jsx";

const Edit = ({user})=> {
    return (
        <h1>Edition</h1>
    )
}
Edit.layout = page =>  <DefaultLayout children={page} />
export default Edit
