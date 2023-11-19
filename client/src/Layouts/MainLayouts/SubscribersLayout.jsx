import logo from "../../Assets/Imgs/sunu-tele-logo.svg";
import { Link } from "react-router-dom";
import "../../Assets/Styles/Subscribers/SubscribersLayout.css";
import coolIcon from "../../Assets/Imgs/cool-emoji.svg";
import AllSubscribers from "../../components/Subscribe/AllSubscribers";
import NavBar from "../BaseLayouts/NavBar";
import PayerSubscribers from "../../components/Subscribe/PayerSubscribers";
import UnpaidSubscribers from "../../components/Subscribe/UnpaidSubscribers";
import { useContext, useState } from "react";
import { DataContext } from "../../components/DataContext";


const SubscribersLayout = () => {
  const [activeComponent, setActiveComponent] = useState("allSubscribers");
  const { payerSubscribers } = useContext(DataContext);
  const { unpaidSubscribers } = useContext(DataContext);
  const { subscribers } = useContext(DataContext);

  // Une fonction pour changer le composant actif lorsque vous cliquez sur un bouton
  const handleButtonClick = (componentName) => {
    setActiveComponent(componentName);
  };


  return (
    <div className="subscribers-layout">
      <NavBar
        connection="Logout"
        home="Home"
        subscriber="Abonnées"
        comptablity="Comptablité"
        role="Role"
        historical="Historique"
        cartography="Cartographie"
      />
      <div className="subscriber-main-layout">
        <div className="sidebar-subscriber">
          <div className="logo-sidebar">
            <h1>
              Nos Chers <br /> Abonnés <br /> <img src={coolIcon} alt="" />{" "}
            </h1>
          </div>
          <nav className="navigation-sidebar">
            <ul>
              <li >
                <Link to="/home/subscribers/newSubscriber" id="new-subscriber">
                  Nouveau Abonné
                </Link>
              </li>
              <li className="abonne-payer">
                <button onClick={() => handleButtonClick('payerSubscribers')} className={activeComponent === "payerSubscribers" ? "active-button-subscriber-payer" : "link-subscribers"}>
                  Abonnés Payés
                </button>
              </li>
              <li className="abonne-unpaid">
                <button onClick={() => handleButtonClick('unpaidSubscribers')} className={activeComponent === "unpaidSubscribers" ? "active-button-subscriber-unpaid" : "link-subscribers"}>
                  Abonnés Impayés
                </button>
              </li>
              <li className="abonne-invalid">
                <button onClick={() => handleButtonClick('invalidSubscribers')} className={activeComponent === "invalidSubscribers" ? "active-button-subscriber-invalid" : "link-subscribers"}>
                  Abonnés Invalides
                </button>
              </li>
              <li className="allSubscribers">
                <button onClick={() => handleButtonClick('allSubscribers')} className={activeComponent === "allSubscribers" ? "active-button-subscriber-allSubscribers" : "link-subscribers"}>
                  Liste des abonnés
                </button>
              </li>
            </ul>
          </nav>
        </div>

        <div className="subscribers_details">
          <div className="main-layout-subscribers-details paid_subscribers">
            <div className="vertical-line vertical-line-paid"></div>
            <div className="subscribers-nmbr-desc">
              <h1 id="paid-nmbr">{payerSubscribers.length}</h1>
              <p>Le nombres d'abonnés qui ont payés le mois en cours</p>
            </div>
          </div>

          <div className="main-layout-subscribers-details unpaid_subscribers">
            <div className="vertical-line vertical-line-unpaid"></div>
            <div className="subscribers-nmbr-desc">
              <h1 id="unpaid-nmbr">{unpaidSubscribers.length}</h1>
              <p>Le nombres d'abonnés qui n'ont pas payés le mois en cours</p>
            </div>
          </div>

          <div className="main-layout-subscribers-details invalid_subscribers">
            <div className="vertical-line vertical-line-invalid"></div>
            <div className="subscribers-nmbr-desc">
              <h1 id="invalid-nmbr">4</h1>
              <p>Le nombres d'abonnés qui ont plus de 2 mois à payer </p>
            </div>
          </div>

          <div className="main-layout-subscribers-details list_subscribers">
            <div className="vertical-line vertical-line-list"></div>
            <div className="subscribers-nmbr-desc">
              <h1 id="list-nmbr">{subscribers.length}</h1>
              <p>L'ensemble de tous les abonnées du réseau</p>
            </div>
          </div>
        </div>
    
      </div>
      
      {/* <div className="subscribers-names"></div> */}
      <div className="members">
        {/* <AllSubscribers /> */}
        {activeComponent === 'allSubscribers' && <AllSubscribers />}
        {activeComponent === 'payerSubscribers' && <PayerSubscribers />}
        {activeComponent === 'unpaidSubscribers' && <UnpaidSubscribers />}

        {/* <PayerSubscribers /> */}
        {/* <UnpaidSubscribers /> */}
      </div>
    </div>
  );
}

export default SubscribersLayout;
