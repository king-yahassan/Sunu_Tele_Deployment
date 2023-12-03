import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../DataContext";
import Instance from "../../Services/Auth/Instance";
import config from "../../Services/config.json";
import "../../Assets/Styles/Subscribers/AllSubscribers.css";
import payment from "../../Assets/Imgs/icon-payment.svg"
import edit from "../../Assets/Imgs/icon-edit.svg"
import show from "../../Assets/Imgs/icon-show.svg"
import deleteIcon from "../../Assets/Imgs/icon_delete.svg"


const AllSubscribers = () => {
    const { subscribers } = useContext(DataContext);
    const [search, setSearch] = useState("");
    //const {id} = useParams();
    const InverseSubscribers = [...subscribers].reverse();

    // console.log(InverseSubscribers);
    //deleted subscriber
    async function deleteSubscriber(id) {
        // Affichage de la boîte de dialogue de confirmation
        var confirmation = confirm("Voulez-vous vraiment supprimer cet Abonné ?");
    
        if (confirmation) {
            try {
                await Instance.delete(`${config.api_url}/removeSubscriber/${id}`);
                console.log("Élément supprimé !");
                window.location.reload();
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("Suppression annulée");
        }
    }
    

    return (
        <div className="all-subscribers">
            <div className="search_">
                <input
                    type="text"
                    placeholder="Search..."
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                />
            </div>
            <div className="all-subscribers-elements">
                <React.Fragment>
                    <div className="Subscribers">
                        <div className="barnav">
                            <ul className="mini-navbar-subscribers">
                                <li>Nom & <br /> Prénom</li>
                                <li>Adresse</li>
                                <li>Téléphone</li>
                                <li>Mensualité</li>
                                {/* <li>Coordonnées <br /> X</li>
                                <li>Coordonnées <br /> Y</li> */}
                            </ul>
                            <p> Actions</p>
                        </div>
                        {InverseSubscribers
                            .filter((subscriber) =>
                                `${subscriber.name} ${subscriber.address} ${subscriber.phoneNumber}`
                                    .toLowerCase()
                                    .includes(`${search}`)
                            )
                            .map((subscriber, index) => (
                                <div key={index} className="Subscribers-items" >
                                    <div className="Subscribers-items-wrapper">
                                        <p className="Subscribers-items-details">{subscriber.name}</p>
                                        <p className="Subscribers-items-details">{subscriber.address}</p>
                                        <p className="Subscribers-items-details">{subscriber.phoneNumber}</p>
                                        <p className="Subscribers-items-details">{subscriber.paymentPriceSubscribe}XOF</p>
                                        {/* <p className="Subscribers-items-details">{subscriber.coordoneesX}</p>
                                        <p className="Subscribers-items-details">{subscriber.coordoneesY}</p> */}
                                    </div>
                                    <div className="actions">
                                        <Link
                                            className=" btn-action"
                                            to={`/home/payments/newPayment/${subscriber._id}`}
                                        >
                                            <img src={payment} alt="payment" />
                                        </Link>

                                        <Link
                                            className=" btn-action"
                                            to={`/home/subscribers/update/${subscriber._id}`}
                                        >
                                            <img src={edit} alt="payment" />
                                        </Link>

                                        <img src={deleteIcon} onClick={() => deleteSubscriber(subscriber._id)} alt="payment" id="icon-delete" />

                                        <Link
                                            className=" btn-action"
                                            to={`/home/subscribers/showSubscriber/${subscriber._id}`}
                                        >
                                            <img src={show} alt="payment" />
                                        </Link>

                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </React.Fragment>
            </div >
        </div >
    );
};

export default AllSubscribers;
