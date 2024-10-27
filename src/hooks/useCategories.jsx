import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useCategories = () => {

    const axiosPublic = useAxiosPublic();
    const { data: categories, isPending: categoriesLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/category`);
            return res.data;
        }
    });
    return [categories, categoriesLoading];
};

export default useCategories;