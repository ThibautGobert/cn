import {motion} from "framer-motion";
import {useState} from "react";
import * as UserType from '../../../../enums/UserType.js'
import {useForm} from "@inertiajs/react";
const Step2 = ()=> {
    const [type, setType] = useState(null)
    const { data, setData, post, errors, processing, reset } = useForm({
        type_id: '',
    });

    const submit = async (e)=> {
        e.preventDefault()
        await post('/inscription/step2')
    }
    return <>
        <form onSubmit={submit}>
            <div className="row mt-3">
                <div className="col-lg-4 col-md-12 d-grid my-2">
                    <motion.div
                        onClick={() => setData('type_id', UserType.MODELE)}
                        className="btn btn-lg xl btn-primary"
                        whileHover={{scale: 1.03}}
                        transition={{type: "spring", stiffness: 400, damping: 10}}
                    >
                        <span>
                            {data.type_id === UserType.MODELE && <i className="fa fa-check text-success me-2"></i>}
                        </span>
                        Je suis modèle d'art
                    </motion.div>
                </div>
                <div className="col-lg-4 col-md-12 d-grid my-2">
                    <motion.div
                        onClick={() => setData('type_id', UserType.ARTISTE)}
                        className="btn btn-lg xl btn-secondary"
                        whileHover={{scale: 1.03}}
                        transition={{type: "spring", stiffness: 400, damping: 10}}
                    >
                         <span>
                            {data.type_id === UserType.ARTISTE && <i className="fa fa-check text-success me-2"></i>}
                         </span>
                        Je suis artiste
                    </motion.div>
                </div>
                <div className="col-lg-4 col-md-12 d-grid my-2">
                    <motion.div
                        onClick={() => setData('type_id', UserType.ATELIER)}
                        className="btn btn-lg xl btn-secondary"
                        whileHover={{scale: 1.03}}
                        transition={{type: "spring", stiffness: 400, damping: 10}}
                    >
                         <span>
                            {data.type_id === UserType.ATELIER && <i className="fa fa-check text-success me-2"></i>}
                         </span>
                        J'ai un atelier
                    </motion.div>
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

export default Step2
