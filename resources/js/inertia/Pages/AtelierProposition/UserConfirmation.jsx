import DefaultLayout from "@/inertia/Layout/DefaultLayout.jsx";
import {Link, usePage} from "@inertiajs/react";
import {MapContainer} from "react-leaflet/MapContainer";
import {Marker, Popup, TileLayer, useMap} from "react-leaflet";
import L from "leaflet";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import React from 'react';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25,41],
    iconAnchor: [12,41]
});

L.Marker.prototype.options.icon = DefaultIcon;
const AdjustView = ({ atelier, user }) => {
    const map = useMap(); // Utilisez useMap ici dans un composant enfant

    React.useEffect(() => {
        let first = L.latLng(atelier.address.latitude, atelier.address.longitude);
        let second = L.latLng(user.main_address.latitude, user.main_address.longitude);
        let bounds = L.latLngBounds(first, second);

        map.flyToBounds(bounds, {
            animate: true,
            duration: 2
        });
    }, [map, atelier, user]);

    return null;
};

const UserConfirmation = ()=> {
    const atelier = usePage().props.atelier
    const user = usePage().props.user

    return <>
        <div className="container">
            <div className="row">
                <div className="col-md-12 mb-3 d-flex justify-content-between align-items-center">
                    <h3>Invitation à l'atelier {atelier.title}</h3>
                </div>
                <div className="col-md-12">
                    <hr className="bg-secondary"/>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
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
                        <Marker position={[atelier.address.latitude, atelier.address.longitude]}>
                            <Popup>
                                {atelier.title}
                            </Popup>
                        </Marker>
                        <Marker position={[user.main_address.latitude, user.main_address.longitude]}>
                            <Popup>
                                {user.full_name}
                            </Popup>
                        </Marker>
                        <AdjustView atelier={atelier} user={user} /> {/* Ajoutez votre composant ici */}
                    </MapContainer>
                </div>
            </div>
        </div>
    </>
}

UserConfirmation.layout = page =>  <DefaultLayout children={page} />
export default UserConfirmation
