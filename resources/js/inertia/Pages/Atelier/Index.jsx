import DefaultLayout from "@/inertia/Layout/DefaultLayout.jsx";
import {Link, usePage} from "@inertiajs/react";
import useDateFormat from "@/inertia/Hooks/useDateFormat.js";

const Index = ()=> {
    const ateliers = usePage().props.ateliers
    return <>
        <div className="container">
            <div className="row">
                <div className="col-md-12 mb-3 d-flex justify-content-between align-items-center">
                    <h3>Mes ateliers</h3>
                    <Link href={route('atelier.create')} className="btn btn-primary btn-lg"><i className="fa fa-plus"></i></Link>
                </div>
            </div>
            <div className="row">
                {ateliers.length === 0 && <div>
                    <div className="col-md-12 text-center">
                        Vous n'avez aucun atelier pour le moment
                    </div>
                </div>}
                {ateliers.map(a=> {
                    return <div key={a.id}>
                        <div className="col-md-12 mb-3">
                            <div className="card">
                                <div className="card-header">
                                    <h4>{a.title}</h4>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-lg-4 col-md-6">
                                            Date : {useDateFormat(a.from, 'dd/MM/yyyy')}
                                        </div>
                                        <div className="col-lg-4 col-md-6">
                                            De : {useDateFormat(a.from, "HH'h'ii")}
                                        </div>
                                        <div className="col-lg-4 col-md-6">
                                            À : {useDateFormat(a.to, "HH'h'ii")}
                                        </div>
                                    </div>
                                    {a.description && <div className="row">
                                        <div className="col-md-12">
                                            <hr/>
                                            {a.description}
                                        </div>
                                    </div>}
                                    <div className="row">
                                        <div className="col-md-12 mb-2">
                                            <hr/>
                                            <h5>Adresse ({a.address.name})</h5>
                                        </div>
                                        <div className="col-lg-4 col-md-6">
                                            Ville : {a.address.postal_code} {a.address.city}
                                        </div>
                                        <div className="col-lg-4 col-md-6">
                                            Rue : {a.address.street}, {a.address.number}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    </>
}
Index.layout = page =>  <DefaultLayout children={page} />
export default Index
