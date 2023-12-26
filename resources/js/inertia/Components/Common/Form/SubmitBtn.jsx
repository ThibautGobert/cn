import {motion} from "framer-motion";

const SubmitBtn = ({
                       label = 'Enregistrer',
                       cssClass = 'btn btn-lg btn-primary',
                       processing = false,
                       disabled = false,
                       spinnerCssClass = 'fa-solid fa-fan fa-spin me-2',
                       iconCssClass = 'fa fa-check me-2',
                       clicked = null
})=> {
    return <>
        <button onClick={()=> clicked ? clicked() : null} type="submit" disabled={processing || disabled} className={cssClass}>
            {processing ? <motion.i
                    className={spinnerCssClass}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: processing ? 1 : 0 }}
                    transition={{ duration: 0.5 }} // Durée du fondu en secondes
                ></motion.i>
                : <motion.span className={iconCssClass}
                               initial={{ opacity: 0 }}
                               animate={{ opacity: processing ? 0 : 1 }}
                               transition={{ duration: 0.5 }} // Durée du fondu en secondes
                ></motion.span>}
            {label}
        </button>
    </>
}
export default SubmitBtn
