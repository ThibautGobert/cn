import {useState} from "react";
import {Link, useForm} from "@inertiajs/react";

const Step1 = ()=> {
    const { data, setData, post, errors, processing, reset } = useForm({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = async (e)=> {
        e.preventDefault()
        await post('/inscription/step1')
    }
    return <>
        <div className="row">
            <div className="col-md-12">
                <h6 className="my-3 text-center">Inscription par email</h6>
            </div>
        </div>
        <form onSubmit={submit}>
            <div className="row">
                <div className="col-lg-6">
                    <div className="mb-2">
                        <label htmlFor="firstname" className="form-label">Prénom</label>
                        <input type="text" id="firstname" name="firstname"
                               className={"form-control form-control-lg " + (errors.firstname ? 'is-invalid' : '')}
                               onChange={(e) => setData('firstname', e.target.value)}/>
                        {errors.firstname && <div className="invalid-feedback">{errors.firstname}</div>}
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="mb-2">
                        <label htmlFor="lastname" className="form-label">Nom</label>
                        <input type="text" id="lastname" name="lastname"
                               className={"form-control form-control-lg " + (errors.lastname ? 'is-invalid' : '')}
                               onChange={(e) => setData('lastname', e.target.value)}/>
                        {errors.lastname && <div className="invalid-feedback">{errors.lastname}</div>}
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="mb-2">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" id="email" name="email"
                               className={"form-control form-control-lg " + (errors.email ? 'is-invalid' : '')}
                               onChange={(e) => setData('email', e.target.value)}/>
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <div className="mb-2">
                        <label htmlFor="password" className="form-label">Mot de passe</label>
                        <input type="password" id="password" name="password"
                               className={"form-control form-control-lg " + (errors.password ? 'is-invalid' : '')}
                               onChange={(e) => setData('password', e.target.value)} />
                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="mb-2">
                        <label htmlFor="password_confirmation" className="form-label">Confirmation de mot de passe</label>
                        <input type="password" id="password_confirmation" name="password_confirmation"
                               className={"form-control form-control-lg " + (errors.password ? 'is-invalid' : '')}
                               onChange={(e) => setData('password_confirmation', e.target.value)} />
                        {errors.password_confirmation && <div className="invalid-feedback">{errors.password_confirmation}</div>}
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 text-center">
                    <div className="mb-2 text-center">
                        <button className="btn btn-lg btn-primary"><span
                            className="fa fa-check me-2"></span>Enregistrer</button>
                    </div>
                </div>
            </div>
        </form>
        <div className="row">
            <div className="col-md-12">
                <hr/>
                <h6 className="my-3 text-center">Ou</h6>
                <h6 className="my-3 text-center">Inscription via Facebook</h6>
                <div className="mb-2 text-center">
                    <Link className="btn btn-lg btn-secondary" href={route('auth.facebook')}>
                        <i className="fa-brands fa-facebook me-2"></i>Commencer
                    </Link>
                </div>
            </div>
        </div>
    </>
}

export default Step1
