import { Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from 'sweetalert2';
import SocialLogin from "../../components/SocialLogin";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";



const Login = () => {

    const { signInUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    
    const [loading, setLoading] = useState(false);

    const from = location.state?.from?.pathname || "/";

    const {
        register,
        handleSubmit,
        // watch,
        formState: { errors },
        reset
    } = useForm();

    const onSubmit = async (data) => {
        //console.log('Register form data: ', data);
        setLoading(true);
        signInUser(data.email, data.password)
            .then(result => {
                // console.log(result.user);
                // clear all input values in the form
                reset();

                //if comes from a private route navigate to that route, 
                // else navigate to home page after successful login
                navigate(from);

                // navigate(location?.state ?  location.state : '/');

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Login successful",
                    showConfirmButton: false,
                    timer: 1500
                });
                setLoading(false);

            })
            .catch(error => {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: error.message,
                    showConfirmButton: false,
                    timer: 1500
                });
                setLoading(false);
            })
    }

    return (

        <>
            <Helmet>
                <title>AffableBean | Login</title>
            </Helmet>

            <div className="hero bg-green-50 rounded-xl min-h-screen">

                <div className="hero-content flex-col">

                    <div className="text-center">
                        <h1 className="text-3xl font-bold">Login now!</h1>
                        {
                            loading ?
                                <span className="loading loading-spinner loading-lg"></span>
                                : " "
                        }
                    </div>

                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-green-100">

                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">

                            {/* Email Field */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })} name="email" placeholder="@mail.com" className="input input-bordered" />
                                {errors.email?.type === "required" && (
                                    <p className="text-red-600">Email is required</p>
                                )}
                                {errors.email?.type === "pattern" && (
                                    <p className="text-red-600">Email is not in valid format</p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>

                                <input {...register("password", { required: true })} name="password" type="password" placeholder="Enter password" autoComplete="on" className="input input-bordered" />

                                {errors.password?.type === "required" && (
                                    <p className="text-red-600">Password is required</p>
                                )}

                            </div>

                            <div className="form-control mt-3">
                                <input className="btn text-white text-xl bg-green-500 hover:bg-green-700" type="submit" value="Login" />
                            </div>
                        </form>

                        <div className="card-body text-center -mt-14">
                            <p>No account? Please  <Link className='font-bold text-blue-700' to="/register">Register</Link> </p>
                        </div>

                        <div className='mb-5 -mt-5'>
                            <div className='divider'>Or Login with</div>
                            <SocialLogin></SocialLogin>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;