import DefaultLayout from "@/inertia/Layout/DefaultLayout.jsx";
import {Link, usePage} from "@inertiajs/react";
import {useEffect, useState} from "react";
import SubmitBtn from "@/inertia/Components/Common/Form/SubmitBtn.jsx";
import useToastHook from "@/inertia/Hooks/useToastHook.js";
import useDateFormat from "@/inertia/Hooks/useDateFormat.js";
import * as StatutAtelierPropositionTypeJs from '../../../enums/StatutAtelierPropositionType.js'
import General from "@/inertia/Admin/User/Edit/General.jsx";

const Index = ()=> {
    const atelier = usePage().props.atelier
    const modeles = usePage().props.modeles
    const croqueurs = usePage().props.croqueurs
    const statutAtelierPropositionType = usePage().props.statutAtelierPropositionType
    const [availableCroqueurs, setAvailableCroqueurs] = useState([])
    const [sentCroqueurs, setSentCroqueurs] = useState([])
    const [confirmedCroqueurs, setConfirmedCroqueurs] = useState([])
    const [availableModeles, setAvailableModeles] = useState([])
    const [sentModeles, setSentModeles] = useState([])
    const [confirmedModeles, setConfirmedModeles] = useState([])
    const [propositions, setPropositions] = useState(atelier.propositions)
    const [sending, setSending] = useState(false)
    const [confirming, setConfirming] = useState(false)
    const [toastMessage, setToastMessage] = useState(false)
    useToastHook({message: toastMessage})

    useEffect(()=> {
        setAvailableModeles(modeles.filter(u=> !propositions.find(p=> p.participant_id === u.id)))
        setAvailableCroqueurs(croqueurs.filter(u=> !propositions.find(p=> p.participant_id === u.id)))
        setSentModeles(modeles.filter(u=> propositions.find(p=> p.participant_id === u.id && p.owner_statut_id !== StatutAtelierPropositionTypeJs.CONFIRMED)))
        setSentCroqueurs(croqueurs.filter(u=> propositions.find(p=> p.participant_id === u.id && p.owner_statut_id !== StatutAtelierPropositionTypeJs.CONFIRMED)))
        setConfirmedModeles(modeles.filter(u=> propositions.find(p=> p.participant_id === u.id && p.owner_statut_id === StatutAtelierPropositionTypeJs.CONFIRMED)))
        setConfirmedCroqueurs(croqueurs.filter(u=> propositions.find(p=> p.participant_id === u.id && p.owner_statut_id === StatutAtelierPropositionTypeJs.CONFIRMED)))
    }, [propositions])

    const onSendProposition = async(userId)=> {
        setSending(userId)
        try {
            let res = await axios.post(route('atelier.proposition.send', {atelier: atelier.id, user: userId}))
            setPropositions(res.data.propositions)
            setToastMessage({type: 'success', title: 'Invitation envoyée avec succès'})
        }catch (e) {
            setToastMessage({type: 'error', title: 'Une erreur s\'est produite'})
        }
        setSending(false)
    }

    const onConfirmProposition = async(proposition)=> {
        setConfirming(proposition.participant_id)
        try {
            let res = await axios.post(route('atelier.proposition.confirm', {atelier: proposition.atelier_id, proposition: proposition.id}))
            setPropositions(res.data.propositions)
            setToastMessage({type: 'success', title: 'Confirmation enregistrée avec succès'})
        }catch (e) {
            setToastMessage({type: 'error', title: 'Une erreur s\'est produite'})
        }
        setConfirming(false)
    }

    const getProposition = (userId)=> {
        return propositions.find(p=> p.participant_id === userId)
    }

    const getStatutBadge = (proposition)=> {
        let libelle = ''
        switch(proposition.participant_statut_id) {
            case StatutAtelierPropositionTypeJs.PENDING :
                libelle = statutAtelierPropositionType.find(s=> s.id === StatutAtelierPropositionTypeJs.PENDING).libelle
                return <span className="badge bg-secondary">{libelle}</span>
            case StatutAtelierPropositionTypeJs.ACCEPTED :
                libelle = statutAtelierPropositionType.find(s=> s.id === StatutAtelierPropositionTypeJs.ACCEPTED).libelle
                return <span className="badge bg-success">{libelle}</span>
            case StatutAtelierPropositionTypeJs.REFUSED :
                libelle = statutAtelierPropositionType.find(s=> s.id === StatutAtelierPropositionTypeJs.REFUSED).libelle
                return <span className="badge bg-danger">{libelle}</span>
        }
    }

    const availableModelesRows = availableModeles.map(u=> {
        return <div key={u.id}>
            <div  className="row mb-3">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex">
                                <div className="flex-shrink-0">
                                    <img src={u.avatar} alt={'Avatar de ' + u.limited_full_name} className="avatar-md rounded-circle" />
                                </div>
                                <div className="flex-grow-1 ms-3 d-flex flex-column justify-content-between">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h4>{u.limited_full_name}</h4>
                                            <div>Distance entre l'adresse principale du modèle et celle de l'atelier : {u.distance_km ? u.distance_km + ' Km' : 'Inconnue'}</div>
                                            <div>Distance maximum acceptée par le modèle : {u.distance_max} Km</div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 text-end">
                                            <SubmitBtn
                                                label="Inviter"
                                                clicked={()=>onSendProposition(u.id)}
                                                processing={sending === u.id}
                                            ></SubmitBtn>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    })

    const availableCroqueursRows = availableCroqueurs.map(u=> {
        return <div key={u.id}>
            <div  className="row mb-3">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex">
                                <div className="flex-shrink-0">
                                    <img src={u.avatar} alt={'Avatar de ' + u.limited_full_name} className="avatar-md rounded-circle" />
                                </div>
                                <div className="flex-grow-1 ms-3 d-flex flex-column justify-content-between">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h4>{u.limited_full_name}</h4>
                                            <div>Distance entre l'adresse principale du croqueur et celle de l'atelier : {u.distance_km ? u.distance_km + ' Km' : 'Inconnue'}</div>
                                            <div>Distance maximum acceptée par le croqueur : {u.distance_max} Km</div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 text-end">
                                            <SubmitBtn
                                                label="Inviter"
                                                clicked={()=>onSendProposition(u.id)}
                                                processing={sending === u.id}
                                            ></SubmitBtn>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    })

    const sentModeleRows =sentModeles.map(u=> {
        return <div key={u.id}>
            <div  className="row mb-3">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex">
                                <div className="flex-shrink-0">
                                    <img src={u.avatar} alt={'Avatar de ' + u.limited_full_name} className="avatar-md rounded-circle" />
                                </div>
                                <div className="flex-grow-1 ms-3 d-flex flex-column justify-content-between">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h4>{u.limited_full_name}</h4>
                                            <div>Distance entre l'adresse principale du modèle et celle de l'atelier : {u.distance_km ? u.distance_km + ' Km' : 'Inconnue'}</div>
                                            <div>Distance maximum acceptée par le modèle : {u.distance_max} Km</div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 d-flex justify-content-end">
                                            <div>
                                                Invitation envoyée le {useDateFormat(propositions.find(p=> p.participant_id === u.id).mail_sent_at, "dd/MM/yyyy 'à' HH'h'mm")}
                                                <div>
                                                    Statut : {getStatutBadge(getProposition(u.id))}
                                                </div>
                                                {getProposition(u.id).participant_statut_id === StatutAtelierPropositionTypeJs.ACCEPTED ?
                                                    <div className="mt-2">
                                                        <SubmitBtn
                                                            cssClass="btn w-100 btn-lg btn-primary"
                                                            label="Confirmer"
                                                            clicked={()=> onConfirmProposition(getProposition(u.id))}
                                                            processing={confirming === u.id}
                                                        ></SubmitBtn>
                                                    </div>
                                                    : null
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    })

    const sentCroqueurRows =sentCroqueurs.map(u=> {
        return <div key={u.id}>
            <div  className="row mb-3">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex">
                                <div className="flex-shrink-0">
                                    <img src={u.avatar} alt={'Avatar de ' + u.limited_full_name} className="avatar-md rounded-circle" />
                                </div>
                                <div className="flex-grow-1 ms-3 d-flex flex-column justify-content-between">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h4>{u.limited_full_name}</h4>
                                            <div>Distance entre l'adresse principale du modèle et celle de l'atelier : {u.distance_km ? u.distance_km + ' Km' : 'Inconnue'}</div>
                                            <div>Distance maximum acceptée par le modèle : {u.distance_max} Km</div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 d-flex justify-content-end">
                                            <div>
                                                Invitation envoyée le {useDateFormat(propositions.find(p=> p.participant_id === u.id).mail_sent_at, "dd/MM/yyyy 'à' HH'h'mm")}
                                                <div>
                                                    Statut : {getStatutBadge(getProposition(u.id))}
                                                </div>
                                                {getProposition(u.id).participant_statut_id === StatutAtelierPropositionTypeJs.ACCEPTED ?
                                                    <div className="mt-2">
                                                        <SubmitBtn
                                                            cssClass="btn w-100 btn-lg btn-primary"
                                                            label="Confirmer"
                                                            clicked={()=> onConfirmProposition(getProposition(u.id))}
                                                            processing={confirming === u.id}
                                                        ></SubmitBtn>
                                                    </div>
                                                    : null
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    })

    const confirmedModeleRows =confirmedModeles.map(u=> {
        return <div key={u.id}>
            <div  className="row mb-3">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex">
                                <div className="flex-shrink-0">
                                    <img src={u.avatar} alt={'Avatar de ' + u.limited_full_name} className="avatar-md rounded-circle" />
                                </div>
                                <div className="flex-grow-1 ms-3 d-flex flex-column justify-content-between">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h4>{u.limited_full_name}</h4>
                                            <div>Distance entre l'adresse principale du modèle et celle de l'atelier : {u.distance_km ? u.distance_km + ' Km' : 'Inconnue'}</div>
                                            <div>Distance maximum acceptée par le modèle : {u.distance_max} Km</div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 d-flex justify-content-end">
                                            <div>
                                                Invitation envoyée le {useDateFormat(propositions.find(p=> p.participant_id === u.id).mail_sent_at, "dd/MM/yyyy 'à' HH'h'mm")}
                                                <div>
                                                    Statut : {getStatutBadge(getProposition(u.id))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    })
    const confirmedCroqueurRows =confirmedCroqueurs.map(u=> {
        return <div key={u.id}>
            <div  className="row mb-3">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex">
                                <div className="flex-shrink-0">
                                    <img src={u.avatar} alt={'Avatar de ' + u.limited_full_name} className="avatar-md rounded-circle" />
                                </div>
                                <div className="flex-grow-1 ms-3 d-flex flex-column justify-content-between">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h4>{u.limited_full_name}</h4>
                                            <div>Distance entre l'adresse principale du modèle et celle de l'atelier : {u.distance_km ? u.distance_km + ' Km' : 'Inconnue'}</div>
                                            <div>Distance maximum acceptée par le modèle : {u.distance_max} Km</div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 d-flex justify-content-end">
                                            <div>
                                                Invitation envoyée le {useDateFormat(propositions.find(p=> p.participant_id === u.id).mail_sent_at, "dd/MM/yyyy 'à' HH'h'mm")}
                                                <div>
                                                    Statut : {getStatutBadge(getProposition(u.id))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    })
    return <>
        <div className="container">
            <div className="row">
                <div className="col-md-12 mb-3 d-flex justify-content-between align-items-center">
                    <h3>Gestion des participants de l'atelier {atelier.title}</h3>
                    <Link href={route('atelier.index')} className="btn btn-primary btn-lg"><i className="fa-solid fa-backward"></i></Link>
                </div>
                <div className="col-md-12">
                    <hr className="bg-secondary"/>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="alert alert-secondary d-flex align-items-center">
                        <div className="h1 me-3"><i className="fa-solid fa-circle-info"></i></div>
                        <div>
                            Cet écran vous permet d'inviter des utilisateurs (modèles et/ou croqueurs) à votre atelier. <br/>
                            Les utilisateurs invités reçoivent un mail, ils doivent ensuite confirmer si ils acceptent ou non l'invitation. <br/>
                            Lorsqu'une invitation a été acceptée, le statut "accepté" s'affichera dans les invitations en attentes,
                            vous aurez alors la possibilité de confirmer de manière définitive la participation de cet utilisateur.
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <ul className="nav nav-tabs scrollable-tabs" id="user-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="create" data-bs-toggle="tab"
                                    data-bs-target="#create-tab" type="button" role="tab" aria-controls="create" aria-selected="true">Inviter des membres
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="pending" data-bs-toggle="tab"
                                    data-bs-target="#pending-tab" type="button" role="tab" aria-controls="pending">Invitations en attente<span className="badge bg-secondary ms-2">{sentModeles.length + sentCroqueurs.length}</span>
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="confirmed" data-bs-toggle="tab"
                                    data-bs-target="#confirmed-tab" type="button" role="tab" aria-controls="general" aria-selected="true">Invitations confirmées<span className="badge bg-secondary ms-2">{confirmedModeles.length + confirmedCroqueurs.length}</span>
                            </button>
                        </li>
                    </ul>
                    <div className="tab-content mt-3">
                        <div className="tab-pane fade show active" id="create-tab" role="tabpanel" aria-labelledby="create">
                            <div className="row">
                                <div className="col-md-12 mb-2">
                                    <h5>Modèles :</h5>
                                </div>
                            </div>
                            {availableModeles.length > 0 ? availableModelesRows : <div className="text-center">Aucun modèle de disponible</div>}
                            <hr className="md primary dashed"/>
                            <div className="row mt-3">
                                <div className="col-md-12 mb-2">
                                    <h5>Croqueurs :</h5>
                                </div>
                            </div>
                            {availableCroqueurs.length > 0 ? availableCroqueursRows : <div className="text-center">Aucun croqueur de disponible</div>}
                        </div>
                        <div className="tab-pane fade" id="pending-tab" role="tabpanel" aria-labelledby="pending">
                            <div className="row">
                                <div className="col-md-12 mb-2">
                                    <h5>Modèles :</h5>
                                </div>
                            </div>
                            {sentModeles.length > 0 ? sentModeleRows : <div className="text-center">Aucune invitation de modèle en attente</div>}
                            <hr className="md primary dashed"/>
                            <div className="row">
                                <div className="col-md-12 mb-2">
                                    <h5>Croqueurs :</h5>
                                </div>
                            </div>
                            {sentCroqueurs.length > 0 ? sentCroqueurRows : <div className="text-center">Aucune invitation de croqueur en attente</div>}
                        </div>
                        <div className="tab-pane fade" id="confirmed-tab" role="tabpanel" aria-labelledby="confirmed">
                            <div className="row">
                                <div className="col-md-12 mb-2">
                                    <h5>Modèles :</h5>
                                </div>
                            </div>
                            {confirmedModeles.length > 0 ? confirmedModeleRows : <div className="text-center">Aucune invitation de modèle confirmée</div>}
                            <hr className="md primary dashed"/>
                            <div className="row">
                                <div className="col-md-12 mb-2">
                                    <h5>Croqueurs :</h5>
                                </div>
                            </div>
                            {confirmedCroqueurs.length > 0 ? confirmedCroqueurRows : <div className="text-center">Aucune invitation de croqueur confirmée</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

Index.layout = page =>  <DefaultLayout children={page} />
export default Index
