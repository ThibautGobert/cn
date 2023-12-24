import {useForm, usePage} from "@inertiajs/react";
import * as UserType from '../../../../enums/UserType.js'
import SubmitBtn from "@/inertia/Components/Common/Form/SubmitBtn.jsx";

const Step5 = ()=> {

    const auth = usePage().props.auth
    const poseType = usePage().props.poseType
    const { data, setData, transform, post, errors, processing, reset } = useForm({
        poses: [],
    });

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

    const Poses = poseType.map(p=> {
        return <>
            <div className="ol-lg-2 col-md-4 col-6  mb-2 text-center" key={'pose_'+p.id}>
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
        </>
    })
    const submit = async (e)=> {
        e.preventDefault()

        await post('/inscription/step5/'+auth.user.id)
    }

    return <>
        <form onSubmit={submit}>
            <div className="row mt-3">
                <div className="col-md-12 text-center">
                    {auth.user.type_id === UserType.MODELE ? <div>
                        En tant que modèle d'art, quels sont les types de poses que vous proposez ?
                    </div>: <div>
                        Quels sont les type de poses que vous recherchez ?
                    </div>}
                </div>
            </div>
            <div className="row mt-3 justify-content-center">
                {Poses}
            </div>
            <div className="row mt-3">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <div className="mb-2 text-center">
                                <SubmitBtn processing={processing} disabled={data.poses.length === 0}></SubmitBtn>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </>
}

export default Step5
