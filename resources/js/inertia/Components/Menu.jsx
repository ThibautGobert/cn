import {useState} from "react";
import { Link } from '@inertiajs/react'
import { usePage } from '@inertiajs/react'
const Menu = () => {
    const { url, component } = usePage()
    /*
    const [activeItem, setActiveItem] = useState({});

     */
    const items = [
        {
            title: 'Gestion utilisateurs',
            url: '/admin/user',
            icon: 'fa-solid fa-users',
            permission: 'gestion utilisateur'
        },
        {
            title: 'Gestion des rôles',
            url: '/admin/role',
            icon: 'fa-solid fa-user-tag',
            permission: 'gestion role'
        },
        {
            title: 'Gestion des rôles',
            url: '/admin/permission',
            icon: 'fa-solid fa-user-shield',
            permission: 'gestion permission'
        },
    ]

    const MenuItems = items.map((item, i)=> {
        return (
            <li key={'menu-item-'+i} className="nav-item">
                <Link className={'nav-link ' + (url === item.url ? 'active' : '')} href={item.url}>
                    <i className={item.icon + ' me-2'}></i>
                    {item.title}
                </Link>
            </li>
        )
    })

    return (
        <div id="side-bar">
            <ul className="nav flex-column">
                {MenuItems}
            </ul>
        </div>
    );
};

export default Menu;
