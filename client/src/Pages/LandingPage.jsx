import LayoutLandingAndHomePage from '../Layouts/MainLayouts/LayoutLandingAndHomePage'
import NavBar from '../Layouts/BaseLayouts/NavBar'
import "../Assets/Styles/MainLayouts/LayoutLandingAndHomePage.css"

function LandingPage() {
  return (
    <div className='landing-page main-content'>
        <NavBar connection ="Connexion" link="/signin" />
        <div className='LayoutLandingAndHomePage'>
          <LayoutLandingAndHomePage link="signin" />
        </div>
        
    </div>
  )
}

export default LandingPage