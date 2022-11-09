import { Button } from "@material-tailwind/react";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "../Components/Header";
import SetTitle from "../Components/SetTitle";
import FeedBack from "../Components/FeedBack";
import { AuthContext } from "../Contexts/UserContext";
import AddFeedBack from "./AddFeedBack";

const DynamicService = () => {
    const { user } = useContext(AuthContext);

    const location = useLocation();

    const [category, setCategory] = useState({});
    const [feedbacks, setFeedbacks] = useState([]);
    const { id } = useParams();

    // Service Data Load by Id
    useEffect(() => {
        fetch(`http://localhost:5000/service/${id}`)
            .then((res) => res.json())
            .then((data) => setCategory(data))
            .catch((error) => console.log(error));
    }, [id]);
    const { _id, img, name, about, price, ratings } = category;

    SetTitle(name);

    // FeedBack data loadby id
    useEffect(() => {
        fetch(`http://localhost:5000/feedback/${id}`)
            .then((res) => res.json())
            .then((data) => setFeedbacks(data))
            .catch((error) => console.log(error));
    }, [id]);

    const ConditionalFeedback = ({ feedbacks }) => {
        if (feedbacks.length) {
            return feedbacks.map((feedback) => <FeedBack key={feedback._id} feedbackObj={feedback} />);
        } else {
            return <Button variant="gradient">No Feedback</Button>;
        }
    };

    return (
        <>
            <Header title={name}>
                <Link to="/service" className="opacity-60">
                    Services
                </Link>
                <Link>{name}</Link>
            </Header>
            <section className="my-container section-gap grid grid-cols-1 lg:grid-cols-2 items-center gap-6 xs:gap-10 xl:gap-12">
                <div className="w-full sm:max-w-md mx-auto lg:max-w-none">
                    <img className="rounded-lg bg-black/5" src={img} alt="" />
                </div>
                <div className="flex flex-col gap-2 bg-black/5 p-6 xl:px-8 xl:py-10 rounded-lg">
                    <h3 className="p-4 shadow rounded-md mb-2">{name}</h3>
                    <h4>Price: {price}$</h4>
                    <h4>Rating: {ratings}</h4>
                    <p>
                        <span className="text-xl font-bold">Description: </span>
                        {about}
                    </p>
                    <Button className="mt-2" variant="gradient" fullWidth>
                        Book This Services
                    </Button>
                </div>
            </section>
            <section className="my-container mb-12 sm:mb-14 lg:mb-16">
                <h1 className="text-center mb-8 md:mb-10">Customer Feedback</h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xs:gap-10 xl:gap-12">
                    <ConditionalFeedback feedbacks={feedbacks} />
                </div>
                {user?.uid ? (
                    <AddFeedBack serviceId={_id} email={user.email} />
                ) : (
                    <Link to="/login" className="flex justify-center mt-8 md:mt-10" state={{ from: location }} replace>
                        <Button variant="gradient">Login To Add Review</Button>
                    </Link>
                )}
            </section>
        </>
    );
};

export default DynamicService;
