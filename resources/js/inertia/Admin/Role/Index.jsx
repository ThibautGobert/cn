import AdminLayout from "@/inertia/Layout/AdminLayout.jsx";
import {Head, Link, usePage} from "@inertiajs/react";
import {
    BreadcrumbComponent,
    BreadcrumbItemDirective,
    BreadcrumbItemsDirective
} from "@syncfusion/ej2-react-navigations";

const Index = ()=> {
    const {roles} = usePage().props
    const breadcrumbTemplate = (data)=> {
        if(data.iconCss) {
            return <Link href={data.url}><span className={data.iconCss}></span></Link>
        }
        return <Link href={data.url}>{data.text}</Link>
    }



    return (
        <>
            <Head title={'Roles'} />
            <div className="my-2">
                <BreadcrumbComponent enableNavigation={false} itemTemplate={breadcrumbTemplate}>
                    <BreadcrumbItemsDirective>
                        <BreadcrumbItemDirective iconCss="e-breadcrumb-icon e-icons e-home" url={route('admin.dashboard')} />
                        <BreadcrumbItemDirective text="Roles" url={route('admin.role.index')}/>
                    </BreadcrumbItemsDirective>
                </BreadcrumbComponent>
            </div>
            <hr className="mt-0"/>
            <div className="row">
                <div className="col-md-12">
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <td>Role</td>
                                <td>Actions</td>
                            </tr>
                            </thead>
                            <tbody>
                            {roles.map((role)=> {return (
                                <tr>
                                    <td>{role.name}</td>
                                    <td>
                                        <Link className="btn btn-primary btn-lg" href={route('admin.role.edit', role.id)} ><i className="fa fa-edit"></i></Link>
                                    </td>
                                </tr>
                            )})}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
Index.layout = page =>  <AdminLayout children={page} />
export default Index
