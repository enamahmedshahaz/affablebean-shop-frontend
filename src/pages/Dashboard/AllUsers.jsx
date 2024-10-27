import { Link, useLoaderData, useNavigate } from "react-router-dom";
import AddCategory from "./AddCategory";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useUsers from "../../hooks/useUsers";


const AllUsers = () => {

    const [users, userLoading, refetch] = useUsers();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleEdit = (user) => {
        // // Navigate to the AddProduct page with product data as state
        // navigate("/dashboard/add-product", { state: { user } });
    }

    const handleChangeRole = (user) => {

        Swal.fire({
            title: "Are you sure?",
            text: `Want to change role`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Change"
        }).then((result) => {

            if (result.isConfirmed) {
                axiosPublic.patch(`/user/changeRole/${user._id}?role=${user.role}`)
                    .then(response => {
                        // console.log(response.data);
                        if (response.data.modifiedCount) {
                            Swal.fire({
                                title: "Changed!",
                                text: `Role changed`,
                                icon: "success"
                            });
                            refetch(); //refetch posts data
                        }
                    })
                    .catch(error => {
                        //  console.log(error);
                        Swal.fire({
                            title: "Can't Delete!",
                            text: `Error occurred: ${error.message}`,
                            icon: "error"
                        });
                    });
            }
        });
    }

    return (
        <div>

            <div>
                <h4 className="text-center font-semibold text-2xl mb-4">
                    Showing All Users {`(Total ${users?.length})`}
                </h4>
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map((user, index) =>

                                <tr key={user._id} className="hover">

                                    <td> {index + 1} </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="h-16 w-16 ">
                                                <img className="rounded-lg"
                                                    src={user.profilePhotoUrl}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td >
                                        {user.firstName + ' ' + user.lastName}
                                    </td>
                                    <td >
                                        {user.email}
                                    </td>
                                    <td >
                                        {user.role}
                                    </td>

                                    <td>
                                        <button onClick={() => handleEdit(user)} className="btn btn-ghost btn-xs">Edit Info</button>
                                        <button onClick={() => handleChangeRole(user)} className="btn btn-ghost btn-xs">Change Role</button>
                                    </td>
                                </tr>
                            )
                        }

                    </tbody>

                </table>
            </div>


        </div>
    );
};

export default AllUsers;