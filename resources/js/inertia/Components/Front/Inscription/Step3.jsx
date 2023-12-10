import {useForm} from "@inertiajs/react";
import {useEffect, useState} from "react";
import { MapContainer } from 'react-leaflet/MapContainer'
import L from 'leaflet';
import {
    TileLayer, Marker, Popup
} from 'react-leaflet'
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

const Step3 = ()=> {
    const { data, setData, transform, post, errors, processing, reset } = useForm({
        name: 'Adresse principale',
        latitude: '',
        longitude: '',
        street: '',
        number: '',
        city: '',
        postal_code: '',
        country_code: '',
        complement: '',
    });
    const [localisationAccepted, setLocalisationAccepted] = useState(true)
    const getPosition = () => {
        return new Promise((resolve, reject) => {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(async position => {
                    setLocalisationAccepted(true)
                    await setData(data=> ({
                        ...data,
                        'longitude': position.coords.longitude,
                        'latitude': position.coords.latitude
                    }))

                    /*
                    console.log(position)
                    transform((data) => ({
                        ...data,
                        latitude: position.coords.longitude,
                        longitude: position.coords.longitude
                    }))
                    /*
                    await setData('longitude', position.coords.longitude)
                    await setData('latitude', position.coords.latitude)

                     */
                    setTimeout(()=> {
                        console.log(data)
                    }, 1000)

                    resolve(position);
                }, error => {
                    console.error("Erreur de géolocalisation : ", error.message);
                    setLocalisationAccepted(false)
                    reject(error);
                }, {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                });
            } else {
                setLocalisationAccepted(false)
                console.log("La géolocalisation n'est pas disponible");
                reject("La géolocalisation n'est pas disponible");
            }
        });
    };

    const getAdresseFromPosition = async () => {
        if(!data.latitude || !data.longitude) return
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${data.latitude}&lon=${data.longitude}`;

        try {
            let res = await axios.get(url);

            await setData(data=> ({
                ...data,
                'city': res.data.address.village,
                'number': res.data.address.house_number,
                'postal_code': res.data.address.postcode,
                'street': res.data.address.road
            }))

            console.log(data)
            return res.display_name; // Retourne l'adresse complète
        } catch (error) {
            console.error("Erreur lors de l'obtention de l'adresse : ", error);
            return null;
        }
    };
    const hasAddress= ()=> {
        return data.latitude && data.longitude && data.city && data.postal_code
    }
    useEffect(() => {
        getAdresseFromPosition();
    }, [data.latitude, data.longitude]);

    const handleLocationRequest = async (e) => {
        e.preventDefault()
        try {
            await getPosition();
        } catch (error) {
            console.error(error);
        }
    };

    const submit = async (e)=> {
        e.preventDefault()
        await post('/inscription/step2')
    }
    return <>
        <form onSubmit={submit}>
            <div className="row my-3 text-center">
                <p>Afin de poursuivre votre inscription, nous avons besoin de votre adresse, veuillez cliquer sur le bouton afin de la trouver via votre position.</p>
                {!localisationAccepted && <div>
                    <small className="text-danger">Il semble que votre navigateur ne permet pas d'obtenir votre position ou que vous avez refusé l'autorisation. <br/>Vous pouvez donner l'autorisation au navigateur en cliquant sur l'icône qui se trouve à droite de la barre d'adresse et ensuite cliquer sur commencer, ou alors ne pas donner l'autorisation et introduire votre adresse manuellement.</small>
                </div>}
                <div className="mt-3">
                    <button onClick={handleLocationRequest} className="btn btn-lg btn-secondary">Commencer</button>
                </div>
            </div>
            {!localisationAccepted || hasAddress() && <div className="row mt-3">
                <div className="col-lg-4 col-md-8 mb-3">
                    <label htmlFor="city">Rue</label>
                    <input type="text" className="form-control form-control-lg" name="city" id="city"
                           onChange={(e)=> setData('street', e.target.value)}
                           value={data.street}
                    />
                </div>
                <div className="col-lg-2 col-md-4 mb-3">
                    <label htmlFor="city">Numéro</label>
                    <input type="text" className="form-control form-control-lg" name="city" id="city"
                           onChange={(e)=> setData('number', e.target.value)}
                           value={data.number}
                    />
                </div>
                <div className="col-lg-6 mb-3">
                    <label htmlFor="city">Complément</label>
                    <input type="text" className="form-control form-control-lg" name="city" id="city"
                           onChange={(e)=> setData('complement', e.target.value)}
                           value={data.complement}
                    />
                </div>
                <div className="col-lg-6 mb-3">
                    <label htmlFor="city">Ville</label>
                    <input type="text" className="form-control form-control-lg" name="city" id="city"
                           onChange={(e)=> setData('city', e.target.value)}
                           value={data.city}
                    />
                </div>
                <div className="col-lg-2 col-md-4 mb-3">
                    <label htmlFor="city">Code postal</label>
                    <input type="text" className="form-control form-control-lg" name="city" id="city"
                           onChange={(e)=> setData('postal_code', e.target.value)}
                           value={data.postal_code}
                    />
                </div>
            </div>}
            <div className="row mt-3">
                <div className="col-md-12">
                    {data.latitude && data.longitude && <div style={{height: '400px'}}>
                        <MapContainer style={{height: '100%'}} center={[data.latitude, data.longitude]} zoom={10} scrollWheelZoom={true}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[data.latitude, data.longitude]}>
                                <Popup>
                                    A pretty CSS3 popup. <br/> Easily customizable.
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
                                <button type="submit" disabled={!data.type_id} className="btn btn-lg btn-primary"><span
                                    className="fa fa-check me-2"></span>Suivant</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </>
}

export default Step3
