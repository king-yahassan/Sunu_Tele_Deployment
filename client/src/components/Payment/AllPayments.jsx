import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../DataContext";
// import "../../Assets/Styles/Subscribers/AllSubscribers.css";
import "../../Assets/Styles/Payments/Payments.css"
import show from "../../Assets/Imgs/icon-show.svg"

function AllPayments() {
    const { payments } = useContext(DataContext);
    const [search, setSearch] = useState("")
// console.log(payments);
    const formattedDate = (_date) => {
        const dateObject = new Date(_date);
        return dateObject.toLocaleDateString('fr-FR')
    }
    const InversePayments = [...payments].reverse();

    //   console.log(formattedDate("2023/10/12"));
    return (
        <div className="all-payments">
            <div className="search_">
                <input
                    type="text"
                    placeholder="Search..."
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                />
            </div>
            <div className="payments_">
                <div className="payments-items">
                    <h4>Date </h4>
                    <h4>Validité </h4>
                    <h4>Nbr de mois payés</h4>
                    <h4>Nom </h4>
                    <h4>Téléphone</h4>
                    <h4>Mensualité</h4>
                    <h4>Paiement effectué par </h4>
                    {/* <h4>Actions </h4> */}
                </div>
                <React.Fragment>
                    <div className="payments">
                        {InversePayments.filter((payment) =>
                            `${payment.subscriberAuthorName} ${payment.subscriberAuthorPaymentPrice} ${payment.date}`
                                .toLowerCase()
                                .includes(`${search}`))
                            .map((payment, index) => (
                                <div key={index} className="payments-items" >
                                    <p >{formattedDate(payment.date)}</p>
                                    <p >{formattedDate(payment.validateSubscribe)}</p>
                                    <p >{payment.numbersMonth}</p>
                                    <p >{payment.subscriberAuthorName}</p>
                                    <p >{payment.subscriberAuthorPhoneNumber}</p>
                                    <p >{payment.subscriberAuthorPaymentPrice}XOF</p>
                                    <p >{payment.comptaAdminPseudo}</p>
                                    <div className="actions">

                                        {/* <Link
                                            // className=" btn-action"
                                            to={`/home/subscribers/showSubscriber/${payment._id}`}
                                        >
                                            <img src={show} alt="payment" />
                                        </Link> */}

                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </React.Fragment>
            </div >
            {/* <MonthHistory /> */}
            
        </div >
        
    )
}

export default AllPayments