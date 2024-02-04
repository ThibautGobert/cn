import DefaultLayout from "@/inertia/Layout/DefaultLayout.jsx";
import {motion} from "framer-motion";
import {Link, useForm} from "@inertiajs/react";
import SubmitBtn from "@/inertia/Components/Common/Form/SubmitBtn.jsx";


const Login = ()=> {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });
    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
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
                                            <label htmlFor="email" className="form-label">Email</label>
                                            <input type="email" id="email" name="email" className="form-control form-control-lg"
                                                   onChange={(e) => setData('email', e.target.value)}/>
                                        </div>
                                        <div className="mb-2">
                                            <label htmlFor="password" className="form-label">Mot de passe</label>
                                            <input type="password" id="password" name="password" className="form-control form-control-lg"
                                                   onChange={(e) => setData('password', e.target.value)} />
                                        </div>
                                        <div className="mb-2 text-center">
                                            <SubmitBtn label="Connexion" processing={processing} disabled={!data.email || !data.password}></SubmitBtn>
                                            <div>
                                                <Link href={route('password.request')}>Mot de passe oublié ?</Link>
                                            </div>

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

Login.layout = page =>  <DefaultLayout children={page} />
export default Login;
