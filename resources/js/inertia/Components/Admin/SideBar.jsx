import {SidebarComponent, TreeViewComponent} from '@syncfusion/ej2-react-navigations';
import {usePage} from "@inertiajs/react";

export default function SideBar() {
    let sidebarObj;
    const sidebarItems = usePage().props.sidebarItems
    const fields =  { dataSource: usePage().props.sidebarItems, id: 'nodeId', text: 'nodeText', child: 'nodeChild' }
    console.log(sidebarItems)
    function onCreate() {
        sidebarObj.element.style.visibility = '';
    }
    return <SidebarComponent id="sidebar" ref={Sidebar => sidebarObj = Sidebar} width="250px" created={onCreate} style={{ visibility: "hidden" }}>
        <TreeViewComponent fields={fields}  expandOn='Click'/>
    </SidebarComponent>
}
