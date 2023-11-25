import DefaultLayout from '../../Layout/DefaultLayout.jsx'
import { motion } from "framer-motion";
import { useState } from 'react'
import {router, useForm, usePage} from '@inertiajs/react'
import * as UserType from '../../../enums/UserType.js'
export default function Show({auth}){

    const [type, setType] = useState(null)
    //const { errors } = usePage().props
    const { data, setData, post, errors, processing, reset } = useForm({
        firstname: '',
        lastname: '',
        email: '',
        birthday: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = async (e)=> {
        e.preventDefault()
        await post('/register')

    }

    return(
        <>
            <DefaultLayout auth={auth}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center mt-5">
                            <motion.img
                                src="/images/logo.png"
                                alt="logo"
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-lg-4 col-md-12 d-grid my-2">
                            <motion.button
                                onClick={()=>setType(UserType.MODELE)}
                                className="btn btn-lg xl btn-primary"
                                whileHover={{ scale:1.03 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                        <span>
                            {type && type === UserType.MODELE && <i className="fa fa-check text-success me-2"></i>}
                        </span>
                                Je suis modèle d'art
                            </motion.button>
                        </div>
                        <div className="col-lg-4 col-md-12 d-grid my-2">
                            <motion.button
                                onClick={()=>setType(UserType.ARTISTE)}
                                className="btn btn-lg xl btn-secondary"
                                whileHover={{ scale:1.03 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                         <span>
                            {type && type === UserType.ARTISTE && <i className="fa fa-check text-success me-2"></i>}
                         </span>
                                Je suis artiste
                            </motion.button>
                        </div>
                        <div className="col-lg-4 col-md-12 d-grid my-2">
                            <motion.button
                                onClick={()=>setType(UserType.ATELIER)}
                                className="btn btn-lg xl btn-secondary"
                                whileHover={{ scale:1.03 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                         <span>
                            {type && type === UserType.ATELIER && <i className="fa fa-check text-success me-2"></i>}
                         </span>
                                J'ai un atelier
                            </motion.button>
                        </div>
                    </div>
                    <form className="needs-validation" noValidate  onSubmit={handleSubmit}>
                        {(type && type === UserType.MODELE) && (
                            <motion.div className="row mt-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <div className="col-lg-6 col-md-12">
                                    <div className="mb-3">
                                        <label htmlFor="firstname" className="form-label">Prénom</label>
                                        <input
                                            onChange={(e) => setData('firstname', e.target.value)}
                                            type="text"
                                            name="firstname"
                                            id="firstname"
                                            className={"form-control form-control-lg "+ (errors.firstname ? 'is-invalid' : '')}
                                        />
                                        {errors.firstname && <div className="invalid-feedback">{errors.firstname}</div>}
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-12">
                                    <div className="mb-3">
                                        <label htmlFor="lastname" className="form-label">Nom</label>
                                        <input
                                            onChange={(e) => setData('lastname', e.target.value)}
                                            type="text"
                                            name="lastname"
                                            id="lastname"
                                            className={"form-control form-control-lg "+ (errors.lastname ? 'is-invalid' : '')}
                                        />
                                        {errors.lastname && <div className="invalid-feedback">{errors.lastname}</div>}
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-12">
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input
                                            onChange={(e) => setData('email', e.target.value)}
                                            type="email"
                                            name="email"
                                            id="email"
                                            className={"form-control form-control-lg "+ (errors.email ? 'is-invalid' : '')}
                                        />
                                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-12">
                                    <div className="mb-3">
                                        <label htmlFor="birthday" className="form-label">Date de naissance</label>
                                        <input
                                            onChange={(e) => setData('birthday', e.target.value)}
                                            type="date"
                                            name="birthday"
                                            id="birthday"
                                            className={"form-control form-control-lg "+ (errors.birthday ? 'is-invalid' : '')}
                                        />
                                        {errors.birthday && <div className="invalid-feedback">{errors.birthday}</div>}
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-12">
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Mot de passe</label>
                                        <input
                                            onChange={(e) => setData('password', e.target.value)}
                                            minLength="8"
                                            type="password"
                                            name="password"
                                            id="password"
                                            className={"form-control form-control-lg "+ (errors.password ? 'is-invalid' : '')}
                                        />
                                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-12">
                                    <div className="mb-3">
                                        <label htmlFor="password_confirmation" className="form-label">Confirmation de mot de passe</label>
                                        <input
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            minLength="8"
                                            type="password"
                                            name="password_confirmation"
                                            id="password_confirmation"
                                            className={"form-control form-control-lg "+ (errors.password_confirmation ? 'is-invalid' : '')}
                                        />
                                        {errors.password_confirmation && <div className="invalid-feedback">{errors.password_confirmation}</div>}
                                    </div>
                                </div>
                                <div className="col-md-12 text-end">
                                    <button disabled={processing} className="btn btn-lg btn-primary" type="submit"><i className="fa fa-check me-2"></i>Enregistrer</button>
                                </div>
                            </motion.div>
                        )}

                    </form>
                </div>
            </DefaultLayout>
        </>
    )

}


//export default Show
