import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Instance from "../../Services/Auth/Instance";
import config from "../../Services/config.json"

function PaymentsSubscriber() {
  const { id } = useParams();
  const [paymentsSubscriber, setPaymentsSubscriber] = useState([]);

  const fetchData = async () => {
    const result = await Instance.get(`${config.api_url}/paymentsSubscriber/${id}`);
    setPaymentsSubscriber(result.data.allPaymentsSubscriber);
  };
  // console.log(subscriber);

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <Link to="/home">Home</Link>

      <Link to="/home/payments">All Payments</Link>

      <h1>      All  Payments for one Subscriber </h1>
      
      <h1> {paymentsSubscriber.subscriberAuthorName} </h1>
      <h2> {paymentsSubscriber.address} </h2>
      <h3> {paymentsSubscriber.phoneNumber} </h3>
      <h4> {paymentsSubscriber.paymentPriceSubscribe} </h4>
      <h5> {paymentsSubscriber.subscriberAdminName} </h5>

    </div >
  )
}

export default PaymentsSubscriber;