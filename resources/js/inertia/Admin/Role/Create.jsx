import AdminLayout from "@/inertia/Layout/AdminLayout.jsx";
import {Head, Link} from "@inertiajs/react";
import {
    BreadcrumbComponent,
    BreadcrumbItemDirective,
    BreadcrumbItemsDirective
} from "@syncfusion/ej2-react-navigations";

const Create = ()=> {
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
                        <BreadcrumbItemDirective text="Créer un role" url={route('admin.role.index')}/>
                    </BreadcrumbItemsDirective>
                </BreadcrumbComponent>
            </div>
            <hr className="mt-0"/>
        </>
    )
}
Create.layout = page =>  <AdminLayout children={page} />
export default Create
