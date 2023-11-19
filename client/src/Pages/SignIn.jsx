import { useState } from "react";
import { Link } from "react-router-dom";
import Instance from "../Services/Auth/Instance";
import config from "../Services/config.json";
import "../Assets/Styles/MainLayouts/Connection.css";
import logo from "../Assets/Imgs/sunu-tele-logo.svg";

const SignIn = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const url = `${config.api_url}/signin`;
            const { data: response } = await Instance.post(url, data);
            // console.log(response);
            // Le backend doit renvoyer le token JWT dans la réponse
            // Stocker le token et les informations de l'utilisateur dans le LocalStorage
            const user = response.user;

            if (user) {
                setError("");
                window.location = "/home";
                localStorage.setItem("token", response.token);
                localStorage.setItem("user", JSON.stringify(user));
            }
        } catch (error) {
            console.error("------Erreur lors de la connexion:", error);
            setError(error);
        }
    };

    return (
        <div className="main-content-form">
            <div className="container-form">
                <div className="logo-form">
                    <img src={logo} alt="logo" />
                </div>
                <div className="form-connection signIn">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input
                                className="input"
                                type="email"
                                name="email"
                                id="email"
                                value={data.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Mot de passe:</label>
                            <input
                                className="input"
                                type="password"
                                name="password"
                                id="password"
                                value={data.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn-form-connection" id="btn-signin">Se connecter</button>
                    </form>
                    {/* <div className="signup">
                        <h1> Vous êtes  <br />Nouveau <br />??? </h1>
                        <button className="btn-form-connection" >
                            <Link className="link" to="/signUp"> Sign Up</Link>
                        </button>
                    </div> */}
                </div>
                <div>
                    {
                        error &&
                        (<h1 style={{ color: "red" }}>{error.response.data.message}</h1>)
                    }
                </div>
            </div>
        </div>
    );
};

export default SignIn;
