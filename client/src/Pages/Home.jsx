import SignOut from "./SignOut";
import NavBar from "../Layouts/BaseLayouts/NavBar";
import Solde from "../components/Payment/Solde";
import { Link, Outlet } from "react-router-dom";
import Footer from "../Layouts/BaseLayouts/Footer";
import LayoutLandingAndHomePage from "../Layouts/MainLayouts/LayoutLandingAndHomePage";
import "../Assets/Styles/MainLayouts/HomePage.css"
import cartography1 from "../Assets/Imgs/cartographie1.png"
import cartography2 from "../Assets/Imgs/cartographie2.png"
import img1 from "../Assets/Imgs/rtts.png"
import img2 from "../Assets/Imgs/2sTV_logo 1.png"
import img3 from "../Assets/Imgs/tfm 1.png"
import img4 from "../Assets/Imgs/sentv-logo 1.png"
import img5 from "../Assets/Imgs/lampfall 1.png"
import img6 from "../Assets/Imgs/mourchide_tv 1.png"
import img7 from "../Assets/Imgs/itv 1.png"
import img8 from "../Assets/Imgs/walf.png"
import img9 from "../Assets/Imgs/being3 1.png"
import img10 from "../Assets/Imgs/Novelas_TV_-_Logo (1) 1.png"
import img11 from "../Assets/Imgs/canal + 1.png"
import img12 from "../Assets/Imgs/dessinAnimé 1.png"
import img13 from "../Assets/Imgs/formule-canal+1.png"
import img14 from "../Assets/Imgs/being-formule.png"
import PayerSubscribers from "../components/Subscribe/PayerSubscribers";

function Home() {
  return (
    <div className="home-page">
      <div className="about-us">
        <div className="navbar">
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
        <div className="aboutUs-home">
          <LayoutLandingAndHomePage />
        </div>
      </div>
      <div className="compatibility-home">
        <Solde />
      </div>
      <div className="validsubscribers">
        {/* <PayerSubscribers /> */}
      </div>
      <div className="cartography-home">
        <div className="cartography-title">
          <h1 className="text-center">Cartographie de la zone de Couverture</h1>
          <Link to="cartography" className="link"> Voir Plus...</Link>
        </div>
        <img src={cartography1} alt="cartography1" />
        <img src={cartography2} alt="cartography2" />
      </div>
      <div className="imgs-home">
        <img className="big-logo-home" src={img1} alt="img-home" />
        <img src={img3} alt="img-home" />
        <img className="big-logo-home" src={img2} alt="img-home" />
        <img src={img4} alt="img-home" />
        <img className="big-logo-home" src={img6} alt="img-home" />
        <img src={img5} alt="img-home" />
        <img src={img8} alt="img-home" />
        <img src={img7} alt="img-home" />
        <img src={img9} alt="img-home" />
        <img className="big-logo-home" src={img10} alt="img-home" />
        <img src={img11} alt="img-home" />
        <img src={img12} alt="img-home" />
        <img src={img13} alt="img-home" />
        <img src={img14} alt="img-home" />

      </div>
      <div>

        <SignOut />
        <Footer />
      </div>
      <Outlet />

    </div>
  );
}
/* Un <Outlet> doit être utilisé dans les éléments de route parent pour rendre leurs éléments de route enfant.
      Cela permet à l'interface utilisateur imbriquée de se présenter lorsque les itinéraires pour enfants sont rendus.
      Si la route parent correspond exactement, elle rendra une route d'index enfant ou rien s'il n'y a pas de route d'index. */

export default Home;
