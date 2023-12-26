import Modal from "react-modal";
import {useForm} from "@inertiajs/react";
import {add} from "react-modal/lib/helpers/classList.js";
import {useEffect, useState} from "react";
import SubmitBtn from "@/inertia/Components/Common/Form/SubmitBtn.jsx";
import * as UserTypeJs from '../../../../enums/UserType.js'
import useToastHook from "@/inertia/Hooks/useToastHook.js";

const AddressModal = ({auth, address, isOpen, onConfirmation, onDismiss})=> {
    const [data, setData] = useState({
        id: '',
        name: 'Adresse principale',
        latitude: '',
        longitude: '',
        street: '',
        number: '',
        city: '',
        postal_code: '',
        country_code: 'be',
        complement: '',
        main: 1
    });
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [toastMessage, setToastMessage] = useState(null)
    useToastHook({message: toastMessage})
    useEffect(() => {
        if(address) {
            setData({...address, country_code: 'be'})
        }
    }, [address]);

    const onClickConfirmation = async ()=> {
        setLoading(true)
        try {
            let {latitude, longitude} = await geocodeAddress(fullAddress())
            try {
                await axios.post(route('address.upsert', {user: auth.user.id, address: address?.id}), {...data, latitude: latitude, longitude: longitude})
                onConfirmation()
                setToastMessage({type: 'success', title: 'Adresse enregistrée avec succès !'})
            }catch (e) {
                if(e.response?.data?.errors) {
                    setErrors(e.response.data.errors)
                }
            }
        }catch (e) {
            setToastMessage({type: 'error', title: 'Adresse non trouvée'})
        }

        setLoading(false)
    }

    const fullAddress = ()=> {
        return data.number + ' ' + data.street + ', ' + data.postal_code + ', ' + data.city + ', ' + data.country_code
    }
    const addressFilled = ()=> {
        return data.number && data.street && data.postal_code && data.city && data.country_code
    }
    const geocodeAddress = async  (address)=> {
        return new Promise(async (resolve, reject)=> {
            const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
            try {
                let res = await axios.get(url);
                if (res.data && res.data.length > 0) {
                    const { lat, lon } = res.data[0];
                    //setData(prevState => ({...prevState, latitude: lat, longitude: lon}))
                    resolve({ latitude: lat, longitude: lon });
                } else {
                    return reject();
                }
            } catch (error) {
                console.error("Erreur de géocodage : ", error);
                return reject();
            }
        })
    }
    const onClickDismiss = ()=> {
        setData({
            id: '',
            name: 'Adresse principale',
            latitude: '',
            longitude: '',
            street: '',
            number: '',
            city: '',
            postal_code: '',
            country_code: 'be',
            complement: '',
            main: 1
        })
        onDismiss()
    }

    return <>
        <Modal isOpen={isOpen}
               className="ReactModal__Content lg"
        >
            <div className="card border border-secondary">
                <div className="card-header">{address ? 'Éditer une adresse' : 'Créer une adresse'}</div>
                <div className="card-body">
                    {auth.user.type_id !== UserTypeJs.MODELE &&
                        <div className="row">
                            <div className="col-md-8">
                                <label htmlFor="name">Nom de cette adresse</label>
                                <input type="text" name="name" id="name"
                                       className={"form-control form-control-lg "}
                                       onChange={(e)=> setData((data)=>({...data, name: e.target.value}))}
                                       value={data.name}
                                />
                            </div>
                            <div className="col-md-4">
                                <label className={'form-label d-block'}>Adresse principale</label>
                                <label htmlFor="main" className="switch">
                                    <input type="checkbox"
                                           name="main"
                                           id="main"
                                           onChange={e=> setData(currentData=>({...currentData, main: (e.target.checked ? 1 : 0)}))}
                                           value={data.main === 1 ? 0 :1}
                                           checked={data.main === 1}
                                    />
                                    <span className="slider round"></span>
                                </label>
                            </div>
                        </div>
                    }
                    <div className="row mt-3">
                        <div className="col-lg-4 col-md-8 mb-3">
                            <label htmlFor="street">Rue</label>
                            <input type="text" name="street" id="street"
                                   className={"form-control form-control-lg " + (errors.street ? 'is-invalid' : '')}
                                   onChange={(e)=> setData(currentData=> ({...currentData, street: e.target.value}))}
                                   value={data.street}
                            />
                            {errors.street && <div className="invalid-feedback">{errors.street}</div>}
                        </div>
                        <div className="col-lg-2 col-md-4 mb-3">
                            <label htmlFor="number">Numéro</label>
                            <input type="text" name="number" id="number"
                                   className={"form-control form-control-lg " + (errors.number ? 'is-invalid' : '')}
                                   onChange={(e)=> setData(currentData=> ({...currentData, number: e.target.value}))}
                                   value={data.number}
                            />
                            {errors.number && <div className="invalid-feedback">{errors.number}</div>}
                        </div>
                        <div className="col-lg-6 mb-3">
                            <label htmlFor="complement">Complément</label>
                            <input type="text" className="form-control form-control-lg" name="complement" id="complement"
                                   onChange={(e)=> setData(currentData=> ({...currentData, complement: e.target.value}))}
                                   value={data.complement}
                            />
                        </div>
                        <div className="col-lg-6 mb-3">
                            <label htmlFor="city">Ville</label>
                            <input type="text" name="city" id="city"
                                   className={"form-control form-control-lg " + (errors.city ? 'is-invalid' : '')}
                                   onChange={(e)=> setData(currentData=> ({...currentData, city: e.target.value}))}
                                   value={data.city}
                            />
                            {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                        </div>
                        <div className="col-lg-2 col-md-4 mb-3">
                            <label htmlFor="postal_code">Code postal</label>
                            <input type="text" name="postal_code" id="postal_code"
                                   className={"form-control form-control-lg " + (errors.postal_code ? 'is-invalid' : '')}
                                   onChange={(e)=> setData(currentData=> ({...currentData, postal_code: e.target.value}))}
                                   value={data.postal_code}
                            />
                            {errors.postal_code && <div className="invalid-feedback">{errors.postal_code}</div>}
                        </div>
                    </div>
                </div>
                <div className="card-footer text-end">
                    <button className="btn btn-lg btn-outline-secondary me-2" onClick={()=>onClickDismiss()}>Annuler</button>
                    <SubmitBtn processing={loading} clicked={onClickConfirmation} ></SubmitBtn>
                    {/*<button className="btn btn-primary " onClick={() =>}>Confirmer</button>*/}
                </div>
            </div>
        </Modal>
    </>
}
export default AddressModal
