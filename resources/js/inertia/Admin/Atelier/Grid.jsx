import {ColumnDirective, ColumnsDirective, Filter, GridComponent, Group, Page, Sort} from "@syncfusion/ej2-react-grids";
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';
import {Link, usePage} from "@inertiajs/react";
import {Inject} from "@syncfusion/ej2-react-navigations";
import {useState} from "react";
import useToastHook from "@/inertia/Hooks/useToastHook.js";

const Grid = ()=> {
    const data = new DataManager({
        url: route('admin.atelier.search'),
        adaptor: new UrlAdaptor(),
        headers: [{ 'X-CSRF-TOKEN': usePage().props.csrf_token }]
    })
    const [atelierToDelete, setAtelierToDelete] = useState(false);
    const pageSettings = { pageSize: 10 }
    const filterSettings = { type: 'Excel' }
    const [toastMessage, setToastMessage] = useState(null)
    useToastHook({message: toastMessage})
    const actionTemplate = (data)=> {
        return <>
            <Link href={route('atelier.show', data.id)} className="btn btn-primary me-2"><i className="fa-solid fa-eye"></i></Link>
        </>
    }
    return <>
        <GridComponent dataSource={data} allowPaging={true} pageSettings={pageSettings} allowSorting={true} allowFiltering={true} filterSettings={filterSettings}>
            <ColumnsDirective>
                <ColumnDirective field='user_name'  headerText='Utilisateur' />
                <ColumnDirective field='user_type' headerText='Type'/>
                <ColumnDirective field='city' headerText='Ville'/>
                <ColumnDirective field='date' headerText='Date'/>
                <ColumnDirective field='from' headerText='De'/>
                <ColumnDirective field='to' headerText='À'/>
                <ColumnDirective field='users_count' headerText='Nombre de participants'/>
                <ColumnDirective field='actions' headerText='Actions' template={actionTemplate}/>
            </ColumnsDirective>
            <Inject services={[Page, Sort, Filter, Group]}/>
        </GridComponent>
    </>

}
export default Grid
