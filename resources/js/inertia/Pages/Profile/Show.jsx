import {Link, useForm, usePage} from "@inertiajs/react";
import {PrecisionType, RatingComponent} from "@syncfusion/ej2-react-inputs";
import * as UserTypeJs from "@/enums/UserType.js";
import * as GenreTypeJs from "@/enums/GenreType.js";
import DefaultLayout from "@/inertia/Layout/DefaultLayout.jsx";
import Edit from "@/inertia/Pages/Profile/Edit.jsx";

const Show = ({user})=> {
    const poseType = usePage().props.poseType
    const auth = usePage().props.auth
    const { data, setData, transform, post, errors, processing, reset } = useForm({
        poses: [],
    });
    const Poses = poseType.map(p=> {
        return(
            <div className="col-lg-2 col-md-4 col-6 mb-2" key={'pose_'+p.id}>
                <label className={'form-label d-block'}>{p.libelle}</label>
                <label htmlFor={'pose_' + p.id} className="switch">
                    <input type="checkbox"
                           name="poses[]"
                           id={'pose_' + p.id}
                           checked={user.poses.find(up=> up.pose_type_id === p.id)}
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

    const  DisplayBreakLine = ({ text })=> {
        if(!text)return
        const newText = text.split('\n').map((str, index, array) =>
            index === array.length - 1 ? <span key={index}>{str}</span> : <span key={index}>{str}<br/></span>
        );
        return <div>{newText}</div>;
    }

    return <>
        <div className="container">
            {auth.user && auth.user.id === user.id &&<Link href={route('profile.edit', user.id)} className="edit-link">
                <i className="fa-solid fa-gear"></i>
            </Link>}
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
            <div className="row mt-3">
                {Poses}
            </div>
        </div>
    </>
}
Show.layout = page =>  <DefaultLayout children={page} />
export default Show
