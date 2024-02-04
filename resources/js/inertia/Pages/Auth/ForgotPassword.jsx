import DefaultLayout from "@/inertia/Layout/DefaultLayout.jsx";
import {Link, useForm} from "@inertiajs/react";
import {motion} from "framer-motion";
import SubmitBtn from "@/inertia/Components/Common/Form/SubmitBtn.jsx";

const ForgotPassword = ()=> {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
    });
    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
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
                                <h5 className="my-3">Mot de passe perdu ?</h5>
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
                                    <div className="mb-2 text-center">
                                        <SubmitBtn label="Envoyer un mail" processing={processing} disabled={!data.email} ></SubmitBtn>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

ForgotPassword.layout = page =>  <DefaultLayout children={page} />
export default ForgotPassword
