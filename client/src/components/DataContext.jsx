import { createContext, useState, useEffect } from "react";
import Instance from "../Services/Auth/Instance";
import config from "../Services/config.json"

// import { useParams } from "react-router-dom";
// Créez un contexte
const DataContext = createContext();

// Créez un provider pour envelopper vos composants et gérer les données partagées
const DataProvider = ({ children }) => {
  //Subscribers
  const [subscribers, setSubscribers] = useState([]);
  const [payerSubscribers, setPayerSubscribers] = useState([]);
  const [unpaidSubscribers, setUnpaidSubscribers] = useState([]);
  //Payments
  const [payments, setPayment] = useState([]);

  const [error, setError] = useState("");
  // const {id} = useParams

  useEffect(() => {
    fetchData();
    fetchDataPayments() ;
  }, []);

  const fetchData = async () => {
    try {
      const result = await Instance.get(`${config.api_url}/subscribers`);
      setSubscribers(result.data.allSubscribers);
      setPayerSubscribers(result.data.allSubscribers.filter(subscriber => subscriber.status === "payer"));
      setUnpaidSubscribers(result.data.allSubscribers.filter(subscriber => subscriber.status === "impayer"));

    } catch (error) {
      console.error("-+-+-+-Erreur lors de la recupération des subscribers:", error);
      setError(error);
    }
    
  };
  const fetchDataPayments = async () =>{
    try {
      const result = await Instance.get(`${config.api_url}/payments`);

      setPayment(result.data.allPayments);
      
    } catch (error) {
      console.error("-+-+-+-Erreur lors de la recupération des payments:", error);
      setError(error);
    }
  }

  // Vous pouvez ajouter d'autres fonctions pour manipuler les données ici

  return (
    <DataContext.Provider
      value={{
        subscribers,
        payerSubscribers,
        unpaidSubscribers,
        payments,
        error,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// API route 
// { 
//   "api_url" : "https://sunu-tele.onrender.com/api"
// }



export { DataContext, DataProvider };
