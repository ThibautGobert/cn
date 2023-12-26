import DefaultLayout from "@/inertia/Layout/DefaultLayout.jsx";
import { RatingComponent, PrecisionType  } from '@syncfusion/ej2-react-inputs';
import {Link, useForm, usePage} from "@inertiajs/react";
import * as UserTypeJs from '../../../enums/UserType.js'
import SubmitBtn from "@/inertia/Components/Common/Form/SubmitBtn.jsx";
import {DropDownListComponent} from "@syncfusion/ej2-react-dropdowns";
import ProfilePictureForm from "@/inertia/Components/Common/Form/ProfilePictureForm.jsx";
import {useState} from "react";
//import { Inertia } from '@inertiajs/inertia';
import { router } from '@inertiajs/react'
import {motion} from "framer-motion";
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import AddressModal from "@/inertia/Components/Common/Modals/AddressModal.jsx";
import Modal from "react-modal";
Modal.setAppElement('#app');
const Edit = ({user})=> {
    const auth = usePage().props.auth
    const poseType = usePage().props.poseType
    const genreType = usePage().props.genreType
    const { data, setData, transform, post, errors, processing, reset } = useForm({
        distance_max: user.distance_max,
        birthday: user.birthday,
        genre_type_id: user.genre_type_id,
        about: user.about,
        poses: user.poses.map(p=> p.pose_type_id),
    });
    const [processingAvatar, setProcessingAvatar] = useState(false)
    const [changeAvatar, setChangeAvatar] = useState(false)
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false)
    const [selectedAddress, setSelectedAddress] = useState(null)

    const Poses = poseType.map(p=> {
        return(
            <div className="col-lg-2 col-md-4 col-6 mb-2" key={'pose_'+p.id}>
                <label className={'form-label d-block'}>{p.libelle}</label>
                <label htmlFor={'pose_' + p.id} className="switch">
                    <input type="checkbox"
                           name="poses[]"
                           id={'pose_' + p.id}
                           checked={data.poses.find(dp=> dp === p.id)}
                           onChange={e=> handleCheckBox(e)}
                           value={p.id}/>
                    <span className="slider round"></span>
                </label>
            </div>
        )
    })
    function handleCheckBox(e) {
        let id = e.target.value;
        if (e.target.checked) {
            setData("poses", [...data.poses, id]);
        } else {
            setData(
                "poses",
                data.poses.filter((item) => {
                    return parseInt(item) !== parseInt(id);
                })
            );
        }
    }
    const submit = async (e)=> {
        e.preventDefault()
        await post(route('profile.update', user.id))
    }

    const submitAvatar= async(data)=> {
        setProcessingAvatar(true)
        let res = await axios.post(route('profile.updateAvatar', auth.user), data)
        setProcessingAvatar(false)
        router.visit(route('profile.show', auth.user))
    }

    const onEditAddress = (address)=> {
        setSelectedAddress(address)
        setIsAddressModalOpen(true)
    }

    const onAddressSaved= ()=> {
        setSelectedAddress(null)
        setIsAddressModalOpen(false)
        router.visit(route('profile.edit', auth.user),
            { preserveScroll: true })
    }

    const Addresses = ()=> {
        if(user.addresses.length === 0) {
            return <>
                <div className="row mt-3">
                    <div className="col-md-12 text-center">
                        aucune adresse
                    </div>
                </div>
            </>
        }
        return user.addresses.filter(a=> user.type_id === UserTypeJs.MODELE ? a.main : true).map(address=> {
            return <div key={address.id} className={'card my-3 ' + (address.main ? 'shadow border border-primary' : '')}>
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <h4>{address.name}</h4>
                        <TooltipComponent position="TopCenter" content="Éditer cette adresse" target={'#addAddress-btn-' + address.id} windowCollision={true}>
                            <button id={'addAddress-btn-' + address.id} onClick={()=> onEditAddress(address)} className="btn btn-secondary btn-lg">
                                <i className="fa-solid fa-gear"></i>
                            </button>
                        </TooltipComponent>
                    </div>
                    <div className="card-body">
                        <div className="row mt-3">
                            <div className="col-lg-4 col-md-8 mb-3">
                                <label htmlFor="city">Rue</label>
                                <input type="text" name="city" id="city" disabled={true}
                                       className={"form-control form-control-lg "}
                                       value={address.street}
                                />
                            </div>
                            <div className="col-lg-2 col-md-4 mb-3">
                                <label htmlFor="number">Numéro</label>
                                <input type="text" name="number" id="number" disabled={true}
                                       className={"form-control form-control-lg "}
                                       value={address.number}
                                />
                            </div>
                            <div className="col-lg-6 mb-3">
                                <label htmlFor="city">Complément</label>
                                <input type="text" className="form-control form-control-lg" name="city" id="city"
                                       disabled={true}
                                       value={address.complement || ''}
                                />
                            </div>
                            <div className="col-lg-6 mb-3">
                                <label htmlFor="city">Ville</label>
                                <input type="text" name="city" id="city" disabled={true}
                                       className={"form-control form-control-lg "}
                                       value={address.city}
                                />
                            </div>
                            <div className="col-lg-2 col-md-4 mb-3">
                                <label htmlFor="city">Code postal</label>
                                <input type="text" name="city" id="city" disabled={true}
                                       className={"form-control form-control-lg "}
                                       value={address.postal_code}
                                />
                            </div>
                        </div>
                    </div>
                </div>
        })
    }

    const openAddressModal = (e)=> {
        e.preventDefault()
        setIsAddressModalOpen(true)
    }
    const closeAddressModal = ()=> {
        setIsAddressModalOpen(false)
        setSelectedAddress(null)
    }

    return <>
        <div className="container">
            <div className="row">
                <div className="col-lg-12 d-flex align-items-center">
                    <div className="position-relative">
                        <i className="fa-solid fa-gear avatar-gear" onClick={()=>setChangeAvatar(!changeAvatar)}></i>
                        <img className="avatar-lg border border-3 border-primary rounded-circle shadow" src={user.avatar}
                             alt=""/>
                    </div>
                    <div className="ms-3">
                        <h1>{user.full_name}</h1>
                        <div>
                            <span className="badge bg-secondary">{user.type}</span>
                        </div>
                        <RatingComponent  id='rating' value={5.0} disabled={true} precision={PrecisionType.Exact} cssClass='custom-fill'
                        ></RatingComponent>
                    </div>
                </div>
            </div>
            {changeAvatar ? <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: (changeAvatar ? 1 : 0) }}
                    transition={{ duration: 0.7 }}
                >
                    <ProfilePictureForm
                        auth={auth}
                        onSubmit={(data)=>submitAvatar(data)} processing={processingAvatar}
                        onDismiss={()=> setChangeAvatar(false)}
                    ></ProfilePictureForm>
            </motion.div>
            : <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity:  (changeAvatar ? 0 : 1)}}
                    transition={{ duration: 0.7 }}
                >
                    <div className="row mt-5 mb-3">
                        <div className="col-md-12">
                            <h4>Informations générales</h4>
                        </div>
                    </div>
                    <form onSubmit={submit}>
                        <div className="card border border-primary">
                            <div className="card-body">
                                <div className="row mt-3">
                                    <div className="col-lg-3 mb-3">
                                        <label htmlFor="birthday" className="form-label">Date de naissance</label>
                                        <input type="date" name="birthday" id="birthday" className="form-control form-control-lg"
                                               onInput={(e)=> setData('birthday', e.target.value)}
                                               value={data.birthday}
                                        />
                                    </div>
                                    <div className="col-lg-3 mb-3">
                                        <label htmlFor="genre_type_id" className="form-label">Genre</label>
                                        <DropDownListComponent
                                            id="genre_type_id"
                                            autoComplete="off"
                                            dataSource={genreType}
                                            fields={{text: 'libelle', value: 'id'}}
                                            value={data.genre_type_id}
                                            onChange={e=>setData('genre_type_id', e.target.value)}/>
                                    </div>
                                    {auth.user.type_id === UserTypeJs.MODELE &&
                                        <div className="col-lg-3 mb-3">
                                            <TooltipComponent position="TopCenter" content="La distance maximum, en Km, à laquelle vous pouvez vous déplacer." target="#info-distance-max" windowCollision={true}>
                                                <label id="info-distance-max" htmlFor="distance_max" className="form-label">Déplacement (Km)
                                                    <i  className="fa-solid fa-circle-question ms-2 text-primary"></i>
                                                </label>
                                            </TooltipComponent>
                                            <input type="number" step="0.1" name="distance_max" id="distance_max" className="form-control form-control-lg"
                                                   onInput={(e)=> setData('distance_max', e.target.value)}
                                                   value={data.distance_max}
                                            />
                                        </div>
                                    }
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-12">
                                        <label htmlFor="about" className="form-label">À propos de vous</label>
                                        <textarea name="about" id="about" cols="30" rows="10" className="form-control"
                                                  value={data.about}
                                                  onInput={(e)=> setData('about', e.target.value)}>
                                        </textarea>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <h5>Poses {user.type_id === UserTypeJs.MODELE ? 'proposée(s)' : 'recherchée(s)'}</h5>
                                </div>
                                <div className="row mt-3">
                                    {Poses}
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="row">
                                    <div className="col-md-12 text-end">
                                        <Link href={route('profile.show', user.id)} className="btn btn-lg btn-outline-secondary me-2">Annuler</Link>
                                        <SubmitBtn processing={processing}></SubmitBtn>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="row mt-5">
                        <div className="col-md-12 d-flex align-items-center">
                            <h4>{auth.user.type_id === UserTypeJs.MODELE ? 'Mon adresse' : 'Mes adresses'}</h4>
                            {auth.user.type_id !== UserTypeJs.MODELE &&
                                <TooltipComponent position="TopCenter" content="Ajouter une adresse" target="#addAddress" windowCollision={true}>
                                    <button onClick={(e)=>openAddressModal(e)} id="addAddress" className="btn btn-lg btn-secondary ms-3">
                                        <i className="fa-solid fa-circle-plus"></i>
                                    </button>
                                </TooltipComponent>
                            }
                        </div>
                    </div>
                    <Addresses></Addresses>
                </motion.div>
            }
        </div>
        <AddressModal auth={auth} address={selectedAddress} isOpen={isAddressModalOpen} onDismiss={closeAddressModal} onConfirmation={onAddressSaved}></AddressModal>
    </>
}
Edit.layout = page =>  <DefaultLayout children={page} />
export default Edit
