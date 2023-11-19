import logo from "../../Assets/Imgs/sunu-tele-logo.svg"
import "../../Assets/Styles/MainLayouts/Connection.css"
import "../../Assets/Styles/MainLayouts/FormLayout.css"

function FormLayout() {

    return (
        <div className='main-content-form'>
            <div className="container-form">
                <div className="logo-form">
                    <img src={logo} alt="logo" />
                </div>
                <div className="form-connection form-layout">
                    <form >
                        <div className="form-display">
                            <div>
                                <label htmlFor="name">Prénom & Nom</label>
                                <input
                                    className="input"
                                    type="text"
                                    id="name"
                                    name="name"
                                    // value={data.pseudo}
                                    // onChange={props.handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="numberPhone">Numéro de Téléphone</label>
                                <input
                                    className="input"
                                    type="text"
                                    id="numberPhone"
                                    name="numberPhone"
                                    // value={data.pseudo}
                                    // onChange={props.handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-display">
                            <div>
                                <label htmlFor="adresse">Adresse</label>
                                <input
                                    className="input"
                                    type="text"
                                    id="adresse"
                                    name="adresse"
                                    // value={data.pseudo}
                                    // onChange={props.handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="numbersMonth">Nombre de mois à payer à l'avance</label>
                                <input
                                    className="input"
                                    type="number"
                                    id="numbersMonth"
                                    name="numbersMonth"
                                    // value={data.pseudo}
                                    // onChange={props.handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-display">
                            <div>
                                <label htmlFor="pseudo">Droit d'inscripstion</label>
                                <input
                                    className="input"
                                    type="text"
                                    id="pseudo"
                                    name="pseudo"
                                    // value={data.pseudo}
                                    // onChange={props.handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="price"> Montant de  Mensualité</label>
                                <input
                                    className="input"
                                    type="number"
                                    id="price"
                                    name="price"
                                    // value={data.pseudo}
                                    // onChange={props.handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="validated">S'inscrire</button>
                        {/* <button type="submit" className="validated">S'inscrire</button> */}
                    </form>
                </div>
            </div>

        </div>
    )
}

export default FormLayout