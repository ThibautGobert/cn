import {Link, useForm, usePage} from "@inertiajs/react";
import {PrecisionType, RatingComponent} from "@syncfusion/ej2-react-inputs";
import * as UserTypeJs from "@/enums/UserType.js";
import * as GenreTypeJs from "@/enums/GenreType.js";
import DefaultLayout from "@/inertia/Layout/DefaultLayout.jsx";
import Edit from "@/inertia/Pages/Profile/Edit.jsx";
import {MapContainer} from "react-leaflet/MapContainer";
import {Circle, Marker, Popup, TileLayer} from "react-leaflet";

const Show = ({user})=> {
    const poseType = usePage().props.poseType
    const auth = usePage().props.auth
    const { data, setData, transform, post, errors, processing, reset } = useForm({
        poses: [],
    });
    const fillCircleOptions = { fillColor: '#C7866A', color: '#C7866A' }
    const Poses = poseType.map(p=> {
        return(
            <div className="col-lg-2 col-md-4 col-6 mb-2" key={'pose_'+p.id}>
                <label className={'form-label d-block'}>{p.libelle}</label>
                <label htmlFor={'pose_' + p.id} className="switch">
                    <input type="checkbox"
                           disabled={true}
                           name="poses[]"
                           id={'pose_' + p.id}
                           checked={user.poses.find(up=> up.pose_type_id === p.id)}
                           value={p.id}/>
                    <span className="slider round"></span>
                </label>
            </div>
        )
    })

    const  DisplayBreakLine = ({ text })=> {
        if(!text)return
        const newText = text.split('\n').map((str, index, array) =>
            index === array.length - 1 ? <span key={index}>{str}</span> : <span key={index}>{str}<br/></span>
        );
        return <div>{newText}</div>;
    }

    return <>
        <div className="container">
            <div className="row">
                <div className="col-lg-12 d-flex align-items-center position-relative">
                    <img className="avatar-lg border border-3 border-primary rounded-circle shadow" src={user.avatar} alt=""/>
                    <div className="ms-3">
                        <h1>{user.full_name} </h1>
                        <div className="d-flex justify-content-between align-items-center">
                            <span className="badge bg-secondary">{user.type}</span>
                            <div className="text-primary">
                                {user.genre_type_id &&<span className="h3">
                                {user.genre_type_id === GenreTypeJs.HOMME ? <i className="fa-solid fa-mars"></i> : ''}
                                    {user.genre_type_id === GenreTypeJs.FEMME ?  <i className="fa-solid fa-venus"></i> : ''}
                                    {user.genre_type_id === GenreTypeJs.AUTRE ? <i className="fa-solid fa-mars-and-venus"></i> : ''}
                            </span>}
                            </div>
                        </div>
                        <RatingComponent  id='rating' value={5.0} disabled={true} precision={PrecisionType.Exact} cssClass='custom-fill'
                        ></RatingComponent>
                    </div>
                </div>
            </div>
            <div className="row mt-3">
                <h4>À propos</h4>
            </div>
            <div className="row mt-3">
                <div className="col-md-12">
                    <DisplayBreakLine text={user.about}></DisplayBreakLine>
                </div>
            </div>
            <div className="row mt-3">
                <h4>Poses {user.type_id === UserTypeJs.MODELE ? 'proposée(s)' : 'recherchée(s)'} par {user.firstname}</h4>
            </div>
            <div className="row mt-2">
                {Poses}
            </div>
            {user.type_id === UserTypeJs.MODELE && user.main_address && <div className="row mt-3">
                <div className="col-md-12">
                    <h4>Localisation</h4>
                </div>
                <div className="col-md-12 mt-2">
                    {user.main_address.latitude && user.main_address.longitude && <div style={{height: '400px'}}>
                        <MapContainer style={{height: '100%'}} center={[user.main_address.latitude,user.main_address.longitude]}
                                      zoom={7} scrollWheelZoom={true}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {user.distance_max &&
                                <Circle center={[user.main_address.latitude, user.main_address.longitude]} pathOptions={fillCircleOptions} radius={user.distance_max * 1000} />
                            }

                        </MapContainer>
                    </div>}
                </div>
            </div>}
            <div className="row mt-3">
                <div className="col-md-12 text-end">
                    {auth.user && auth.user.id === user.id &&<Link href={route('profile.edit', user.id)} className="btn btn-lg btn-primary me-2">
                        <i className="fa-solid fa-gear me-2"></i>Modifier
                    </Link>}

                </div>
            </div>
        </div>
    </>
}
Show.layout = page =>  <DefaultLayout children={page} />
export default Show
