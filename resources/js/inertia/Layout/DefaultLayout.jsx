import Menu from "@/inertia/Components/Front/MenuCurved/Menu.jsx";
import {usePage} from "@inertiajs/react";
import useToastHook from "@/inertia/Hooks/useToastHook.js";
import {motion} from "framer-motion";

const DefaultLayout = ({auth, children})=> {
    const message = usePage().props.message
    const errors = usePage().props.errors
    useToastHook({message, errors})

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="min-vh-100 d-flex flex-column">
            <img src="/images/logo-75.png" alt="logo croquez nous" className="front-logo"/>
            <Menu></Menu>
            {/*<NavBar auth={auth}></NavBar>*/}
            <div className="flex-grow-1 flex-column d-flex" style={{marginTop: '100px'}}>
                {children}
            </div>
        </motion.div>
    )
}
export default DefaultLayout
