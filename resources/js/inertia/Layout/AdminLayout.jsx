import Menu from "../Components/Front/MenuCurved/Menu.jsx";
import SideBar from "@/inertia/Components/Admin/SideBar.jsx";
import {AppBarComponent, MenuComponent} from "@syncfusion/ej2-react-navigations";
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import {useEffect, useRef} from "react";
import {Link, usePage} from "@inertiajs/react";
import {ToastComponent, ToastUtility} from '@syncfusion/ej2-react-notifications';

export default function AdminLayout({children}) {
    const sidebarRef = useRef(null);
    const user = usePage().props.auth.user
    const message = usePage().props.message
    const errors = usePage().props.errors
    const menuFields = {
        children: ['options'],
        text: ['category', 'text']
    };

    useEffect(()=> {
        if(message) {
            ToastUtility.show({
                title: message.title,
                animation: {
                    show: {effect:'FadeZoomIn'},
                    hide: {effect:'FadeZoomOut'},
                },
                position: {
                    X: 'Right',
                },
                icon: getToastIcon(message.type),
                content: message.content,
                cssClass: getToastCss(message.type),
                timeOut: 2000,
                extendedTimeOut: 5000,
                showCloseButton: true
            })
        }
    }, [message])


    useEffect(()=> {
        if(Object.keys(errors).length !== 0) {
            let content = ''
            for (const [key, value] of Object.entries(errors)) {
                content += ('- '+value+'<br>')
            }

            ToastUtility.show({
                title: 'Attention :',
                animation: {
                    show: {effect:'FadeZoomIn'},
                    hide: {effect:'FadeZoomOut'},
                },
                position: {
                    X: 'Right',
                },
                icon: 'fa-solid fa-circle-xmark',
                content: content,
                cssClass: 'e-toast-danger',
                timeOut: 2000,
                extendedTimeOut: 5000,
                showCloseButton: true
            })
        }
    }, [errors])

    const getToastIcon = (type)=> {
        switch (type) {
            case 'success':
                return 'fa-solid fa-circle-check'
            case 'info':
                return 'fa-solid fa-circle-info'
            case 'error':
                return 'fa-solid fa-circle-xmark'
            case 'warning':
                return 'fa-solid fa-triangle-exclamation'
        }
    }
    const getToastCss = (type)=> {
        switch (type) {
            case 'success':
                return 'e-toast-success'
            case 'info':
                return 'e-toast-info'
            case 'error':
                return 'e-toast-danger'
            case 'warning':
                return 'e-toast-warning'
        }
    }

    const userMenuItems = [
        {
            category: user.full_name,
            options: [
                {text: 'Profile', url:'/profile', icon: 'fa fa-user', method: 'get'},
                {text: 'Administration', url:'/admin/dashboard', icon: 'fa-solid fa-user-shield', method: 'get', needAdmin: true},
                {text: 'Se déconnecter', url:'/logout', icon: 'fa-solid fa-arrow-right-from-bracket', method: 'post', cssClass: 'text-danger'},
            ]
        }
    ]

    const toggleSideBar = () => {
        if (sidebarRef.current) {
            sidebarRef.current.toggle();
        }
    }

    const menuTemplate = (data)=> {
        return (data.category || (!data.needAdmin || data.needAdmin && user.is_admin) &&<div>
            <div>{data.category}</div>
            {data.method === 'post' &&<Link href={data.url} method={data.method} className={data.cssClass}><i
                className={'me-2 ' + data.icon}></i>{data.text}</Link>}
            {data.method !== 'post' &&<Link href={data.url} method={data.method}  className={data.cssClass}><i
                className={'me-2 ' + data.icon}></i>{data.text}</Link>}
         </div>)
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
