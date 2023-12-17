import {useForm, usePage} from "@inertiajs/react";
import * as UserType from '../../../../enums/UserType.js'
import ProfilePicture from "@/inertia/Components/Common/Form/ProfilePicture.jsx";
import SubmitBtn from "@/inertia/Components/Common/Form/SubmitBtn.jsx";

const Step6 = ()=> {

    const auth = usePage().props.auth
    const { data, setData, transform, post, errors, processing, reset } = useForm({
        image: null,
        croppedArea: null,
        croppedAreaPixel: null,
    });
    const submit = async (e)=> {
        e.preventDefault()
        await post('/inscription/step6/'+auth.user.id)
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
            <div className="row">
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
                                <SubmitBtn disabled={!data.image} processing={processing}></SubmitBtn>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </>
}

export default Step6
