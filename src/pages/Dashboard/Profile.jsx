import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Profile = () => {

    const { user } = useAuth();

    const axiosPublic = useAxiosPublic();
    const [loginUser, setLoginUser] = useState({});

    // Fetch data the backend
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axiosPublic.get(`/user?email=${user.email}`);
                setLoginUser(response.data);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        fetchUserData();
    }, []);

    const { firstName, lastName, email, phone, address, profilePhotoUrl } = loginUser;


    const [isEditing, setIsEditing] = useState(false);
    const { register, handleSubmit, reset } = useForm({
        defaultValues: { name, phone, address }
    });


    // Function to submit edited profile details

    const onSubmit = (data) => {

        // Handle the update API call here
        console.log("Updated data:", data);
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Profile updated successfully",
            showConfirmButton: false,
            timer: 1500
        });
        setIsEditing(false);
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-md mx-auto">
            <div className="text-center">
                <img
                    src={profilePhotoUrl}
                    alt="Profile"
                    className="w-32 h-32 rounded-full mx-auto object-cover mb-4"
                />
                <h2 className="text-2xl font-semibold mb-2">{firstName}</h2>
                <p className="text-gray-600">{email}</p>
                <p className="text-gray-600">{phone}</p>
                <p className="text-gray-600">{address}</p>

                <button
                    onClick={() => setIsEditing(true)}
                    className="mt-4 btn btn-primary"
                >
                    Edit Profile
                </button>
            </div>

            {/* Edit Profile Modal */}
            {isEditing && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                        <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    {...register("name")}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    {...register("phone")}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-2">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    {...register("address")}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-2">
                                    Profile Picture
                                </label>
                                <input
                                    type="file"
                                    className="input input-bordered w-full"
                                    {...register("profilePicture")}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-2">
                                    Email (Uneditable)
                                </label>
                                <input
                                    type="email"
                                    className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                                    value={email}
                                    readOnly
                                />
                            </div>

                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="btn btn-secondary"
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
