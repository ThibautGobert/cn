import {useState} from "react";
import {Link, router, usePage} from "@inertiajs/react";
import { motion } from 'framer-motion';
import Curve from "@/inertia/Components/Front/MenuCurved/Curve.jsx";

const MenuNav = ()=> {
    const {frontSidebarItems, auth} = usePage().props
    let isActive= false
    const slide = {
        initial: {x: 80},
        enter: i => ({x: 0, transition: {duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i}}),
        exit: i => ({x: 80, transition: {duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i}})
    }
    const scale = {
        open: {scale: 1, transition: {duration: 0.3}},
        closed: {scale: 0, transition: {duration: 0.4}}
    }
    const menuSlide = {
        initial: {x: "calc(100% + 100px)"},
        enter: {x: "0", transition: {duration: 0.8, ease: [0.76, 0, 0.24, 1]}},
        exit: {x: "calc(100% + 100px)", transition: {duration: 0.8, ease: [0.76, 0, 0.24, 1]}}
    }
    //const pathname = usePathname();
    const [selectedIndicator, setSelectedIndicator] = useState();
    return (
        <motion.div
            variants={menuSlide}
            initial="initial"
            animate="enter"
            exit="exit"
            className="menu-item-wrapper"
        >
            <div className="body">
                {/*onMouseLeave = {() => {setSelectedIndicator(pathname)}}*/}
                <div  className="nav">
                    <div className="header">
                        {auth.user ? (
                            <div>
                                <div className="d-flex align-items-center">
                                    <div className="me-3">
                                        <img className="img-fluid rounded rounded-circle avatar-sm" src={auth.user.avatar} alt=""/>
                                    </div>
                                    <div>
                                        <div>
                                            {auth.user.full_name}
                                        </div>

                                        <Link className="text-danger" href={route('logout')} >Se déconnecter</Link>
                                    </div>

                                </div>
                            </div>
                        ):
                            <div>
                                <Link href={route('login')}></Link>
                            </div>
                        }

                    </div>
                    {
                        frontSidebarItems.map( (data, index) => {
                            //  onMouseEnter={() => {setSelectedIndicator('href')}}
                            return <motion.div
                                key={index}
                                className="link"
                                custom={index}
                                variants={slide}
                                initial="initial"
                                animate="enter"
                                exit="exit"
                            >
                                <motion.div
                                    variants={scale}
                                    animate={isActive ? "open" : "closed"}
                                    className="indicator">
                                </motion.div>
                                <Link href={data.url}>{data.nodeText}</Link>
                            </motion.div>
                        })
                    }
                </div>
                <div className="footer">
                   
                </div>
            </div>
            <Curve />
        </motion.div>
    )
}

export default MenuNav
