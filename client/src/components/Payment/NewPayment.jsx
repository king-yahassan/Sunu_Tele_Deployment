import Instance from "../../Services/Auth/Instance";
import config from "../../Services/config.json";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "../../Assets/Styles/MainLayouts/Connection.css";
import "../../Assets/Styles/MainLayouts/FormLayout.css";
import logo from "../../Assets/Imgs/sunu-tele-logo.svg";

function NewPayment() {

  const [error, setError] = useState("");
  // recupération du user
  const { id } = useParams();
  const [subscriber, setSubscriber] = useState({
    name: "",
    phoneNumber: "",
    address: "",
    validity: "",
    paymentPriceSubscribe: "",
    status: "",

  });

  const { name, address, phoneNumber, paymentPriceSubscribe, status, validity } = subscriber;


  const fetchData = async () => {
    const result = await Instance.get(`${config.api_url}/showSubscriber/${id}`);
    // console.log(result.data.singleSubscriber);
    setSubscriber(result.data.singleSubscriber);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // *************end show user ********************

  const formattedDate = (_date) => {
    const dateObject = new Date(_date);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Ajoute un zéro devant si le mois est sur un seul chiffre
    const day = String(dateObject.getDate()).padStart(2, '0'); // Ajoute un zéro devant si le jour est sur un seul chiffre

    return `${year}-${month}-${day}`;
  }

  //new payment 
  const [numbersMonth_, setNumbersMonth_] = useState("");
  const [validateDate, setValidateDate] = useState(new Date());
  const [payment, setPayment] = useState({
    date: new Date(),
    numbersMonth: numbersMonth_,
    // numbersMonth: "",
    validateSubscribe: validateDate,
    subscriberAuthorName: "",
    subscriberAuthorPhoneNumber: "",
    subscriberAuthorPaymentPrice: "",
    comptaAdminPseudo: "",
  });


  const handleSubmit = async (e) => {
    e.preventDefault();

    const paymentData = {
      date: new Date(),
      numbersMonth: numbersMonth_,
      validateSubscribe: validateDate,
      // ... autres données nécessaires pour le paiement
    };

    try {
      await Instance.post(`${config.api_url}/newPayment/${id}`, paymentData);
      console.log("Données de paiement envoyées avec succès.");

      // Mise à jour de la validité sur l'API du user
      const updatedSubscriber = { ...subscriber, validity: validateDate };
      await Instance.put(`${config.api_url}/update/${id}`, updatedSubscriber);
      console.log("Validité mise à jour sur l'API.");

      window.location = "/home/payments";
    } catch (error) {
      console.error("Erreur lors du paiement ou de la mise à jour de la validité :", error);
    }
  };

  const handleNumbersMonthChange = async (e) => {
    let newNumbersMonth = parseInt(e.target.value, 10);
    const currentDate = new Date(subscriber.validity); // Utilisation de la validité actuelle récupérée depuis l'API

    // Calcul de la nouvelle validité
    // eslint-disable-next-line use-isnan

    isNaN(newNumbersMonth) ? window.location.reload() : newNumbersMonth
    const newValidity = new Date(currentDate);
    newValidity.setMonth(newValidity.getMonth() + newNumbersMonth);

    var confirmation = confirm(`Voulez-vous faire un payment de ${newNumbersMonth} mois   ? `);
    if (confirmation) {
      setNumbersMonth_(newNumbersMonth);
      setValidateDate(newValidity);
      // Mettre à jour l'état local avec la nouvelle validité
      setSubscriber(prevSubscriber => ({
        ...prevSubscriber,
        validity: newValidity,
      }));
    }



  };





  return (
    <div className="main-content-form">
      {
        error ? <h1 style={{ color: "red", position: "fixed", left: "10%", bottom: "10%" }}>{error.response.data.message}</h1>
          :
          <div className="container-form">
            <div className="logo-form">
              <Link to="home">
                <img src={logo} alt="logo" />
              </Link>
            </div>
            <div className="form-connection form-layout">
              <form onSubmit={handleSubmit}>
                <div className="form-display">
                  <div>
                    <label htmlFor="name">Prénom & Nom</label>
                    <input className="input" type="text" id="name" name="name" value={name} readOnly required />
                  </div>
                  <div>
                    <label htmlFor="numberPhone">Numéro de Téléphone</label>
                    <input className="input" type="text" id="numberPhone" name="numberPhone" value={phoneNumber} readOnly required />
                  </div>
                </div>

                <div className="form-display">
                  <div>
                    <label htmlFor="adresse">Adresse</label>
                    <input className="input" type="text" id="adresse" name="adresse" value={address} readOnly required />
                  </div>

                  <div>
                    <label htmlFor="adresse">Mensualité</label>
                    <input className="input" type="text" id="paymentPriceSubscribe" name="paymentPriceSubscribe" value={`${paymentPriceSubscribe} XOF`} readOnly required />
                  </div>
                </div>

                <div className="form-display">
                  <div>
                    <label htmlFor="numbersMonth">Nombre de mois à payer</label>
                    <input className="input" type="text" id="numbersMonth" name="numbersMonth_" min={1} value={numbersMonth_} onChange={(e) => handleNumbersMonthChange(e)} required />
                  </div>

                  <div>
                    <label htmlFor="numbersMonth">Validité Actuelle</label>
                    <input className="input" type="date" id="numbersMonth" name="validateSubscribe" value={formattedDate(validity)} required />
                  </div>
                </div>

                <button type="submit" className="validated">
                  Payer
                </button>
              </form>
            </div>

          </div>
      }
    </div>
  );
}

export default NewPayment;