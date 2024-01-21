import Menu from "@/inertia/Components/Front/MenuCurved/Menu.jsx";
import {Head, Link, usePage} from "@inertiajs/react";
import useToastHook from "@/inertia/Hooks/useToastHook.js";
import {motion} from "framer-motion";

const DefaultLayout = ({auth, children})=> {
    const message = usePage().props.message
    const title = usePage().props.title || ''
    const errors = usePage().props.errors
    useToastHook({message, errors})

    return <>
        <Head title={title} />
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="min-vh-100 d-flex flex-column">
            <Link href="/">
                <img src="/images/logo-75.png" alt="logo croquez nous" className="front-logo"/>
            </Link>
            <Menu></Menu>
            {/*<NavBar auth={auth}></NavBar>*/}
            <div className="flex-grow-1 flex-column d-flex" style={{marginTop: '100px'}}>
                {children}
            </div>
        </motion.div>
    </>
}
export default DefaultLayout
