import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { Header, Footer } from "./components";

import authService from "./appwrite/auth";

import { login, logout } from "./store/authSlice";
import { LoginPage } from "./pages";
import { Outlet } from "react-router-dom";


function App() {
    // loading state
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    // on load
    useEffect(() => {
        authService.getCurrentUser()
        .then((userData) => {
            if(userData) {
                dispatch(login({userData}));
            }
            else {
                dispatch(logout());
            }
        })
        .finally(() => setLoading(false));
    }, []);

    return !loading ? (
        <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
            <div className="w-full block">
                <Header />
                <main>
                    <Outlet />
                </main>
                {/* <Footer /> */}
            </div>
        </div>
    ) : null;
}

export default App;