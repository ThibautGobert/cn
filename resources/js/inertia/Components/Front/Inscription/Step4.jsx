import {useForm, usePage} from "@inertiajs/react";
import {useEffect, useState} from "react";
import { MapContainer } from 'react-leaflet/MapContainer'
import L from 'leaflet';
import {
    TileLayer, Marker, Popup, Circle
} from 'react-leaflet'
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import SubmitBtn from "@/inertia/Components/Common/Form/SubmitBtn.jsx";

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25,41],
    iconAnchor: [12,41]
});

L.Marker.prototype.options.icon = DefaultIcon;


const Step4 = ()=> {
    const address = usePage().props.address
    const auth = usePage().props.auth
    const { data, setData, transform, post, errors, processing, reset } = useForm({
        distance_max: auth.user?.distance_max || 5,
    });

    const fullAddress = ()=> {
        return address.number + ' ' + address.street + ', ' + address.postal_code + ', ' + address.city
    }
    const submit = async (e)=> {
        e.preventDefault()

        await post('/inscription/step4/'+auth.user.id)
    }
    const fillBlueOptions = { fillColor: '#C7866A', color: '#C7866A' }
    return <>
        <form onSubmit={submit}>
            <div className="row mt-3">
                <div className="col-md-12 text-center">
                    Quelle est la distance maximum à laquelle vous pouvez vous déplacer ?
                    <div className="progress-wrapper">
                        <div className="badge bg-secondary distance-indicator">{data.distance_max}Km</div>
                        <input min="5" max="350" type="range" className="form-range " value={data.distance_max} onChange={(e)=> setData('distance_max', e.target.value)}/>
                    </div>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-md-12">
                    {address.latitude && address.longitude && <div style={{height: '400px'}}>
                        <MapContainer style={{height: '100%'}} center={[address.latitude, address.longitude]} zoom={8} scrollWheelZoom={true}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Circle center={[address.latitude, address.longitude]} pathOptions={fillBlueOptions} radius={data.distance_max * 1000} />
                            <Marker position={[address.latitude, address.longitude]}>
                                <Popup>
                                    {fullAddress()}
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </div>}
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <div className="mb-2 text-center">
                               <SubmitBtn processing={processing}></SubmitBtn>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </>
}

export default Step4
