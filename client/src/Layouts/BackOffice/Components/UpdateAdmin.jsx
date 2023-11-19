import { useState, useEffect } from "react";
import Instance from "../../../Services/Auth/Instance";
import config from "../../../Services/config.json";
import "../../../Assets/Styles/MainLayouts/Connection.css";
import logo from "../../../Assets/Imgs/sunu-tele-logo.svg";


import { useParams } from "react-router-dom";


function UpdateAdmin() {

  const [admins, setAdmins] = useState({
    pseudo: "",
    email: "",
    password: "",
    role: "",
  });
  const [error, setError] = useState("");
  const { id } = useParams();

const {pseudo,email,role} = admins


    // recupération du user
    const fetchData = async () => {
      const response = await Instance.get(`${config.api_url}/showAdmin/${id}`);
      setAdmins(response.data.singleUser);
      // console.log(response.data.singleSubscriber);
  };

  useEffect(() => {
    fetchData();
}, []);

  const handleChange = (e) => {
    setAdmins({ ...admins, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      Instance.put(`${config.api_url}/updateAdmin/${id}`, admins);
      window.location = "/home/role" ;
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      setError(error);
    }
  }
  

  return (
    <div>
    <div className="main-content-from">
      <div className="container-form">
        <div className="logo-form">
          <img src={logo} alt="logo" />
        </div>
        <div className="form-connection signUp">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="pseudo">Pseudo</label>
              <input
                className="input"
                type="text"
                id="pseudo"
                name="pseudo"
                value={pseudo}
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                className="input"
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            {/* <div>
              <label htmlFor="password">Mot de passe</label>
              <input
                className="input"
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => handleChange(e)}
                required
              />
            </div> */}
            <div>
            <label htmlFor="role">Statut de l'Admin</label>
              <select
                className="input"
                name="role"
                onChange={(e) => handleChange(e)}
                value={role}
              >
                <option value="">Role</option>
                <option value="SuperAdmin">SuperAdmin</option>
                <option value="SubscriberAdmin">SubscriberAdmin</option>
                <option value="ComptaAdmin">ComptaAdmin</option>
              </select>
            </div>
            <button type="submit" className="btn-form-connection btn-signUp">Editer</button>
          </form>

        </div>
        <div>
          {error && (
            <h1 style={{ color: "red" }}>{error.response.data.message}</h1>
          )}
        </div>
      </div>
    </div>


    </div>
  )
}

export default UpdateAdmin