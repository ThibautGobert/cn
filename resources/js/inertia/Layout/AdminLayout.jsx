import Menu from "../Components/Front/MenuCurved/Menu.jsx";
import SideBar from "@/inertia/Components/Admin/SideBar.jsx";
import {AppBarComponent, MenuComponent} from "@syncfusion/ej2-react-navigations";
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import {useEffect, useRef} from "react";
import {Link, usePage} from "@inertiajs/react";
import {ToastComponent, ToastUtility} from '@syncfusion/ej2-react-notifications';
import useToastHook from "@/inertia/Hooks/useToastHook.js";

export default function AdminLayout({children}) {
    const sidebarRef = useRef(null);
    const user = usePage().props.auth.user
    const message = usePage().props.message
    const errors = usePage().props.errors
    const menuFields = {
        children: ['options'],
        text: ['category', 'text']
    };
    useToastHook({message, errors})

    const toggleSideBar = () => {
        if (sidebarRef.current) {
            sidebarRef.current.toggle();
        }
    }

    return (
        <div>
            <div className="position-fixed vw-100" style={{zIndex: '50'}}>
                <AppBarComponent colorMode="Primary" >
                    <ButtonComponent cssClass="e-inherit" iconCss="e-icons e-menu" onClick={toggleSideBar}></ButtonComponent>
                    <span className="regular">Administration {import.meta.env.VITE_APP_NAME}</span>
                    <div className="e-appbar-spacer"></div>
                    {/*<MenuComponent cssClass="e-inherit" items={userMenuItems} fields={menuFields}
                                    template={menuTemplate}></MenuComponent>*/}
                </AppBarComponent>
            </div>

            <Menu></Menu>
            <SideBar ref={sidebarRef}></SideBar>
            <div style={{paddingTop: '50px', zIndex: '0'}}>
                <div className="container-fluid">
                    {children}
                </div>
            </div>
        </div>
    )
}
