import {useEffect, useState} from "react";
import {AnimatePresence} from "framer-motion";
import MenuNav from "@/inertia/Components/Front/MenuCurved/MenuNav.jsx";
import {router, usePage} from "@inertiajs/react";
import {motion} from "framer-motion";

const Menu = ()=> {
    const [isActive, setIsActive] = useState(false);
    useEffect(()=> {
        router.on('start', (event) => {
            setIsActive(false)
        })
    }, [])

    return (
        <>
            <motion.div
                onClick={() => {setIsActive(!isActive)}}
                className={'front-menu ' + (isActive ? ' active' : '')}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
                <div className={`burger ${isActive ? "active" : ""}`}></div>
            </motion.div>
            <AnimatePresence mode="wait">
                {isActive && <MenuNav />}
            </AnimatePresence>
        </>
    )
}
export default Menu
