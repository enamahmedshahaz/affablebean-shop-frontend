import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";

import { Helmet } from "react-helmet-async";
import Swal from 'sweetalert2';
import useAxiosPublic from "../../hooks/useAxiosPublic";

import { useState } from "react";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddCategory = () => {

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

        const imageUrl = res.data.data.display_url;

        const category = {
            name: data.name,
            imageUrl: imageUrl,
            date_create: new Date()
        }

        axiosPublic.post('/category', category)
            .then(res => {

                if (res.data.insertedId) {
                    // clear all input values in the form
                    reset();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "New Category Added",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setLoading(false);
                    navigate("/dashboard/all-categories");
                }
            }).catch(error => {
                Swal.fire({
                    title: "Add category failed!",
                    text: `Error: ${error.message}`,
                    icon: "error"
                });
            })
    };

    return (

        <>
            <Helmet>
                <title>Dashboard | Add Category </title>
            </Helmet>

            <div className="hero bg-green-50 rounded-xl min-h-screen">

                <div className="hero-content flex-col">

                    <div className="text-center">
                        <h1 className="text-3xl font-bold">Add a New Product Category</h1>
                    </div>

                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-green-100">

                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">

                            {/* Name Field */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>

                                <input {...register("name", { required: true })} type="text" name="name" placeholder="Category name" className="input input-bordered" />

                                {errors.name?.type === "required" && (
                                    <p className="text-red-600">Name is required</p>
                                )}

                            </div>

                            {/*Image Field */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Category Image </span>
                                </label>
                                <input {...register('image', { required: true })} name="image" type="file" className="file-input input-bordered" />

                                {errors.image?.type === "required" && (
                                    <p className="text-red-600">Image is required</p>
                                )}
                            </div>

                            <div className="form-control mt-3">
                                <input className="btn text-white text-xl bg-green-500 hover:bg-green-700" type="submit" value="Add" />
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </>
    );
};

export default AddCategory;