import AdminLayout from "../../Layout/AdminLayout.jsx";
import DefaultLayout from '../../Layout/DefaultLayout.jsx'
import {motion} from "framer-motion";
import {Link} from "@inertiajs/react";
const Show = ()=> {
    return <>
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
                <div className="col-md-12 text-center">
                    <h3>Bienvenue sur la plateforme de <b>CroquezNous</b></h3>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-md-12 text-center">
                    <h2>S'inscrire</h2>
                    <p>Déjà membre ? <Link href={route('connexion')}>Connexion</Link></p>
                </div>
            </div>
        </div>
    </>
}
Show.layout = page =>  <DefaultLayout children={page} />

export default Show
