import AdminLayout from "@/inertia/Layout/AdminLayout.jsx";
import Index from "@/inertia/Admin/User/Index.jsx";
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { ToastUtility } from '@syncfusion/ej2-react-notifications';
import * as bootstrap from 'bootstrap'
import {
    BreadcrumbComponent,
    BreadcrumbItemDirective,
    BreadcrumbItemsDirective
} from "@syncfusion/ej2-react-navigations";
import {Head, Link, useForm, usePage} from "@inertiajs/react";
import General from "@/inertia/Admin/User/Edit/General.jsx";

const Edit = ()=> {
    const page = usePage()
    const user = page.props.user
    const breadcrumbTemplate = (data)=> {
        if(data.iconCss) {
            return <Link href={data.url}><span className={data.iconCss}></span></Link>
        }
        return <Link href={data.url}>{data.text}</Link>
    }
    const onTabClick = (e)=> {
        //bootstrap.Tab.getInstance(triggerFirstTabEl).show()
    }
   return <>
       <Head title={'Édition de '+ user.full_name} />
       <div className="my-2">
           <BreadcrumbComponent enableNavigation={false} itemTemplate={breadcrumbTemplate}>
               <BreadcrumbItemsDirective>
                   <BreadcrumbItemDirective iconCss="e-breadcrumb-icon e-icons e-home" url={route('admin.dashboard')} />
                   <BreadcrumbItemDirective text="Utilisateurs" url={route('admin.user.index')}/>
                   <BreadcrumbItemDirective text={'Édition de ' + page.props.user.full_name} />
               </BreadcrumbItemsDirective>
           </BreadcrumbComponent>
       </div>
       <hr className="mt-0"/>
       <div className="row">
           <div className="col-md-12">
               <ul className="nav nav-tabs" id="user-tab" role="tablist">
                   <li className="nav-item" role="presentation">
                       <button className="nav-link active" id="general" data-bs-toggle="tab"
                               data-bs-target="#general-tab" type="button" role="tab" aria-controls="general" aria-selected="true">Informations générales
                       </button>
                   </li>
                   <li className="nav-item" role="presentation">
                       <button className="nav-link" id="images" data-bs-toggle="tab"
                               data-bs-target="#images-tab" type="button" role="tab" aria-controls="images" aria-selected="true">Images
                       </button>
                   </li>
               </ul>
               <div className="tab-content mt-3">
                   <div className="tab-pane fade show active" id="general-tab" role="tabpanel" aria-labelledby="general">
                       <General page={page}></General>
                   </div>
                   <div className="tab-pane fade" id="images-tab" role="tabpanel" aria-labelledby="images">
                       test
                   </div>
               </div>
           </div>
       </div>
   </>
}
Edit.layout = page =>  <AdminLayout children={page} />
export default Edit
