import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaGoogle } from "react-icons/fa6";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";


const SocialLogin = () => {

    const { loginWithGoogle } = useAuth();
    const axiosPublic = useAxiosPublic();

    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || "/";

    const handleGoogleLogin = () => {

        loginWithGoogle()
            .then(result => {
                //save user data to database
                const userInfo = {
                    firstName: result.user?.displayName,
                    lastName: "",
                    email: result.user?.email,
                    profilePhotoUrl: result.user?.photoURL,
                    role: 'user'
                };

                console.log(result.user);

                axiosPublic.post('/user', userInfo)
                    .then(res => {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Login Successful",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate(from);

                    }).catch(error => {
                        Swal.fire({
                            title: "Login Failed!",
                            text: `Error: ${error.message}`,
                            icon: "error"
                        });
                    })
            })
            .catch(error => {
                Swal.fire({
                    title: "Login Failed!",
                    text: `Error: ${error.message}`,
                    icon: "error"
                });
            })
    };

    return (
        <div className='flex justify-center items-center'>
            <button className="btn btn-outline" onClick={handleGoogleLogin}>
                <FaGoogle></FaGoogle> Google
            </button>
        </div>
    );
};

export default SocialLogin;