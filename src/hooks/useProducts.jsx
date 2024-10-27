import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useProducts = () => {

    const axiosPublic = useAxiosPublic();

    const { data: products, isPending: productsLoading, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/product`);
            return res.data;
        }
    });
    return [products, productsLoading, refetch];
};

export default useProducts;