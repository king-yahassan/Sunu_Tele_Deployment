import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Instance from "../../Services/Auth/Instance";
import config from "../../Services/config.json";
import NavBar from "../../Layouts/BaseLayouts/NavBar";
import "../../Assets/Styles/Payments/PaymentsForSubscriber.css";

function GetAllPaymentsSubscriber() {
    const { id } = useParams();
    const [getAllPaymentsSubscriber, setGetAllPaymentsSubscriber] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const result = await Instance.get(
            `${config.api_url}/paymentsSubscriber/${id}`
        );
        setGetAllPaymentsSubscriber(
            result.data.allPaymentsSubscriber.filter(
                (subscriber) => subscriber.subscriberAuthorId === id
            )
        );
    };
    console.log(getAllPaymentsSubscriber);

    const formattedDate = (_date) => {
        const dateObject = new Date(_date);
        return dateObject.toLocaleDateString("fr-FR");
    };
    // console.log(subscriber);
const reversePaymentsSubscriber = [...getAllPaymentsSubscriber].reverse() ;

    return (
        <div>
            <NavBar
                connection="Logout"
                home="Home"
                subscriber="Abonnées"
                comptablity="Comptablité"
                role="Role"
                historical="Historique"
                cartography="Cartographie"
            />
            <div className="wrapper">
                <div className="left child-wrapper">
                    {reversePaymentsSubscriber.length === 0 ? (
                        <h1>No payment</h1>
                    ) : (
                        <div>
                            <h4>Détails de l'Abonné</h4>
                            <p>
                                Nom & Prénom : <br />
                                {getAllPaymentsSubscriber[0].subscriberAuthorName}
                            </p>
                            <p>
                                Téléphone : <br />
                                {getAllPaymentsSubscriber[0].subscriberAuthorPhoneNumber}
                            </p>
                            <p>
                                Mensualité : <br />
                                {getAllPaymentsSubscriber[0].subscriberAuthorPaymentPrice} XOF
                            </p>
                            <p>
                                Abonné Inscrit par : <br />
                                {getAllPaymentsSubscriber[0].comptaAdminPseudo}
                            </p>
                        </div>
                    )}
                </div>
                <div className="right child-wrapper">
                    <div className="right-item1">
                        <div className="search-payments-subscriber">
                            <input
                                type="text"
                                placeholder="Search..."
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                }}
                            />
                            <div className="min-navbar">
                                <ul className="items">
                                    <li>Date de paiement </li>
                                    <li>Nombre de mois payés </li>
                                    <li>Paiement effectué par </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="right-item2">
                        {reversePaymentsSubscriber.length === 0 ? (
                            <h1 id="not-payment"> 0 Paiement Trouvé avec cet Abonné</h1>
                        ) : (
                            reversePaymentsSubscriber
                                .filter((payment) =>
                                    `${payment.subscriberAuthorName} ${payment.subscriberAuthorPaymentPrice} ${payment.date}`
                                        .toLowerCase()
                                        .includes(`${search}`)
                                )
                                .map((payment, index) => (
                                    <div key={index} className="items_">
                                        <p>{formattedDate(payment.date)}</p>
                                        {/* <p>{formattedDate(payment.validateSubscribe)}</p> */}
                                        <p>{payment.numbersMonth}</p>
                                        <p>{payment.comptaAdminPseudo}</p>
                                        
                                    </div>
                                ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GetAllPaymentsSubscriber;
