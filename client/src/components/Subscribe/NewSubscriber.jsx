import { useState } from "react";
import Instance from "../../Services/Auth/Instance";
import config from "../../Services/config.json"
import { Link } from "react-router-dom";
// import "../../Assets/Styles/MainLayouts/Connection.css"
// import "../../Assets/Styles/MainLayouts/FormLayout.css"
import logo from "../../Assets/Imgs/sunu-tele-logo.svg"
// import mapData from "../../Services/FriendsHouses.json"
// import TestCarto from "../../Services/Auth/TestCarto"
// import mapData2 from "../../Services/Auth/TestCarto";

function NewSubscriber() {

  
  // const [mapData_, setMapData_] = useState(mapData2); // Charger les données JSON ici
  const [error, setError] = useState("");
  const [numbersMonth_, setNumbersMonth_] = useState("");
  const [subscriber, setSubscriber] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    inscriptionRules: "",
    paymentPriceSubscribe: "",
    numbersMonth: numbersMonth_,
    status: "payer",
    validity: new Date(),

  });
  const { name, address, phoneNumber,inscriptionRules, paymentPriceSubscribe } = subscriber;

  const onInputChange = (e) => {
    setSubscriber({ ...subscriber, [e.target.name]: e.target.value });
  };

  // nombre de mois a payé plus la gestion de la validité
  const handleNumbersMonthChange = (e) => {
    const newNumbersMonth = e.target.value;
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + parseInt(newNumbersMonth, 10));
    if (currentDate.getMonth() > 11) {
      currentDate.setFullYear(currentDate.getFullYear() + 1);
      currentDate.setMonth(currentDate.getMonth() - 12);
    }

    setNumbersMonth_(newNumbersMonth);

    setSubscriber({
      ...subscriber,
      numbersMonth: newNumbersMonth,
      validity: currentDate,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      Instance.post(`${config.api_url}/newSubscriber`, subscriber);
      // addNewData(coordoneesX)
      
      window.location = "/home/subscribers";
      // console.log(subscriber);

    } catch (error) {
      console.error("-+-+-+-Erreur lors de la connexion:", error);
      setError(error);
      console.log("+++++++");
    }
  };

  return (
    <div className='main-content-form'>
      <div className="container-form">
        <div className="logo-form">
          <Link to="/home/subscribers">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="form-connection form-layout">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="form-display">
              <div>
                <label htmlFor="name">Prénom & Nom</label>
                <input
                  className="input"
                  value={name}
                  name="name"
                  type="text"
                  onChange={(e) => onInputChange(e)}
                  required={true}
                />
              </div>
              <div>
                <label htmlFor="phoneNumber">Numéro de Téléphone</label>
                <input
                  className="input"
                  value={phoneNumber}
                  name="phoneNumber"
                  type="text"
                  onChange={(e) => onInputChange(e)}
                  required={true}
                />
              </div>
            </div>

            <div className="form-display">
              <div>
                <label htmlFor="adresse">Adresse</label>
                <input
                  className="input"
                  value={address}
                  name="address"
                  type="text"
                  onChange={(e) => onInputChange(e)}
                  required={true}
                />
              </div>
              <div>
                <label htmlFor="numbersMonth">Nombre de mois à payer à l'avance</label>
                <input
                  className="input"
                  type="number"
                  id="numbersMonth"
                  name="numbersMonth"
                  value={numbersMonth_}
                  min={1}
                  onChange={(e) => handleNumbersMonthChange(e)}
                  required
                />
              </div>
            </div>

            <div className="form-display">
              <div>
                <label htmlFor="inscriptionRules">Droit d'inscripstion</label>
                <input
                  className="input"
                  type="text"
                  id="inscriptionRules"
                  name="inscriptionRules"
                  value={inscriptionRules}
                  onChange={(e) => onInputChange(e)}
                  required
                />
              </div>
              <div>
                <label htmlFor="price"> Montant de  Mensualité</label>
                <input
                  className="input"
                  value={paymentPriceSubscribe}
                  name="paymentPriceSubscribe"
                  type="text"
                  onChange={(e) => onInputChange(e)}
                  required={true}
                />
              </div>
            </div>
            <button type="submit" className="validated">S'inscrire</button>
          </form>
        </div>
        {error && (
            <h1 style={{ color: "red" , position: "fixed", left:"10%",bottom: "10%" }}>{error.response.data.message}</h1>
          )}
      </div>
    </div>
  );
}

export default NewSubscriber;
