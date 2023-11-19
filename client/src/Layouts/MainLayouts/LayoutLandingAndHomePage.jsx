import { Link } from 'react-router-dom'
import "../../Assets/Styles/MainLayouts/LayoutLandingAndHomePage.css";
import homeImg from "../../Assets/Imgs/home-img.png"
// import NavBarLandingPage from './NavBarLandingPage';

function LayoutLandingAndHomePage(props) {
    return (
        <div className='landing-page'>
            <div className="content">
                <div className="bloc-home left">
                    <h1 className="title-home">SUNU Télé</h1>
                    <h5 className="about-us-home">
                        Optez <br /> Pour le meilleur  <br /> Des abonnements <br /> De chaines télévisées ! ! !
                    </h5>
                    <p className="description-home">
                        + 250 chaînes en qualité 4K/Full HD/HD et des films et séries VOD
                        illimités, toutes les émissions de télévision et les événements
                        sportifs que vous aimez en un seul abonnement, avec diffusion
                        multi-écrans et sans mise en mémoire tampon , Pas de blocage ni de
                        bégaiement. Ne manquez jamais les événements et les spectacles les
                        plus attendus !!!
                    </p>
                    <button className="btn">
                        <Link to={props.link}> Abonnez Vous Maintenant</Link>
                    </button>
                </div>
                <div className="bloc-home right">
                    <img src={homeImg} alt="home-img" />
                </div>
            </div>
        </div>
    );
}

export default LayoutLandingAndHomePage;
