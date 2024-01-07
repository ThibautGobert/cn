import DefaultLayout from "@/inertia/Layout/DefaultLayout.jsx";
import Show from "@/inertia/Pages/Home/Show.jsx";
import {Link, router, useForm, usePage} from "@inertiajs/react";
import SubmitBtn from "@/inertia/Components/Common/Form/SubmitBtn.jsx";
import {useState} from "react";
import {DropDownListComponent} from "@syncfusion/ej2-react-dropdowns";
import AddressModal from "@/inertia/Components/Common/Modals/AddressModal.jsx";

const Create = ({auth})=> {
    const { data, setData, post, errors, processing, reset } = useForm({
        date: '',
        from: '',
        to: '',
        title: '',
        description: '',
        address_id: '',
        pose_type_id: '',
    });
    const [addresses, setAdresses] = useState(usePage().props.addresses)
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false)
    const submit = (e)=> {
        e.preventDefault()
        post(route('atelier.store'))
    }

    const isValid = ()=> {
        let form = document.getElementById('atelier-form')
        return form && form.checkValidity() && data.address_id && data.pose_type_id
    }

    const onAddressSaved= (address)=> {
        setAdresses([address, ...addresses])
        setData('address_id', address.id)
        setIsAddressModalOpen(false)
    }

    const closeAddressModal = ()=> {
        setIsAddressModalOpen(false)
    }

    return <>
        <div className="container">
            <div className="row">
                <div className="col-md-12 mb-3 d-flex justify-content-between align-items-center">
                    <h3>Créer un atelier</h3>
                </div>
            </div>

            <form id="atelier-form" onSubmit={submit}>
                <div className="row">
                    <div className="col-md-12 mb-3">
                        <label htmlFor="title" className="form-label">Titre de l'atelier</label>
                        <input
                            type="string"
                            required
                            max="191"
                            name="title" id="title"
                            className={"form-control form-control-lg " + (errors.title ? 'is-invalid' : '')}
                            onInput={(e)=> setData('title', e.target.value)}
                        />
                        {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 mb-3">
                        <label htmlFor="title" className="form-label">Description / remarques</label>
                        <textarea className="form-control" value={data.description} onInput={(e)=>setData('description', e.target.value)}> </textarea>
                        {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 col-md-6 mb-3">
                        <label htmlFor="date" className="form-label">Date</label>
                        <input
                            type="date"
                            required
                            name="date"
                            id="date"
                            className={"form-control form-control-lg " + (errors.date ? 'is-invalid' : '')}
                            onInput={(e)=> setData('date', e.target.value)}/>
                        {errors.date && <div className="invalid-feedback">{errors.date}</div>}
                    </div>
                    <div className="col-lg-4 col-md-6 mb-3">
                        <label htmlFor="from" className="form-label">Heure de début</label>
                        <input type="time" required name="from" id="from" className="form-control form-control-lg" onInput={(e)=> setData('from', e.target.value)}/>
                    </div>
                    <div className="col-lg-4 col-md-6 mb-3">
                        <label htmlFor="to" className="form-label">Heure de fin</label>
                        <input type="time" required name="to" id="to" className="form-control form-control-lg" onInput={(e)=> setData('to', e.target.value)}/>
                    </div>
                    <div className="col-lg-4 col-md-6 mb-3">
                        <label htmlFor="pose_type_id" className="form-label">Type de pose souhaitée</label>
                        <DropDownListComponent
                            id="address_id"
                            autoComplete="off"
                            required
                            dataSource={usePage().props.pose_type}
                            fields={{text: 'libelle', value: 'id'}}
                            value={data.pose_type_id}
                            onChange={e=>setData('pose_type_id', e.target.value)}
                        />
                        <AddressModal auth={auth} isOpen={isAddressModalOpen} onDismiss={closeAddressModal} onConfirmation={(address)=>onAddressSaved(address)}></AddressModal>
                    </div>
                    <div className="col-lg-4 col-md-6 mb-3">
                        <label htmlFor="address_id" className="form-label">Adresse</label><i onClick={()=>setIsAddressModalOpen(true)} className="fa-solid fa-circle-plus clickable ms-2"></i>
                        <DropDownListComponent
                            id="address_id"
                            autoComplete="off"
                            required
                            dataSource={addresses}
                            fields={{text: 'name', value: 'id'}}
                            value={data.address_id}
                            onChange={e=>setData('address_id', e.target.value)}
                        />
                        <AddressModal auth={auth} isOpen={isAddressModalOpen} onDismiss={closeAddressModal} onConfirmation={(address)=>onAddressSaved(address)}></AddressModal>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 text-end">
                        <Link className="btn btn-outline-secondary btn-lg me-2" href={route('atelier.index')}>Annuler</Link>
                        <SubmitBtn disabled={!isValid()} processing={processing}></SubmitBtn>
                    </div>
                </div>
            </form>

        </div>
    </>
}
Create.layout = page =>  <DefaultLayout children={page} />
export default Create
