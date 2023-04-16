import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home";
import About from "../Pages/About";
import Services from "../Pages/Services";
import Blogs from "../Pages/Blogs";
import Login from "../Pages/Login";
import Registration from "../Pages/Registration";
import AddService from "../Pages/Admin/AddService";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../Pages/ErrorPage";
import ServiceById from "../Pages/Services/ServiceById";
import Users from "../Pages/Admin/Users";
import Book from "../Pages/Services/Book";
import Booking from "../Pages/User/Booking";
import Bookings from "../Pages/Admin/Bookings";
import MediaDetails from "../Pages/User/Media/Details";
import Media from "../Pages/User/Media";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/services",
                element: <Services />,
            },
            {
                path: "/add-service",
                element: (
                    <PrivateRoute>
                        <AddService />
                    </PrivateRoute>
                ),
            },
            {
                path: "/service/:id",
                element: <ServiceById />,
            },
            {
                path: "/book",
                element: (
                    <PrivateRoute>
                        <Book />
                    </PrivateRoute>
                ),
            },
            {
                path: "/blogs",
                element: <Blogs />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "registration",
                element: <Registration />,
            },
            {
                path: "/users",
                element: (
                    <PrivateRoute>
                        <Users />
                    </PrivateRoute>
                ),
            },
            {
                path: "/booking",
                element: (
                    <PrivateRoute>
                        <Booking />
                    </PrivateRoute>
                ),
            },
            {
                path: "/bookings",
                element: (
                    <PrivateRoute>
                        <Bookings />
                    </PrivateRoute>
                ),
            },
            {
                path: "/media",
                element: (
                    <PrivateRoute>
                        <Media />
                    </PrivateRoute>
                ),
            },
            {
                path: "/media/:id",
                element: (
                    <PrivateRoute>
                        <MediaDetails />
                    </PrivateRoute>
                ),
            },
        ],
    },
    {
        path: "*",
        element: <ErrorPage />,
    },
]);

export { router };
