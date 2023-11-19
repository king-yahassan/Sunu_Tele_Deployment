import { useEffect, useState } from "react";
import Instance from "../../Services/Auth/Instance";
import config from "../../Services/config.json";
import { Link } from "react-router-dom";
import "../../Assets/Styles/Payments/MonthHistory.css";

function MonthHistory() {
    // État pour stocker les paiements groupés par date
    const [groupPaymentsByDate, setGroupPaymentsByDate] = useState([]);
    const [search, setSearch] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        // Appel de la fonction pour récupérer les paiements groupés
        fetchDataPaymentsGrouped();
    }, []);

    // Fonction pour récupérer les paiements groupés
    const fetchDataPaymentsGrouped = async () => {
        try {
            const result = await Instance.get(`${config.api_url}/payments/groupedByDate`);
            setGroupPaymentsByDate(result.data.groupedPayments);
        } catch (error) {
            console.error("-+-+-+-Erreur lors de la connexion:", error);
            setError(error);
        }
    };

    // Fonction pour formater une date en français
    const formattedDate = (_date) => {
        const dateObject = new Date(_date);
        return dateObject.toLocaleDateString("fr-FR");
    };

    // Fonction pour calculer la somme des paiements d'un groupe
    const calculatePaymentSum = (payments) => {
        const arrNbrMnth = payments.map((pay) => +(pay.numbersMonth));
        const arrPrice = payments.map((pay) => +(pay.subscriberAuthorPaymentPrice));
        return arrNbrMnth
            .map((element1, index) => element1 * arrPrice[index])
            .reduce((acc, currentValue) => acc + currentValue, 0);
    };
    
    // renverser l'ordre d'affichage du plus récent
    const reverseGroupPaymentsByDate = [...groupPaymentsByDate].reverse()

    return (
        <div className="month-history">
            {reverseGroupPaymentsByDate.map((group) => (
                <div key={group._id.year + group._id.month + group._id.day} className="wrapper-month-history">
                    <div className="resume-payment">
                        {/* Utilisation de la fonction pour calculer la somme des paiements du groupe */}
                        <h1> Solde : {calculatePaymentSum(group.payments)} XOF </h1>
                        <h2>Total Payments : {group.totalPayments}</h2>
                        <h3>Date : {`${group._id.year}-${group._id.month}-${group._id.day}`}</h3>
                    </div>
                    <ul className="title">
                        <li scope="col">Date</li>
                        <li scope="col">validaté</li>
                        <li scope="col">numbersMonth</li>
                        <li scope="col">Name</li>
                        <li scope="col">PhoneNumber</li>
                        <li scope="col">PaymentPrice</li>
                        <li scope="col">comptaAdminPseudo</li>
                    </ul>
                    <div className="items-month-history">
                        {group.payments.map((payment) => (
                            <ul key={payment._id} className="value">
                                <li>{formattedDate(payment.date)}</li>
                                <li>{formattedDate(payment.validateSubscribe)}</li>
                                <li>{payment.numbersMonth}</li>
                                <li>{payment.subscriberAuthorName}</li>
                                <li>{payment.subscriberAuthorPhoneNumber}</li>
                                <li>{payment.subscriberAuthorPaymentPrice} XOF</li>
                                <li>{payment.comptaAdminPseudo}</li>
                            </ul>
                        ))}
                    </div>
                    <h1 className="separation">***</h1>
                </div>
            ))}
            {error && <p>{error}</p>}
        </div>
    );
}

export default MonthHistory;