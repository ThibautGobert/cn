import {ColumnDirective, ColumnsDirective, Filter, GridComponent, Group, Page, Sort} from "@syncfusion/ej2-react-grids";
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';
import {Link, usePage} from "@inertiajs/react";
import {Inject} from "@syncfusion/ej2-react-navigations";
import DeleteUserModal from "@/inertia/Components/Admin/User/Modal/DeleteUserModal.jsx";
import {useState} from "react";
import useToastHook from "@/inertia/Hooks/useToastHook.js";


const Grid = ()=> {
    const data = new DataManager({
        url: route('admin.user.search'),
        adaptor: new UrlAdaptor(),
        headers: [{ 'X-CSRF-TOKEN': usePage().props.csrf_token }]
    })
    const [userToDelete, setUserToDelete] = useState(false);
    const pageSettings = { pageSize: 10 }
    const filterSettings = { type: 'Excel' }
    const [toastMessage, setToastMessage] = useState(null)
    useToastHook({message: toastMessage})
    const onClickDeleteButton = (e, user)=> {
        e.preventDefault()
        e.stopPropagation()
        setUserToDelete(user)
    }
    const deleteUser = async (user)=> {
        await axios.post('/admin/user/'+user.id+'/delete')
        setToastMessage({type: 'success', title: 'Utilisateur supprimé avec succès!'})
        setUserToDelete(false)
    }

    const actionTemplate = (data)=> {
        return (
            <div>
                <Link href={route('admin.user.edit', data.id)} className="btn btn-primary me-2"><i className="fa fa-edit"></i></Link>
                <button onClick={(e)=>onClickDeleteButton(e, data)} className="btn btn-danger"><i className="fa fa-times"></i></button>
            </div>
        )
    }
    const avatarTemplate = (data) => {
        return (
            <img className="rounded rounded-circle avatar-sm" src={data.avatar} alt={data.full_name}></img>
        )
    }

    return <>
        <DeleteUserModal user={userToDelete} isOpen={!!userToDelete} onConfirmation={(user)=> deleteUser(user)} onDismiss={()=>setUserToDelete(false)}></DeleteUserModal>
        <GridComponent dataSource={data} allowPaging={true} pageSettings={pageSettings} allowSorting={true} allowFiltering={true} filterSettings={filterSettings}>
            <ColumnsDirective>
                <ColumnDirective field='avatar' allowSorting={false} allowFiltering={false} headerText='Type' width='100' template={avatarTemplate}/>
                <ColumnDirective field='type' headerText='Type' width='100'/>
                <ColumnDirective field='lastname' headerText='Nom'  width='100' />
                <ColumnDirective field='firstname' headerText='Prénom' width='100'/>
                <ColumnDirective field='email' headerText='Email' width='100' />
                <ColumnDirective field='birthday' headerText='Date de naissance' width='100'  />
                <ColumnDirective field='actions' headerText='Actions' width='100' template={actionTemplate} allowFiltering={false} allowSorting={false} />
            </ColumnsDirective>
            <Inject services={[Page, Sort, Filter, Group]}/>
        </GridComponent>
    </>

}
export default Grid
