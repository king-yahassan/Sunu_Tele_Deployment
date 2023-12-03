import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Instance from "../../Services/Auth/Instance";
import config from "../../Services/config.json"
import { Link } from "react-router-dom";
import "../../Assets/Styles/MainLayouts/Connection.css"
import "../../Assets/Styles/MainLayouts/FormLayout.css"
import logo from "../../Assets/Imgs/sunu-tele-logo.svg"

const UpdateSubscriber = () => {
    const [error, setError] = useState("");
    const [subscriber, setSubscriber] = useState({
        name: "",
        address: "",
        phoneNumber: "",
        paymentPriceSubscribe: "",
        status: "",
    });

    const { id } = useParams();
    const { name, address, phoneNumber, paymentPriceSubscribe } = subscriber;

    // recupération du user
    const fetchData = async () => {
        const response = await Instance.get(`${config.api_url}/showSubscriber/${id}`);
        setSubscriber(response.data.singleSubscriber);
        // console.log(response.data.singleSubscriber);
    };
    useEffect(() => {
        fetchData();
    }, []);


    // update
    const onInputChange = (e) => {
        setSubscriber({ ...subscriber, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Instance.put(`${config.api_url}/update/${id}`, subscriber);
        window.location = "/home/subscribers";
    };

    return (
        <>
            <div className='main-content-form'>
                <div className="container-form">
                    <div className="logo-form">
                        <Link to="/home/subscribers">
                            <img src={logo} alt="logo" />
                        </Link>
                    </div>
                    <div className="form-connection form-layout">
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className="form-display">
                                <div>
                                    <label htmlFor="name">Prénom & Nom</label>
                                    <input
                                        className="input"
                                        value={name}
                                        name="name"
                                        type="text"
                                        onChange={(e) => onInputChange(e)}
                                        required={true}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phoneNumber">Numéro de Téléphone</label>
                                    <input
                                        className="input"
                                        value={phoneNumber}
                                        name="phoneNumber"
                                        type="text"
                                        onChange={(e) => onInputChange(e)}
                                        required={true}
                                    />
                                </div>
                            </div>

                            <div className="form-display">
                                <div>
                                    <label htmlFor="adresse">Adresse</label>
                                    <input
                                        className="input"
                                        value={address}
                                        name="address"
                                        type="text"
                                        onChange={(e) => onInputChange(e)}
                                        required={true}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="price"> Montant de  Mensualité</label>
                                    <input
                                        className="input"
                                        value={paymentPriceSubscribe}
                                        name="paymentPriceSubscribe"
                                        type="text"
                                        onChange={(e) => onInputChange(e)}
                                        required={true}
                                    />
                                </div>
                                
                            </div>
                            <button type="submit" className="validated">Editer</button>
                        </form>
                    </div>
                </div>
                {error && <h1 style={{ color: "red" }}>{error.response.data.message}</h1>}
            </div>

        </>

    )
}
export default UpdateSubscriber;