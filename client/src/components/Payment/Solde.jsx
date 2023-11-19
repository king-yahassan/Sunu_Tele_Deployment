import { useContext, useState, useEffect } from "react";
import { DataContext } from "../DataContext";
import Instance from "../../Services/Auth/Instance";
import config from "../../Services/config.json"
import "../../Assets/Styles/MainLayouts/HomePage.css"
import { Link, useParams } from "react-router-dom";


function Solde() {
  const { payerSubscribers } = useContext(DataContext);
  const { unpaidSubscribers } = useContext(DataContext);
  const [groupPaymentsByDate, setGroupPaymentsByDate] = useState([]);
  const [error, setError] = useState("");


  // ************************************************************* //
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();

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

  // *************************************************************** //

  return (
    <div className="compta">
      <div className="solde">
        <div className="solde-title">
          <h1 className="text-center">Solde Actuel</h1>
          <p>{formattedDate}</p>
        </div>

        {reverseGroupPaymentsByDate.length > 0 && (
          <div className="sum">
            <h2>{calculatePaymentSum(reverseGroupPaymentsByDate[0].payments)} XOF</h2>
          </div>
        )}

      </div>
      
      <div className="subcribers-compta">
        <div className="compta-details paid-subscribers">
          <h1>{payerSubscribers.length}</h1>
          <p>Le nombres d'abonnés qui ont payés le mois en cours</p>
          <Link className="link-compta" to="/home/subscribers"> Voir Plus...</Link>
        </div>
        <div className="compta-details unpaid-subscribers">
          <h1>{unpaidSubscribers.length} </h1>
          <p>Le nombres d'abonnés qui n'ont pas payés le mois en cours</p>
          <Link className="link-compta" to="/home/subscribers"> Voir Plus...</Link>
        </div>
        <div className="compta-details invalid-subscribers">
          <h1>4 </h1>
          <p>Le nombres d'abonnés qui ont plus de 2 mois à payer </p>
          <Link className="link-compta" to="/home/subscribers"> Voir Plus...</Link>
        </div>

      </div>
    </div>

  )
}

export default Solde;