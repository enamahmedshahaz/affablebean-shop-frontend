import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";

import { Helmet } from "react-helmet-async";
import Swal from 'sweetalert2';
import useAxiosPublic from "../../hooks/useAxiosPublic";

import { useEffect, useState } from "react";
import useCategories from "../../hooks/useCategories";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddProduct = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [categories, setCategories] = useState([]);

    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        fetch(`http://localhost:5000/category`)
            .then((res) => res.json())
            .then((data) => setCategories(data))
            .catch((error) => console.error("Error loading categories:", error));
    }, []);

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

        const imageUrl = res.data.data.display_url;

        const product = {
            name: data.name,
            price: data.price,
            imageUrl: imageUrl,
            rating: data.rating,
            category_id: data.category,
            date_create: new Date()
        }

        console.log('product:', product)
        axiosPublic.post('/product', product)
            .then(res => {

                if (res.data.insertedId) {
                    // clear all input values in the form
                    reset();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "New  product added",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setLoading(false);
                    navigate("/dashboard/all-products");
                }
            }).catch(error => {
                Swal.fire({
                    title: "Add product failed!",
                    text: `Error: ${error.message}`,
                    icon: "error"
                });
            })
    };

    return (
        <>
            <div className="text-center">
                <h4 className="text-center font-semibold text-2xl mb-4">
                    Add new Product
                </h4>
            </div>

            <div>
                <form onSubmit={handleSubmit(onSubmit)}>

                    {/*  Name */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Product Name</span>
                        </label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            {...register('name', { required: true })}
                        />
                        {errors.name?.type === "required" && (
                            <p className="text-red-600">Name is required</p>
                        )}
                    </div>

                    {/*  Price */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Product Price</span>
                        </label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            {...register('price', { required: true })}

                        />
                        {errors.price?.type === "required" && (
                            <p className="text-red-600">Price is required</p>
                        )}
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Product Image</span>
                        </label>
                        <input
                            type="file"
                            className="input input-bordered w-full"
                            {...register('image', { required: true })}
                            name="image"

                        />
                        {errors.image?.type === "required" && (
                            <p className="text-red-600">Image is required</p>
                        )}
                    </div>


                    <div className="form-control w-full">

                        <label className="label">
                            <span className="label-text">Rating</span>
                        </label>

                        <input
                            type="text"
                            placeholder="Rating"
                            {...register('rating', { required: true })}

                            className="input input-bordered w-full" />
                        {errors.rating?.type === "required" && (
                            <p className="text-red-600">Rating is required</p>
                        )}
                    </div>

                    {/* Category Options */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Select Category</span>
                        </label>

                        <select
                            defaultValue={[]}
                            {...register('category', { required: true })}
                            className="select select-bordered w-full"
                        >
                            <option disabled value="default">Select Category</option>
                            {
                                categories.map((category, index) => <option value={category._id}>{category.name}</option>)
                            }

                        </select>

                        {errors.category?.type === "required" && (
                            <p className="text-red-600">Category is required</p>
                        )}
                    </div>

                    <button className="btn btn-primary mt-6">
                        Add Product
                    </button>

                </form>
            </div>

        </>
    );
};

export default AddProduct;