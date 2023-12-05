import AdminLayout from "@/inertia/Layout/AdminLayout.jsx";
import Index from "@/inertia/Admin/User/Index.jsx";
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { ToastUtility } from '@syncfusion/ej2-react-notifications';
import {
    BreadcrumbComponent,
    BreadcrumbItemDirective,
    BreadcrumbItemsDirective
} from "@syncfusion/ej2-react-navigations";
import {Head, Link, useForm, usePage} from "@inertiajs/react";

const Edit = ()=> {
    const page = usePage()
    const role = page.props.role
    const modules = page.props.modules
    const permissions = page.props.permissions
    const roles = page.props.roles

    const { data, setData, post, processing, errors } = useForm({
        name: role.name,
        permissions: role && role.permissions ? role.permissions.map(p=>p.id) : [],
    })


    const onSubmit = (e)=> {
        e.preventDefault()
        post(route('admin.role.update', role.id))
    }
    const breadcrumbTemplate = (data)=> {
        if(data.iconCss) {
            return <Link href={data.url}><span className={data.iconCss}></span></Link>
        }
        return <Link href={data.url}>{data.text}</Link>
    }

    const checkPermissionViaRole = (permission)=> {
        return role.permissions.find(p=> p.id === permission.id)
    }

    function handlePermissionCheckBox(e) {
        let id = e.target.value;
        if (e.target.checked) {
            setData("permissions", [...data.permissions, id]);
        } else {
            setData(
                "permissions",
                data.permissions.filter((item) => {
                    return parseInt(item) !== parseInt(id);
                })
            );
        }
    }

    function handleRoleCheckBox(e) {
        let id = e.target.value;
        if (e.target.checked) {
            setData("roles", [...data.roles, id]);
        } else {
            setData(
                "roles",
                data.roles.filter((item) => {
                    return parseInt(item) !== parseInt(id);
                })
            );
        }
    }

    const Permissions = modules.map(m=> {
        return (
            <div key={'permission_type_'+m.id} className="mb-2 row">
                <h5 className="text-xl my-2">{m.libelle}</h5>
                {
                    permissions.map(p=> {
                        if(m.id === p.module_id) {
                            return (
                                <div className="col-md-2 mb-2" key={'permission_'+p.id}>
                                    <label className={'form-label d-block'+ (checkPermissionViaRole(p) != null ? ' text-primary' : '')}>{p.name}</label>
                                    <label htmlFor={'permission_' + p.id} className="switch">
                                        <input type="checkbox"
                                               name="permissions[]"
                                               id={'permission_' + p.id}
                                               checked={data.permissions.find(dp=> dp === p.id)}
                                               onChange={e=> handlePermissionCheckBox(e)}
                                               value={p.id}/>
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                            )
                        }
                    })
                }
            </div>
        )
    })

    return (
        <>
            <Head title={'Édition du role '+ role.name} />
            <div className="my-2">
                <BreadcrumbComponent enableNavigation={false} itemTemplate={breadcrumbTemplate}>
                    <BreadcrumbItemsDirective>
                        <BreadcrumbItemDirective iconCss="e-breadcrumb-icon e-icons e-home" url={route('admin.dashboard')} />
                        <BreadcrumbItemDirective text="Roles" url={route('admin.user.index')}/>
                        <BreadcrumbItemDirective text={'Édition de ' + role.name} />
                    </BreadcrumbItemsDirective>
                </BreadcrumbComponent>
            </div>
            <hr className="mt-0"/>
            <form onSubmit={onSubmit}>
                <div className="row mt-3">
                    <div className="col-md-4 mb-2">
                        <label htmlFor="firstname" className="form-label">Nom</label>
                        <input type="text" name="firstname" id="firstname"
                               autoComplete="off"
                               className="form-control form-control-lg"
                               value={data.name}
                               onChange={e=>setData('name', e.target.value)} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <hr/>
                        <h4>Permissions</h4>
                    </div>
                </div>
                <div className="row">
                    {Permissions}
                </div>
                <div className="row">
                    <div className="col-md-12 text-end">
                        <button className="btn btn-lg btn-primary"><i className="fa fa-check me-2"></i>Enregistrer</button>
                    </div>
                </div>
            </form>
        </>
    )
}
Edit.layout = page =>  <AdminLayout children={page} />
export default Edit
