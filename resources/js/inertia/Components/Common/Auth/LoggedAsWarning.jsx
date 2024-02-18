import {Link, router, usePage} from "@inertiajs/react";
import SubmitBtn from "@/inertia/Components/Common/Form/SubmitBtn.jsx";
import {useState} from "react";

const LoggedAsWarning = ()=> {
    const isLoggedAs = usePage().props.loggedAs
    const currentUser = usePage().props.auth.user
    const mainUser = usePage().props.mainUser
    const [processing, setProcessing] = useState(false)

    const handleClick = ()=> {
        setProcessing(true)
        router.visit(route('auth.logoutAs'))
    }
    return <>
        {isLoggedAs && <div id="logged-as-container" className="alert alert-warning m-0 text-center">
            Connecté en tant que {currentUser.full_name} <br/>
            <SubmitBtn label={'Se reconnecter en tant que '+mainUser.full_name} processing={processing} iconCssClass="fa-solid fa-right-from-bracket me-2" clicked={()=>handleClick()}></SubmitBtn>
        </div>}
    </>
}
export default LoggedAsWarning
