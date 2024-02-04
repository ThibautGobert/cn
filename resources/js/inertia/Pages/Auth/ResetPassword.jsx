import DefaultLayout from "@/inertia/Layout/DefaultLayout.jsx";
import {Link, useForm, usePage} from "@inertiajs/react";
import {motion} from "framer-motion";
import SubmitBtn from "@/inertia/Components/Common/Form/SubmitBtn.jsx";

const ResetPassword = ()=> {
    const token = usePage().props.token
    const email = usePage().props.email
    const { data, setData, post, processing, errors, reset } = useForm({
        email: email,
        password: '',
        password_confirmation: '',
        token: token,
    });
    const submit = (e) => {
        e.preventDefault();
        post(route('password.store'));
    };
    return <div className="h-100 d-flex justify-content-center align-items-center flex-grow-1">
        <div className="row justify-content-center min-vw-100">
            <div className="col-lg-4 col-md-12">
                <div className="card shadow">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <motion.img
                                    src="/images/logo.png"
                                    alt="logo"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                />
                                <h5 className="my-3">Connexion avec Email / mot de passe</h5>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <form onSubmit={submit}>
                                    <div className="mb-2">
                                        <label htmlFor="password" className="form-label">Mot de passe</label>
                                        <input type="password" id="password" name="password" className="form-control form-control-lg"
                                               onChange={(e) => setData('password', e.target.value)} />
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="password_confirmation" className="form-label">Confirmation de mot de passe</label>
                                        <input type="password" id="password_confirmation" name="password_confirmation" className="form-control form-control-lg"
                                               onChange={(e) => setData('password_confirmation', e.target.value)} />
                                    </div>
                                    <div className="mb-2 text-center">
                                        <SubmitBtn label="Connexion" processing={processing} disabled={!data.email || !data.password}></SubmitBtn>
                                    </div>
                                </form>
                                <hr/>
                                <h5 className="my-3 text-center">Connexion Facebook</h5>
                                <div className="mb-2 text-center">
                                    <Link className="btn btn-lg btn-secondary" href={route('auth.facebook')}>
                                        <i className="fa-brands fa-facebook me-2"></i>Connexion
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

ResetPassword.layout = page =>  <DefaultLayout children={page} />
export default ResetPassword
