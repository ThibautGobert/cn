import {SidebarComponent, TreeViewComponent} from '@syncfusion/ej2-react-navigations';
import {Link, router, usePage} from "@inertiajs/react";
import {forwardRef, useEffect, useState} from "react";

const SideBar = forwardRef((props, ref)=> {
    let sidebarObj;
    const sidebarItems = usePage().props.sidebarItems
    const fields =  { dataSource: usePage().props.sidebarItems, id: 'nodeId', text: 'nodeText', child: 'nodeChild' }
    const isMobile = ()=> {
        let userAgent = navigator.userAgent || navigator.vendor || window.opera;
        // Pour les appareils mobiles
        return /android/i.test(userAgent) || /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
    }
    const [isActive, setIsActive] = useState(!isMobile());

    useEffect(()=> {
        if(isMobile()) {
            router.on('start', (event) => {
                setIsActive(false)
            })
        }
    }, [])

    function onCreate() {
       // console.log(ref.style)
        ref.current.element.style.visibility = '';
    }

    function nodeTemplate(data) {
        return (<div>
            {data.url && <Link href={data.url}>{data.nodeText}</Link>}
            {!data.url && <span>{data.nodeText}</span>}
        </div>);
    }

    return <SidebarComponent
                id="sidebar"
                ref={ref}
                width="250px"
                type={'Auto'}
                created={onCreate}
                enableGestures={isMobile()}
                style={{ visibility: "hidden" }}
        >
        <TreeViewComponent fields={fields}  expandOn='Click' nodeTemplate={nodeTemplate}/>
    </SidebarComponent>
})
export default SideBar;
