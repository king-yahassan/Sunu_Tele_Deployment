import { useState , useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Instance from "../../Services/Auth/Instance";
import config from "../../Services/config.json"

function SingleSubscriber() {
  const {id} = useParams();
  const [subscriber, setSubscriber] = useState([]);

  const fetchData = async () => {
      const result = await Instance.get(`${config.api_url}/showSubscriber/${id}`);
      setSubscriber(result.data.singleSubscriber);

  };
  // console.log(subscriber);

  useEffect(() => {
      fetchData();
  }, []);
  return (
    <div>
            <Link to="/home">Home</Link>

      <Link to="/home/subscribers">All Subscriber</Link>
      SingleSubscriber
      <h1> {subscriber.name} </h1>
      <h2> {subscriber.address} </h2>
      <h3> {subscriber.phoneNumber} </h3>
      <h4> {subscriber.paymentPriceSubscribe} </h4>
      <h5> {subscriber.subscriberAdminName} </h5>
      </div>

  )
}

export default SingleSubscriber

