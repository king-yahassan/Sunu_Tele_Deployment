import { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from '../BaseLayouts/NavBar'
import MonthHistory from "../../components/Historical/MonthHistory"
import AllPayments from '../../components/Payment/AllPayments'
import "../../Assets/Styles/Payments/Payments.css"

function Payments() {
  const [activeComponent, setActiveComponent] = useState("allPayments");

  // Une fonction pour changer le composant actif lorsque vous cliquez sur un bouton
  const handleButtonClick = (componentName) => {
    setActiveComponent(componentName);
  };
  return (
    <div>
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
      </div>
      <div className="wrapper-payments">
        <div className='navbar-payments'>
          <Link className='link-payments'   >
            <h1 className={activeComponent === "allPayments" ? "active-button" : "inactive-button"} onClick={() => handleButtonClick('allPayments')}>Tous les paiements</h1>
          </Link>
          <Link className='link-payments'  >
            <h1 className={activeComponent === "monthHistory" ? "active-button" : "inactive-button"} onClick={() => handleButtonClick('monthHistory')} >Historique du mois</h1>
          </Link>
        </div>
        <div className="child-wrapper-payments">
          {activeComponent === "monthHistory" && <MonthHistory />}
          {activeComponent === "allPayments" && <AllPayments />}

        </div>
      </div>
    </div>
  )
}

export default Payments