import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Protected({children, authenticated = true, slug}) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        if(!authStatus) {
            console.log("authStatus: ", authStatus);
            navigate("/login");
        }

        navigate(slug);
        setLoading(false);
    }, [authStatus, navigate]);

    // useEffect(() => {
    //     // TODO: make it more readable
    //     if(authenticated && authStatus !== authenticated) {
    //         navigate("/login");
    //     }
    //     else if(!authenticated && authStatus !== authenticated) {
    //         navigate("/");
    //     }

    //     setLoading(false);
    // }, [authStatus, navigate, authenticated]);

    return loading ? <h1>Loading...</h1> : <>{children}</>;
}

export default Protected;