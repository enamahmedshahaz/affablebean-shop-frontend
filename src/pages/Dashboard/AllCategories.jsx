import { Link, useLoaderData } from "react-router-dom";
import AddCategory from "./AddCategory";


const AllCategories = () => {

    const categories = useLoaderData();
    
    return (
        <div>
            <AddCategory></AddCategory>

            {/* <p className="my-4 text-right">
                <Link className="underline text-blue-600 font-semibold" to={"/dashboard/add-category"}>Add New Category</Link>
            </p> */}

            <div>
                <h4 className="text-center font-semibold text-2xl mb-4">
                    Showing All categories {`(Total ${categories.length})`}
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
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categories?.map((category, index) =>

                                <tr key={category._id} className="hover">

                                    <td> {index + 1} </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="h-16 w-16 ">
                                                <img className="rounded-lg"
                                                    src={category.imageUrl}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td >
                                        {category.name}
                                    </td>
                                    <td>
                                        <button className="btn btn-ghost btn-xs">Edit </button>
                                        <button className="btn btn-ghost btn-xs">Delete</button>
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

export default AllCategories;