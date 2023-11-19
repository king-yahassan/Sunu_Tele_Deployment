import  { useEffect, useState } from "react";
import Instance from "../../Services/Auth/Instance";
import config from "../../Services/config.json"
import AllSubscribers from "./AllSubscribers";
import ValidSubscriber from "./ValidSubscriber";

function PropSubscribers() {
    const [subscribers, setSubscribers] = useState([]);
    const [paidSubscriber , setPaidSubscriber] = useState([])
    const [error, setError] = useState("");


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try{
        const result = await Instance.get(`${config.api_url}/subscribers`)
        setSubscribers(result.data.allSubscribers);
        setPaidSubscriber(result.data.allSubscribers.filter(subscriber => subscriber.status === "payer"))
        }catch (error) {
            console.error("-+-+-+-Erreur lors de la connexion:", error);
            setError(error);
        }
    };

    return (
        <div>
            <AllSubscribers subscribers = { subscribers } />
            <ValidSubscriber paidSubscriber = {paidSubscriber} />
            {error && <h1 style={{ color: "red" }}>{error.response.data.message}</h1>}
        </div>
    )
}

export default PropSubscribers ;