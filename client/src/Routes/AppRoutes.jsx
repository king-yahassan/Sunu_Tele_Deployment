import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import LandingPage from "../Pages/LandingPage";
// import ErrorPage from "./ErrorPage";
import SignUp from "../Layouts/BackOffice/Components/SignUp";
import SignIn from "../Pages/SignIn";
import ProtectedRoute from "../Services/Auth/ProtectedRoute";
// import SingleSubscriber from "../components/Subscribe/SingleSubscriber";
import NewSubscriber from "../components/Subscribe/NewSubscriber";
import UpdateSubscriber from "../components/Subscribe/UpdateSubscriber";
// import AllSubscribers from "../components/Subscribe/AllSubscribers";
import NewPayment from "../components/Payment/NewPayment";
import AllPayments from "../components/Payment/AllPayments";
import MonthHistory from "../components/Historical/MonthHistory";
import PaymentsSubscriber from "../components/Payment/PaymentsSubscriber";
import Role from "../Layouts/BackOffice/Admin/Role";
import SubscribersLayout from "../Layouts/MainLayouts/SubscribersLayout"
import FormLayout from "../Layouts/MainLayouts/FormLayout";
import GetAllPaymentsSubscriber from "../components/Payment/GetAllPaymentsSubscriber";
import AllAdmins from "../Layouts/BackOffice/Components/AllAdmins";
import UpdateAdmin from "../Layouts/BackOffice/Components/UpdateAdmin";
import ShowAdmin from "../Layouts/BackOffice/Components/ShowAdmin";
import Cartography from "../components/Carthogaphy/Cartography";
import Payments from "../Layouts/MainLayouts/Payments";


const token = localStorage.getItem("token");
const router = createBrowserRouter([
    { path: "/", element: <LandingPage /> },
    {
        path: "/home",
        element: (
            <ProtectedRoute isAuthenticated={token}>
                <Home />
            </ProtectedRoute>
        ),
    },
    // {path: "/" , element : <Home /> , errorElement: <ErrorPage />  },
    //Auth Routes
    // { path: "/signUp", element: <SignUp /> },
    { path: "/signIn", element: <SignIn /> },
    {
        path: "/home/signUp",
        element: (
            <ProtectedRoute isAuthenticated={token}>
                <SignUp />
            </ProtectedRoute>
        ),
    },

    //SUbscriber Routes
    {
        path: "/home/subscribers",
        element: (
            <ProtectedRoute isAuthenticated={token}>
                <SubscribersLayout />
            </ProtectedRoute>
        ),
    },
    {
        path: "/home/subscribers/showSubscriber/:id",
        element: (
            <ProtectedRoute isAuthenticated={token}>
                <GetAllPaymentsSubscriber />
            </ProtectedRoute>
        ),
    },
    {
        path: "/home/subscribers/newSubscriber",
        element: (
            <ProtectedRoute isAuthenticated={token}>
                <NewSubscriber />
            </ProtectedRoute>
        ),
    },
    {
        path: "/home/subscribers/update/:id",
        element: (
            <ProtectedRoute isAuthenticated={token}>
                <UpdateSubscriber />
            </ProtectedRoute>
        ),
    },
    //Payment Routes
    {
        path: "/home/payments",
        element: (
            <ProtectedRoute isAuthenticated={token}>
                <Payments />
            </ProtectedRoute>
        ),
    },
    {
        path: "/home/payments/newPayment/:id",
        element: (
            <ProtectedRoute isAuthenticated={token}>
                <NewPayment />
            </ProtectedRoute>
        ),
    },
    {
        path: "/home/payments/paymentsSubscriber/:id",
        element: (
            <ProtectedRoute isAuthenticated={token}>
                <PaymentsSubscriber />
            </ProtectedRoute>
        ),
    },
    {
        path: "/home/payments/groupedByDate",
        element: (
            <ProtectedRoute isAuthenticated={token}>
                <MonthHistory />
            </ProtectedRoute>
        ),
    },

    //Admin MAnagement routes
    {
        path: "/home/role",
        element: (
            <ProtectedRoute isAuthenticated={token}>
                <AllAdmins />
            </ProtectedRoute>
        ),
    },
    {
        path: "/home/role/showAdmin/:id",
        element: (
            <ProtectedRoute isAuthenticated={token}>
                <ShowAdmin />
            </ProtectedRoute>
        ),
    },
    {
        path: "/home/role/updateAdmin/:id",
        element: (
            <ProtectedRoute isAuthenticated={token}>
                <UpdateAdmin />
            </ProtectedRoute>
        ),
    },

    //Cartography routes
    {
        path: "/home/cartography",
        element: (
            <ProtectedRoute isAuthenticated={token}>
                <Cartography />
            </ProtectedRoute>
        ),
    },
]);

export default router;
