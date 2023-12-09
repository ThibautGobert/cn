import NavBar from '../Components/Front/NavBar.jsx'
import Menu from "@/inertia/Components/Front/MenuCurved/Menu.jsx";
import {usePage} from "@inertiajs/react";
import {useEffect} from "react";
import {ToastUtility} from "@syncfusion/ej2-react-notifications";
import useToastHook from "@/inertia/Hooks/useToastHook.js";
const DefaultLayout = ({auth, children})=> {
    const message = usePage().props.message
    const errors = usePage().props.errors
    useToastHook({message, errors})

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
