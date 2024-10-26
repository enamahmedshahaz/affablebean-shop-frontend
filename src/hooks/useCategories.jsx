import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useCategories = () => {

    const axiosSecure = useAxiosPublic();

    const { data: categories, isPending: categoriesLoading, refetch } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/category`);
            return res.data;
        }
    });
    return [categories, categoriesLoading, refetch];
};

export default useCategories;