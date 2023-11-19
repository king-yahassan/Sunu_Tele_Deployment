
function SignOut() {
  const handleLogout =(e) =>{
    e.preventDefault();
    // Supprimer le token et les informations de l'utilisateur du LocalStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Rediriger l'utilisateur vers la page de connexion ou une autre page appropriée
    // en fonction de votre application
    window.location.href = '/'; // Par exemple, redirige vers la page de connexion

  }
  
  return (
    <div>SignOut
      <button className="btnLogOut" onClick={handleLogout}>
				Logout
			</button>
    </div>
  )
}

export default SignOut ;