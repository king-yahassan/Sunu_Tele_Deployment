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
  // const [numbersMonth_, setNumbersMonth_] = useState("");
  const [payment, setPayment] = useState({
    date: new Date(),
    // numbersMonth: numbersMonth_,
    numbersMonth: "",
    validateSubscribe: "",
    subscriberAuthorName: "",
    subscriberAuthorPhoneNumber: "",
    subscriberAuthorPaymentPrice: "",
    comptaAdminPseudo: "",
  });

  const { id } = useParams();
  const [subscriber, setSubscriber] = useState({
    name: "",
    phoneNumber: "",
    address: "",
    validity: "",
    status: "",

  });

  useEffect(() => {
    fetchData();
  }, []);

  // recupération du user
  const fetchData = async () => {
    const result = await Instance.get(`${config.api_url}/showSubscriber/${id}`);
    setSubscriber(result.data.singleSubscriber);
  };

  // const { name, address, phoneNumber, paymentPriceSubscribe, status, validity } = subscriber;

  const { numbersMonth, validateSubscribe } = payment;

  const onInputChange = (e) => {
    setPayment({ ...payment, [e.target.name]: e.target.value });
};

  // sur cette fonction on recupére la validété actuelle de l'abonné en suite on le ralonge selon le nombre de mois qui payeras 
  // const handleNumbersMonthChange = (e) => {
  //   const newNumbersMonth = e.target.value;
  //   const currentDate = new Date(validity);
  //   currentDate.setMonth(currentDate.getMonth() + parseInt(newNumbersMonth, 10));
  //   if (currentDate.getMonth() > 11) {
  //     currentDate.setFullYear(currentDate.getFullYear() + 1);
  //     currentDate.setMonth(currentDate.getMonth() - 12);
  //   }

  //   setNumbersMonth_(newNumbersMonth);

  //   // Mise à jour de l'objet subscriber avec la nouvelle validity
  //   // setSubscriber({ ...subscriber, validity: currentDate });
  //   setSubscriber(prevSubscriber => ({ ...prevSubscriber, validity: currentDate }));


  //   setPayment({
  //     ...payment,
  //     numbersMonth: newNumbersMonth,
  //     validateSubscribe: currentDate,
  //   });
  // };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Instance.post(`${config.api_url}/newPayment/${id}`, payment);
      await Instance.put(`${config.api_url}/update/${id}`, subscriber);

      window.location = "/home/payments";
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      setError(error);
    }
  };

  return (
    <div className="main-content-form">
      {
        error ? null :
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
                    <input className="input" type="text" id="name" name="name" value={subscriber.name} readOnly required />
                  </div>
                  <div>
                    <label htmlFor="numberPhone">Numéro de Téléphone</label>
                    <input className="input" type="text" id="numberPhone" name="numberPhone" value={subscriber.phoneNumber} readOnly required />
                  </div>
                </div>

                <div className="form-display">
                  <div>
                    <label htmlFor="adresse">Adresse</label>
                    <input className="input" type="text" id="adresse" name="adresse" value={subscriber.address} readOnly required />
                  </div>
                  <div>
                    <label htmlFor="numbersMonth">Nombre de mois à payer</label>
                    <input className="input" type="number" id="numbersMonth" name="numbersMonth" value={numbersMonth}  onChange={(e) => onInputChange(e)} required />
                  </div>
                </div>

                <div className="form-display">
                  {/* <div>
                    <label htmlFor="adresse">Adresse</label>
                    <input className="input" type="text" id="adresse" name="adresse" value={subscriber.address} readOnly required />
                  </div> */}
                  <div style={{margin : "0 35%"}}>
                    <label htmlFor="numbersMonth">Validité</label>
                    <input className="input" type="Date" id="numbersMonth" name="validateSubscribe" value={validateSubscribe}  onChange={(e) => onInputChange(e)} required />
                  </div>
                </div>
                  
                <button type="submit" className="validated">
                  Payer
                </button>
              </form>
            </div>
            {error && (
              <h1 style={{ color: "red", position: "fixed", left: "10%", bottom: "10%" }}>{error.response.data.message}</h1>
            )}
          </div>
      }
    </div>
  );
}

export default NewPayment;