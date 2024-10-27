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

            <div className="text-center">
                <h4 className="text-center font-semibold text-2xl mb-4">
                    Add new Category
                </h4>
            </div>

            <div className="p-6 bg-green-100 rounded-lg">

                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="flex gap-4 items-center">
                        
                        <div>
                            Category Name: <input {...register("name", { required: true })} type="text" name="name" />
                            {errors.name?.type === "required" && (
                                <p className="text-red-600">Name is required</p>
                            )}
                        </div>

                        <div>
                            Category Image: <input {...register('image', { required: true })} name="image" type="file" />

                            {errors.image?.type === "required" && (
                                <p className="text-red-600">Image is required</p>
                            )}
                        </div>

                        <div>
                            <input className="px-5 py-2 rounded-md text-white bg-green-700" type="submit" value="Add" />
                        </div>
                    </div>
                </form>
            </div>

        </>
    );
};

export default AddCategory;