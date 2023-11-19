import { useState, useEffect } from "react";
import Instance from "../../../Services/Auth/Instance";
import config from "../../../Services/config.json"
import { Link, useParams } from "react-router-dom";


function ShowAdmin() {
    const [admin, setAdmin] = useState([]);
    const {id} = useParams();

    const fetchData = async () => {
        const result = await Instance.get(`${config.api_url}/showAdmin/${id}`);
        setAdmin(result.data.singleUser);
        // console.log(admins);

    };
    // console.log(subscriber);

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div>

                    <p> {admin.pseudo} </p>
                    <p> {admin.email} </p>
                    <p> {admin.role} </p>

        </div>
    )
}

export default ShowAdmin