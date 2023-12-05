import { Link } from '@inertiajs/react'
import { usePage } from '@inertiajs/react'

const NavBar = ()=> {
    const { url, component, props } = usePage()
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" href={route('home')}>
                    <img className="nav-logo" src="/images/logo.png" alt="logo CroquezNous"/>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className={'nav-link '+ (url === '/' ? 'active' : '')} href={route('home')}>Croqueznous</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={'nav-link '+ (url === 'agence' ? 'active' : '')} href={route('agence')}>Agence</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={'nav-link '+ (url === 'modeles' ? 'active' : '')} href={route('modeles')}>Modèles</Link>
                        </li>
                    </ul>
                    {!props.auth.user && (
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className={'nav-link '+ (url === 'inscription' ? 'active' : '')} href={route('inscription')}>Inscription</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={'nav-link '+ (url === 'connexion' ? 'active' : '')} href={route('login')}>Connexion</Link>
                            </li>
                        </ul>
                    )}
                    {props.auth.user && (
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className={'nav-link '+ (url === 'inscription' ? 'active' : '')}  href={route('logout')} method="post"  as="button">{props.auth.user.full_name}</Link>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default NavBar
