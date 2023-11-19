import React, {  useState } from "react";
import { Link } from "react-router-dom";

const ValidSubscriber = ({paidSubscriber}) => {
    const [search, setSearch] = useState("");

    return (
        <div>
            <div>
                <h1 style={{ textAlign: "center" }}>
                    <b>Valid  Paid Subscribers List</b>
                </h1>
                <div className="search">
                    <input
                        type="text"
                        placeholder="Search..."
                        onChange={(e) => {
                            setSearch(e.target.value);
                        }}
                    />
                </div>
                <br />
            </div>
            <React.Fragment>
                <table
                    className="Subscribers"
                    style={{ textAlign: "center", width: "100%" }}
                >
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Address</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col">Payment Price</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        paidSubscriber.filter((subscriber) =>
                            `${subscriber.name} ${subscriber.address} ${subscriber.phoneNumber}`
                                .toLowerCase()
                                .includes(`${search}`))
                            .map((subscriber, index) => (
                                <tr key={index}>
                                    <td>{subscriber.name}</td>
                                    <td>{subscriber.address}</td>
                                    <td>{subscriber.phoneNumber}</td>
                                    <td>{subscriber.paymentPriceSubscribe}</td>
                                    <td>{subscriber.status}</td>
                                    <td>
                                        <Link
                                            className="btn btn-outline-primary"
                                            to={`/home/subscribers/showSubscriber/${subscriber._id}`}
                                        >
                                            show
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </React.Fragment>
        </div>
    );
};


export default ValidSubscriber ;