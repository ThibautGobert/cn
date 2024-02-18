import useDateFormat from "@/inertia/Hooks/useDateFormat.js";

const Footer = ()=> {
    const currentDate = new Date()

    return <>
        <footer>
            <div>
                CroquezNous - © {useDateFormat(currentDate, 'yyyy')}
            </div>
        </footer>
    </>
}

export default Footer
