import {useEffect, useState} from "react";
import {AnimatePresence} from "framer-motion";
import MenuNav from "@/inertia/Components/Front/MenuCurved/MenuNav.jsx";
import {router, usePage} from "@inertiajs/react";

const Menu = ()=> {
    const [isActive, setIsActive] = useState(false);
    useEffect(()=> {
        router.on('start', (event) => {
            setIsActive(false)
        })
    }, [])

    return (
        <>
            <div onClick={() => {setIsActive(!isActive)}} className="front-menu">
                <div className={`burger ${isActive ? "active" : ""}`}></div>
            </div>
            <AnimatePresence mode="wait">
                {isActive && <MenuNav />}
            </AnimatePresence>
        </>
    )
}
export default Menu
