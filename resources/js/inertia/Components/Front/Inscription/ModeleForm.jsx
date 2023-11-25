import {motion} from "framer-motion";

const ModeleForm = ()=> {
    return (
        <motion.div className="row mt-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="col-lg-6 col-md-12">
                <div className="mb-2">
                    <label htmlFor="firstname" className="form-label">Prénom</label>
                    <input type="text" name="firstname" id="firstname" className="form-control form-control-lg"/>
                </div>
            </div>
            <div className="col-lg-6 col-md-12">
                <div className="mb-2">
                    <label htmlFor="name" className="form-label">Nom</label>
                    <input type="text" name="name" id="name" className="form-control form-control-lg"/>
                </div>
            </div>
            <div className="col-md-12 text-end">
                <button className="btn btn-lg btn-primary" type="submit"><i className="fa fa-check me-2"></i>Enregistrer</button>
            </div>
        </motion.div>
    )
}
export default ModeleForm
