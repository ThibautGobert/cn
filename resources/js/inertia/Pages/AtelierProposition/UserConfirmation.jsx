import DefaultLayout from "@/inertia/Layout/DefaultLayout.jsx";
import {Link, usePage} from "@inertiajs/react";
import {MapContainer} from "react-leaflet/MapContainer";
import {Marker, Popup, TileLayer, useMap} from "react-leaflet";
import L from "leaflet";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import React, {useState} from 'react';
import useDateFormat from "@/inertia/Hooks/useDateFormat.js";
import SubmitBtn from "@/inertia/Components/Common/Form/SubmitBtn.jsx";
import * as StatutAtelierPropositionTypeJS from '../../../enums/StatutAtelierPropositionType.js'
import useToastHook from "@/inertia/Hooks/useToastHook.js";

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25,41],
    iconAnchor: [12,41]
});

L.Marker.prototype.options.icon = DefaultIcon;
const AdjustView = ({ atelier, user }) => {
    const map = useMap(); // Utilisez useMap ici dans un composant enfant
    if(atelier.address && user.main_address) {
        React.useEffect(() => {
            let first = L.latLng(atelier.address.latitude, atelier.address.longitude);
            let second = L.latLng(user.main_address.latitude, user.main_address.longitude);
            let bounds = L.latLngBounds(first, second);

            map.flyToBounds(bounds, {
                animate: true,
                duration: 2
            });
        }, [map, atelier, user]);
    }

    return null;
}

const UserConfirmation = ()=> {
    const atelier = usePage().props.atelier
    const [proposition, setProposition] = useState(usePage().props.proposition)
    const user = usePage().props.user
    const [accepting, setAccepting] = useState(false)
    const [refusing, setRefusing] = useState(false)
    const [toastMessage, setToastMessage] = useState(null)
    useToastHook({message: toastMessage})
    const onAccept = async()=> {
        setAccepting(true)
        try {
            let res = await axios.post(route('atelier.proposition.accept', {atelier: atelier.id, proposition: proposition.id}))
            setProposition(res.data.proposition)
            setToastMessage({
                type: 'success',
                content: 'Décision enregistrée avec succès !'
            })
        }catch (e) {
            setToastMessage({
                type: 'error',
                content: 'Une erreur s\'est produite'
            })
            console.log(e)
        }

        setAccepting(false)
    }

    const onRefuse = async()=> {
        setRefusing(true)
        try {
            let res = await axios.post(route('atelier.proposition.refuse', {atelier: atelier.id, proposition: proposition.id}))
            setProposition(res.data.proposition)
            setToastMessage({
                type: 'success',
                content: 'Décision enregistrée avec succès !'
            })
        }catch (e) {
            setToastMessage({
                type: 'error',
                content: 'Une erreur s\'est produite'
            })
        }
        setRefusing(false)
    }

    return <>
        <div className="container">
            <div className="row">
                <div className="col-md-12 d-flex justify-content-between align-items-center">
                    <h3 className="m-0">Invitation à l'atelier {atelier.title}</h3>
                    {proposition.participant_statut_id === StatutAtelierPropositionTypeJS.ACCEPTED &&
                        <span className="bg-success badge badge-lg">Acceptée</span>
                    }
                    {proposition.participant_statut_id === StatutAtelierPropositionTypeJS.REFUSED &&
                        <span className="bg-danger badge badge-lg">Refusée</span>
                    }
                </div>
                <div className="col-md-12">
                    <hr className="bg-secondary"/>
                </div>
            </div>
            {!user.main_address && <div className="row">
                <div className="col-md-12 mb-3">
                    <div className="alert alert-warning">
                        Affichage de votre emplacement impossible, aucune adresse trouvée.
                    </div>
                </div>
            </div>}
            {!atelier.address && <div className="row">
                <div className="col-md-12 mb-3">
                    <div className="alert alert-warning">
                        Affichage de l'emplacement de l'atelier impossible, aucune adresse trouvée.
                    </div>
                </div>
            </div>}
            <div className="row">
                <div className="col-lg-4">
                    <div>
                        Date : {useDateFormat(atelier.from)}
                    </div>
                    <div>
                        Adresse : {atelier.address?.numero} {atelier.address?.street}, {atelier.address?.postal_code} {atelier.address?.city}
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 mb-3">
                    <MapContainer
                        style={{height: '500px'}}
                        center={[atelier.address.latitude, atelier.address.longitude]}
                        zoom={15}
                        scrollWheelZoom={true}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {atelier.address && <Marker position={[atelier.address.latitude, atelier.address.longitude]}>
                            <Popup>
                                {atelier.title}
                            </Popup>
                        </Marker>}
                        {user.main_address &&<Marker position={[user.main_address.latitude, user.main_address.longitude]}>
                            <Popup>
                                {user.full_name}
                            </Popup>
                        </Marker>}
                        <AdjustView atelier={atelier} user={user} /> {/* Ajoutez votre composant ici */}
                    </MapContainer>
                </div>
            </div>
            {proposition.participant_statut_id === StatutAtelierPropositionTypeJS.PENDING && <div className="row mb-3">
                <div className="col-md-12 text-right d-flex justify-content-end">
                    <SubmitBtn
                        label="Refuser"
                        processing={refusing}
                        clicked={() => onRefuse()}
                        cssClass="btn btn-lg btn-danger me-2"
                        iconCssClass="fa fa-times me-2"
                        disabled={accepting || refusing}
                    ></SubmitBtn>
                    <SubmitBtn
                        label="Accepter"
                        processing={accepting}
                        clicked={() => onAccept()}
                        iconCssClass="fa fa-check me-2"
                        disabled={accepting || refusing}
                    ></SubmitBtn>
                </div>
            </div>}
        </div>
    </>
}

UserConfirmation.layout = page =>  <DefaultLayout children={page} />
export default UserConfirmation
