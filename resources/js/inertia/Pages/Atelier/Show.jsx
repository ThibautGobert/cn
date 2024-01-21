import DefaultLayout from "@/inertia/Layout/DefaultLayout.jsx";
import {Link, usePage} from "@inertiajs/react";
import useDateFormat from "@/inertia/Hooks/useDateFormat.js";
import {MapContainer} from "react-leaflet/MapContainer";
import {Marker, Popup, TileLayer} from "react-leaflet";
import L from "leaflet";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25,41],
    iconAnchor: [12,41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const Show = ()=> {
    const atelier = usePage().props.atelier
    return <>
        <div className="container">
            <div className="row">
                <div className="col-md-12 mb-3">
                    <h3>{atelier.title}</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-4">
                    <div className="card border border-secondary mb-3">
                        <div className="card-body">
                            <h5 className="mb-3">Informations</h5>
                            <hr/>
                            <em>Atelier organisé par <Link href={route('profile.show', atelier.user.id)} className="text-primary">{atelier.user.full_name}</Link></em> <br/>
                            <em>Type de pose : {atelier.pose}</em>
                            <hr/>
                            <table className="border-0">
                                <tbody>
                                <tr>
                                    <td className="pe-3">Date : </td>
                                    <td className="pe-3">{useDateFormat(atelier.from, 'dd/MM/yyyy')}</td>
                                </tr>
                                <tr>
                                    <td className="pe-3">De : </td>
                                    <td className="pe-3">{useDateFormat(atelier.from, 'HH\'h\'mm')}</td>
                                </tr>
                                <tr>
                                    <td className="pe-3">À :</td>
                                    <td className="pe-3">{useDateFormat(atelier.to, 'HH\'h\'mm')}</td>
                                </tr>
                                <tr>
                                    <td>Ville : </td>
                                    <td>{atelier.address.city + ', ' + atelier.address.postal_code}</td>
                                </tr>
                                <tr>
                                    <td>Rue : </td>
                                    <td>{atelier.address.street + ' ' + atelier.address.number}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="card border border-secondary">
                        <div className="card-body">
                            <h5 className="mb-3">Participants</h5>
                            <hr/>
                            <table className="border-0">
                                <tbody>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8">
                    <MapContainer style={{height: '500px'}} center={[atelier.address.latitude, atelier.address.longitude]} zoom={10} scrollWheelZoom={true}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[atelier.address.latitude, atelier.address.longitude]}>
                            <Popup>
                                atelier
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </div>
        </div>
    </>
}
Show.layout = page =>  <DefaultLayout children={page} />

export default Show
