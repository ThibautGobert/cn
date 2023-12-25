import {useForm} from "@inertiajs/react";
import ProfilePicture from "@/inertia/Components/Common/Form/ProfilePictureCropper.jsx";
import SubmitBtn from "@/inertia/Components/Common/Form/SubmitBtn.jsx";
import button from "bootstrap/js/src/button.js";

const ProfilePictureForm = ({auth, onSubmit, processing, onDismiss = null})=> {
        const { data, setData, transform, post, errors, reset } = useForm({
        image: null,
        croppedArea: null,
        croppedAreaPixel: null,
    });
        const submit = async (e)=> {
        e.preventDefault()
        onSubmit(data)
    }

        const onImageInfo = (image, croppedArea, croppedAreaPixel)=> {
        setData({
            ...data,
            'image': image,
            'croppedArea': croppedArea,
            'croppedAreaPixel': croppedAreaPixel,
        })
    }

        return <>
        <form onSubmit={submit}>
            <div className="row mt-3">
                <div className="col-md-12 mb-3 text-center">
                    Veuillez choisir une image et l'adapter afin que le résultat vous convienne dans le cercle de prévisualisation. <br/>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <ProfilePicture user={auth.user} onImageInfo={onImageInfo}></ProfilePicture>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <div className="mb-2 text-center">
                                {onDismiss && <button className="btn btn-lg btn-outline-secondary me-2" onClick={()=> onDismiss()}>Annuler</button>}
                                <SubmitBtn disabled={!data.image} processing={processing}></SubmitBtn>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </>
}
export default ProfilePictureForm
