import NavBar from '../Components/Front/NavBar.jsx'
const DefaultLayout = ({auth, children})=> {
    return (
        <div>
            <NavBar auth={auth}></NavBar>
            {children}
        </div>
    )
}
export default DefaultLayout
