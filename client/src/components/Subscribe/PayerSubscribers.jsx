import React, { useContext, useState } from "react";
// import { Link } from "react-router-dom";
import { DataContext } from "../DataContext";
// import show from "../../Assets/Imgs/icon-show.svg"

const PayerSubscribers = () => {
    const { payerSubscribers } = useContext(DataContext);
    const [search, setSearch] = useState("");
    const InversePayerSubscribers = [...payerSubscribers].reverse();


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
                                <li>Status </li>
                            </ul>
                            {/* <p> Actions</p> */}
                        </div>
                        {InversePayerSubscribers
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
                                        <p className="Subscribers-items-details">{subscriber.status}</p>
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

export default PayerSubscribers;
