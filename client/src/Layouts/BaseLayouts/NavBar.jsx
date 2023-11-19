import { Link } from "react-router-dom"
import logo from "../../Assets/Imgs/sunu-tele-logo.svg"
import "../../Assets/Styles/MainLayouts/NavBarLandingPage.css"

function NavBar(props) {

  // logOut
  const handleLogout =(e) =>{
    e.preventDefault();
    // Supprimer le token et les informations de l'utilisateur du LocalStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Rediriger l'utilisateur vers la page de connexion ou une autre page appropriée
    // en fonction de votre application
    window.location.href = '/signin'; // Par exemple, redirige vers la page de connexion
  }



  return (
    <div className='container'>
      <nav className="navbar">
        <div>
          <img className="logo" src={logo} alt="logo" />
        </div>
        <nav className="navigation">
          <ul>
            <li>
              <Link to="/home" className="link" > {props.home} </Link>
            </li>
            <li>
              <Link to="/home/subscribers" className="link" > {props.subscriber} </Link>
            </li>
            <li>
              <Link to="/home/payments" className="link" > {props.comptablity} </Link>
            </li>
            <li>
              <Link to="/home/role" className="link" > {props.role} </Link>
            </li>
            {/* <li>
              <Link to="/home/payments/groupedByDate" className="link" > {props.historical} </Link>
            </li> */}
            <li>
              <Link to="/home/cartography" className="link" > {props.cartography} </Link>
            </li>
          </ul>
        </nav>
          {/* <div className="connection"> */}
            <button className="btn-connection">
              <Link to="/signin" className="btn-landing" onClick={handleLogout} > {props.connection} </Link>
            </button>
          {/* </div> */}
      </nav>

    </div>
  )
}

export default NavBar