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
    const modules = page.props.modules
    const permissions = page.props.permissions
    const roles = page.props.roles
    const permissionsModules = page.props.permissionsModules
    const { data, setData, post, processing, errors } = useForm({
        firstname: '',
        lastname: '',
        email: '',
        type_id: '',
        password: '',
        password_confirmation: '',
        permissions: [],
        roles: [],
    })


    const onSubmit = (e)=> {
        e.preventDefault()
        post(route('admin.user.store'))
    }
    const breadcrumbTemplate = (data)=> {
        if(data.iconCss) {
            return <Link href={data.url}><span className={data.iconCss}></span></Link>
        }
        return <Link href={data.url}>{data.text}</Link>
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
                                    <label className={'form-label d-block'}>{p.name}</label>
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

    const Roles = roles.map(role=> {
        return (
            <div className="mb-2 col-md-2" key={'role_'+role.id}>
                <label className="form-label d-block">{role.name}</label>
                <label htmlFor={'role_' + role.id} className="switch">
                    <input type="checkbox"
                           name="roles[]"
                           id={'role_' + role.id}
                           checked={data.roles.find(dp=> dp === role.id)}
                           onChange={e=> handleRoleCheckBox(e)}
                           value={role.id}/>
                    <span className="slider round"></span>
                </label>
            </div>
        )
    })

    return (
        <>
            <Head title={'Création d\'un utilisateur'} />
            <div className="my-2">
                <BreadcrumbComponent enableNavigation={false} itemTemplate={breadcrumbTemplate}>
                    <BreadcrumbItemsDirective>
                        <BreadcrumbItemDirective iconCss="e-breadcrumb-icon e-icons e-home" url={route('admin.dashboard')} />
                        <BreadcrumbItemDirective text="Utilisateurs" url={route('admin.user.index')}/>
                        <BreadcrumbItemDirective text={'Création d\'un utilisateur'} />
                    </BreadcrumbItemsDirective>
                </BreadcrumbComponent>
            </div>
            <hr className="mt-0"/>
            <form onSubmit={onSubmit}>
                <div className="row mt-3">
                    <div className="col-md-4 mb-2">
                        <label htmlFor="firstname" className="form-label">Prénom</label>
                        <input type="text" name="firstname" id="firstname"
                               autoComplete="off"
                               className="form-control form-control-lg"
                               value={data.firstname}
                               onChange={e=>setData('firstname', e.target.value)} />
                    </div>
                    <div className="col-md-4 mb-2">
                        <label htmlFor="lastname" className="form-label">Nom</label>
                        <input type="text" name="lastname" id="lastname"
                               className="form-control form-control-lg"
                               value={data.lastname}
                               onChange={e=>setData('lastname', e.target.value)}/>
                    </div>
                    <div className="col-md-4 mb-2">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" name="email" id="email"
                               className="form-control form-control-lg"
                               value={data.email}
                               onChange={e=>setData('email', e.target.value)}/>
                    </div>
                    <div className="col-md-4 mb-2">
                        <label htmlFor="lastname" className="form-label">Type</label>
                        <DropDownListComponent
                            id="type"
                            autoComplete="off"
                            dataSource={page.props.userType}
                            fields={{text: 'libelle', value: 'id'}}
                            value={data.type_id}
                            onChange={e=>setData('type_id', e.target.value)}/>
                    </div>
                    <div className="col-md-4 mb-2">
                        <label htmlFor="password" className="form-label">Mot de passe</label>
                        <input type="password" autoComplete="new-password" name="password" id="password"
                               className="form-control form-control-lg"
                               placeholder="Laisser vide pour ne pas modifier"
                               onChange={e=>setData('password', e.target.value)}/>
                    </div>
                    <div className="col-md-4 mb-2">
                        <label htmlFor="password" className="form-label">Confirmation de mot de passe</label>
                        <input type="password" autoComplete="new-password" name="password_confirmation" id="password_confirmation"
                               className="form-control form-control-lg"
                               onChange={e=>setData('password_confirmation', e.target.value)}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <hr/>
                        <h4>Roles</h4>
                    </div>
                </div>
                <div className="row">
                    {Roles}
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
