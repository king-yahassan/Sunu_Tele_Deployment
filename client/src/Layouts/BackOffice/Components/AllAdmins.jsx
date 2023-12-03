import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Instance from "../../../Services/Auth/Instance";
import config from "../../../Services/config.json"
import NavBar from "../../BaseLayouts/NavBar";
import edit from "../../../Assets/Imgs/icon-edit.svg"
// import show from "../../../Assets/Imgs/icon-show.svg"
import deleteIcon from "../../../Assets/Imgs/icon_delete.svg"

// Ce composant hérite sur le style du fichier PaymentsForSubscriber.css 
function AllAdmins() {
    const [admins, setAdmins] = useState([]);
    const [search, setSearch] = useState("");
    const [error, setError] = useState("");



    const fetchData = async () => {

        try {
            const result = await Instance.get(`${config.api_url}/admins`);
            setAdmins(result.data.allUsers);
        } catch (error) {
            console.error("Erreur lors de la connexion:", error);
            setError(error);
        }

    };
    // console.log(subscriber);

    useEffect(() => {
        fetchData();
    }, []);

    //deleted admin
    // async function deleteAdmin(id) {
    //     await Instance.delete(`${config.api_url}/removeAdmin/${id}`)
    //         .then((res) => {
    //             return res;
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    //     window.location.reload();
    // }

    async function deleteAdmin(id) {
        var confirmation = confirm("Voulez-vous vraiment supprimer cet Admin ?");
    
        if (confirmation) {
            try {
                await Instance.delete(`${config.api_url}/removeAdmin/${id}`)
                window.location.reload();
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("Suppression annulée");
        }
    }
    

    return (
        <div>

            <div>
                <NavBar
                    connection="Logout"
                    home="Home"
                    subscriber="Abonnées"
                    comptablity="Comptablité"
                    role="Role"
                    historical="Historique"
                    cartography="Cartographie"
                />
                {
                    error ? null :
                        <div className="wrapper">
                            <div className="left child-wrapper">
                                <div>
                                    <h4>Admins</h4>
                                    <Link to="/home/signUp" className="link-newadmin">
                                        Ajouter un Admin
                                    </Link>
                                </div>
                            </div>
                            <div className="right child-wrapper">
                                <div className="right-item1">
                                    <div className="search-payments-subscriber">
                                        <input
                                            type="text"
                                            placeholder="Search..."
                                            onChange={(e) => {
                                                setSearch(e.target.value);
                                            }}
                                        />
                                        <div id="min-navbar-admins">
                                            <ul className="items">
                                                <li>Pseudo </li>
                                                <li>Email </li>
                                                <li>Role </li>
                                                <li>Actions </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="right-item2">
                                    {(
                                        admins
                                            .filter((admin) =>
                                                `${admin.pseudo} ${admin.role}`
                                                    .toLowerCase()
                                                    .includes(`${search}`)
                                            )
                                            .map((admin, index) => (
                                                <div key={index} className="items-admins">
                                                    <div> {admin.pseudo} </div>
                                                    <div> {admin.email} </div>
                                                    <div> {admin.role} </div>

                                                    <div className="actions_">
                                                        <Link to={`/home/role/updateAdmin/${admin._id}`} >
                                                            <img src={edit} alt="adminedit" id="btn-actions" />
                                                        </Link>
                                                        <img src={deleteIcon} alt="payment" id="btn-actions" onClick={() => deleteAdmin(admin._id)} />

                                                    </div>
                                                </div>

                                            ))
                                    )}
                                </div>
                            </div>
                        </div>
                }
                {error && (
                    <h1 style={{ color: "red", position: "fixed", left: "30%", bottom: "50%" }}>{error.response.data.message}</h1>
                )}
            </div>
        </div>
    )
}

export default AllAdmins