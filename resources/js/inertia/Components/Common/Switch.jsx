const Switch = ({field, value})=> {
    return <>
        <label htmlFor={field} className="switch">
            <input type="checkbox" id={field} name={field} className="switch-input"
                value={value}
            />
            <span className="switch-slider"></span>
        </label>
    </>
}
export default Switch
