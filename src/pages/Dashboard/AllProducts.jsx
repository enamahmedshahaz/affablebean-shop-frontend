import { Link, useLoaderData } from "react-router-dom";
import AddCategory from "./AddCategory";
import useProducts from "../../hooks/useProducts";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";


const AllProducts = () => {

    const [products, , refetch] = useProducts();
    const axiosPublic = useAxiosPublic();

    const handleDeleteProduct = (product) => {
        //console.log('Delete: ', id);
        Swal.fire({
            title: "Are you sure?",
            text: `Want to delete product - ${product.name} `,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {

            if (result.isConfirmed) {

                axiosPublic.delete(`/product/${product._id}`)
                    .then(response => {
                        // console.log(response.data);
                        if (response.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: `Post: ${product.name} has been deleted!`,
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

            <p className="my-4 text-right">
                <Link className="underline text-blue-600 font-semibold" to={"/dashboard/add-product"}>Add New Product</Link>
            </p>

            <div>
                <h4 className="text-center font-semibold text-2xl mb-4">
                    Showing All products {`(Total ${products?.length})`}
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
                            <th>price</th>
                            <th>rating</th>
                            <th>category Id</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products?.map((product, index) =>

                                <tr key={product._id} className="hover">

                                    <td> {index + 1} </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="h-16 w-16 ">
                                                <img className="rounded-lg"
                                                    src={product.imageUrl}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td >
                                        {product.name}
                                    </td>
                                    <td >
                                        {product.price}
                                    </td>
                                    <td >
                                        {product.rating}
                                    </td>
                                    <td >
                                        {product.category_id}
                                    </td>
                                    <td>
                                        <button className="btn btn-ghost btn-xs">Edit </button>
                                        <button onClick={() => handleDeleteProduct(product)} className="btn btn-ghost btn-xs">Delete</button>
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

export default AllProducts;