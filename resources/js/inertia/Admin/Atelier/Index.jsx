import AdminLayout from "@/inertia/Layout/AdminLayout.jsx";
import {
    BreadcrumbComponent,
    BreadcrumbItemDirective,
    BreadcrumbItemsDirective
} from "@syncfusion/ej2-react-navigations";
import {Link} from "@inertiajs/react";
import Grid from "@/inertia/Admin/Atelier/Grid.jsx";

const Index = ()=> {
    const breadcrumbTemplate = (data)=> {
        if(data.iconCss) {
            return <Link href={data.url}><span className={data.iconCss}></span></Link>
        }
        return <Link href={data.url}>{data.text}</Link>
    }
    return (
        <>
            <div className="my-2">
                <BreadcrumbComponent enableNavigation={false} itemTemplate={breadcrumbTemplate}>
                    <BreadcrumbItemsDirective>
                        <BreadcrumbItemDirective iconCss="e-breadcrumb-icon e-icons e-home" url={route('admin.dashboard')}/>
                        <BreadcrumbItemDirective text="Ateliers"  url={route('admin.atelier.index')} />
                    </BreadcrumbItemsDirective>
                </BreadcrumbComponent>
            </div>
            <hr className="mt-0"/>
            <div className="row mt-3">
                <div className="col-md-12">
                    <Grid></Grid>
                </div>
            </div>

        </>
    )
}
Index.layout = page =>  <AdminLayout children={page} />
export default Index
