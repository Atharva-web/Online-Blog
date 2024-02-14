import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Logo, Input, Button } from "./index";

import { login } from "../store/authSlice";

import authService from "../appwrite/auth";

function SignUp() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");

    async function signup(data) {
        setError(""); // clear all the prev errors

        try {
            const userData = await authService.createAccount(data);
            if(userData) {
                const user = await authService.getCurrentUser();
                if(user) {
                    dispatch(login(user));
                }
                navigate("/");
            }
        }
        catch(error) {
            setError(error.message);
        }
    }

    return (
    <div className="flex items-center justify-center">
        <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
            <div className="mb-2 flex justify-center">
                <span className="inline-block w-full max-w-[100px]">
                    <Logo />
                </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
            <p className="ht-2 text-center text-base text-black/60">
                Already have an account?&nbsp;
                <Link to="/login" className="font-medium text-primary transition-all duration-200 hover:underline">
                    Login
                </Link>
            </p>
            {
                error && <p className="text-red-600 mt-8 text-center">{ error }</p>
            }

            <form onSubmit={handleSubmit(signup)} className="mt-8">
                <div className="space-y-5">
                    <Input
                        label = "Name: "
                        placeholder = "Enter your name"
                        {
                            ...register("name", {
                                required: true
                            })
                        }
                    />
                    <Input
                        label = "Email: "
                        placeholder = "Enter your email"
                        type = "email"
                        {
                            ...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: function(value) {
                                        return /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/
                                        .test(value) ||
                                        "Email address must be a valid address";
                                    }
                                }
                            })
                        }
                    />
                    <Input
                        label = "Password: "
                        placeholder = "Enter password"
                        type = "password"
                        {
                            ...register("password", {
                                requried: true
                            })
                        }
                    />
                    <Button
                        children = "Create Account"
                        type = "submit"
                        className = "w-full"
                    />
                </div>
            </form>
        </div>
    </div>
    );
}

export default SignUp;