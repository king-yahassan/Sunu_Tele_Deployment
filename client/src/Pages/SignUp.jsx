import { useState } from "react";
import Instance from "../Services/Auth/Instance";
import config from "../Services/config.json";
import "../Assets/Styles/MainLayouts/Connection.css";
import logo from "../Assets/Imgs/sunu-tele-logo.svg";

const SignUp = () => {
  const [data, setData] = useState({
    pseudo: "",
    email: "",
    password: "",
    role: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${config.api_url}/signup`;

      const { data: response } = await Instance.post(url, data);
      // console.log(response.message);
      window.location = "/signIn";
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      setError(error);
    }
  };
  return (
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
                value={data.pseudo}
                onChange={handleChange}
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
                value={data.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Mot de passe</label>
              <input
                className="input"
                type="password"
                id="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                required
              />
            </div>
            <div>
            <label htmlFor="role">Statut de l'Admin</label>
              <select
                className="input"
                name="role"
                onChange={handleChange}
                value={data.role}
              >
                <option value="">Role</option>
                <option value="SuperAdmin">SuperAdmin</option>
                <option value="SubscriberAdmin">SubscriberAdmin</option>
                <option value="ComptaAdmin">ComptaAdmin</option>
              </select>
            </div>
            <button type="submit" className="btn-form-connection btn-signUp">S'inscrire</button>
          </form>;


        </div>
        <div>
          {error && (
            <h1 style={{ color: "red" }}>{error.response.data.message}</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;

