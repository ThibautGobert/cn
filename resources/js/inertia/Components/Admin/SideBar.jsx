import {SidebarComponent, TreeViewComponent} from '@syncfusion/ej2-react-navigations';
import {Link, usePage} from "@inertiajs/react";
import {forwardRef} from "react";

const SideBar = forwardRef((props, ref)=> {
    let sidebarObj;
    const sidebarItems = usePage().props.sidebarItems
    const fields =  { dataSource: usePage().props.sidebarItems, id: 'nodeId', text: 'nodeText', child: 'nodeChild' }

    function onCreate() {
        console.log(ref)
       // console.log(ref.style)
        ref.current.element.style.visibility = '';
    }

    function nodeTemplate(data) {
        return (<div>
            {data.url && <Link href={data.url}>{data.nodeText}</Link>}
            {!data.url && <span>{data.nodeText}</span>}
        </div>);
    }

    return <SidebarComponent id="sidebar"
                             ref={ref}
                             width="250px"
                             type={'Auto'}
                             created={onCreate}
                             enableGestures={false}
                             style={{ visibility: "hidden" }}
    >
        <TreeViewComponent fields={fields}  expandOn='Click' nodeTemplate={nodeTemplate}/>
    </SidebarComponent>
})
export default SideBar;
