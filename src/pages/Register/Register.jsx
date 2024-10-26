import { Link } from "react-router-dom";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";

import { Helmet } from "react-helmet-async";
import Swal from 'sweetalert2';
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../components/SocialLogin";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {

    const { createUser, updateUserProfile } = useAuth();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const [loading, setLoading] = useState(false);

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
        //image upload to ImageBB and get an url
        const imageFile = { image: data.image[0] };

        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });

        const profilePhotoUrl = res.data.data.display_url;

        createUser(data.email, data.password)
            .then(result => {
                const loggedOnUser = result.user;
                console.log(loggedOnUser);

                updateUserProfile(data.name, profilePhotoUrl)
                    .then(() => {
                        //save user data to database
                        const user = {
                            firstName: data.firstName,
                            lastName: data.lastName,
                            email: data.email,
                            profilePhotoUrl: profilePhotoUrl,
                            role: 'user'
                        };
                        axiosPublic.post('/user', user)
                            .then(res => {
                                if (res.data.insertedId) {
                                    // clear all input values in the form
                                    reset();
                                    Swal.fire({
                                        position: "top-end",
                                        icon: "success",
                                        title: "User Registration successful",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    setLoading(false);
                                    navigate("/");
                                }
                            }).catch(error => {
                                Swal.fire({
                                    title: "Registration failed!",
                                    text: `Error: ${error.message}`,
                                    icon: "error"
                                });
                            })
                    }).catch((error) => {
                        console.error(error);
                    });
            })
            .catch(error => {
                console.error(error);
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Registration Failed",
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    }

    return (

        <>
            <Helmet>
                <title>AffableBean | Register</title>
            </Helmet>

            <div className="hero bg-green-50 rounded-xl min-h-screen">

                <div className="hero-content flex-col">

                    <div className="text-center">
                        <h1 className="text-3xl font-bold">Register now!</h1>
                        {
                            loading ?
                                <span className="loading loading-spinner loading-lg"></span>
                                : " "
                        }
                    </div>

                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-green-100">

                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">

                            {/* Name Field */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>

                                <div className="flex gap-2">
                                    <input {...register("firstName", { required: true })} type="text" name="firstName" placeholder="First Name" className="input input-bordered w-1/2" />
                                    <input {...register("lastName", { required: true })} type="text" name="lastName" placeholder="Last Name" className="input input-bordered w-1/2" />
                                </div>

                                {errors.firstName?.type === "required" && (
                                    <p className="text-red-600">First name is required</p>
                                )}

                                {errors.lastName?.type === "required" && (
                                    <p className="text-red-600">Last name is required</p>
                                )}

                            </div>

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

                                <input {...register("password", { required: true, minLength: 6, maxLength: 20, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/ })} name="password" type="password" placeholder="Enter password" autoComplete="on" className="input input-bordered" />

                                {errors.password?.type === "required" && (
                                    <p className="text-red-600">Password is required</p>
                                )}

                                {errors.password?.type === "minLength" && (
                                    <p className="text-red-600">Password should be min 6 characters long</p>
                                )}

                                {errors.password?.type === "maxLength" && (
                                    <p className="text-red-600">Password should be max 20 characters long</p>
                                )}

                                {errors.password?.type === "pattern" && (
                                    <p className="text-red-600">At least one lowercase letter, one uppercase, one special char, one digit</p>
                                )}

                            </div>

                            {/* Profile Photo Field */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Profile photo </span>
                                </label>
                                {/* <input type="text" {...register("photoURL", { required: true })} name="photoURL" placeholder="Enter URL of your photo" className="input input-bordered" /> */}
                                <input {...register('image', { required: true })} type="file" className="file-input input-bordered" />

                                {errors.image?.type === "required" && (
                                    <p className="text-red-600">Profile photo is required</p>
                                )}
                            </div>


                            <div className="form-control mt-3">
                                <input className="btn text-white text-xl bg-green-500 hover:bg-green-700" type="submit" value="Register" />
                            </div>
                        </form>

                        <div className="card-body text-center -mt-14">
                            <p>Already have account? Please  <Link className='font-bold text-blue-700' to="/login">Login</Link> </p>
                        </div>

                        <div className='mb-5 -mt-5'>
                            <div className='divider'>Or Sign up with</div>
                            <SocialLogin></SocialLogin>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;