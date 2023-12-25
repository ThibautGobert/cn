import DefaultLayout from "@/inertia/Layout/DefaultLayout.jsx";
import Show from "@/inertia/Pages/Agence/Show.jsx";
import { RatingComponent, PrecisionType  } from '@syncfusion/ej2-react-inputs';
import {Link, useForm, usePage} from "@inertiajs/react";
import * as UserTypeJs from '../../../enums/UserType.js'
import SubmitBtn from "@/inertia/Components/Common/Form/SubmitBtn.jsx";
import {DropDownListComponent} from "@syncfusion/ej2-react-dropdowns";
import ProfilePictureForm from "@/inertia/Components/Common/Form/ProfilePictureForm.jsx";
import {useState} from "react";
import { Inertia } from '@inertiajs/inertia';
import {motion} from "framer-motion";

const Edit = ({user})=> {
    const auth = usePage().props.auth
    const poseType = usePage().props.poseType
    const genreType = usePage().props.genreType
    const { data, setData, transform, post, errors, processing, reset } = useForm({
        birthday: user.birthday,
        genre_type_id: user.genre_type_id,
        about: user.about,
        poses: user.poses.map(p=> p.pose_type_id),
    });
    const [processingAvatar, setProcessingAvatar] = useState(false)
    const [changeAvatar, setChangeAvatar] = useState(false)
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
        Inertia.visit(route('profile.show', auth.user))
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
                    <form onSubmit={submit}>
                        <div className="row mt-3">
                            <h4>À propos</h4>
                        </div>
                        <div className="row mt-3">
                            <div className="col-lg-3">
                                <label htmlFor="birthday" className="form-label">Date de naissance</label>
                                <input type="date" name="birthday" id="birthday" className="form-control form-control-lg"
                                       onInput={(e)=> setData('birthday', e.target.value)}
                                       value={data.birthday}
                                />
                            </div>
                            <div className="col-lg-3">
                                <label htmlFor="genre_type_id" className="form-label">Genre</label>
                                <DropDownListComponent
                                    id="genre_type_id"
                                    autoComplete="off"
                                    dataSource={genreType}
                                    fields={{text: 'libelle', value: 'id'}}
                                    value={data.genre_type_id}
                                    onChange={e=>setData('genre_type_id', e.target.value)}/>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-12">
                        <textarea name="about" id="about" cols="30" rows="10" className="form-control"
                                  value={data.about}
                                  onInput={(e)=> setData('about', e.target.value)}>
                        </textarea>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <h4>Poses {user.type_id === UserTypeJs.MODELE ? 'proposée(s)' : 'recherchée(s)'}</h4>
                        </div>
                        <div className="row mt-3">
                            {Poses}
                        </div>
                        <div className="row">
                            <div className="col-md-12 text-end">
                                <Link href={route('profile.show', user.id)} className="btn btn-lg btn-outline-secondary me-2">Annuler</Link>
                                <SubmitBtn processing={processing}></SubmitBtn>
                            </div>
                        </div>
                    </form>
                </motion.div>
            }
        </div>
    </>
}
Edit.layout = page =>  <DefaultLayout children={page} />
export default Edit
