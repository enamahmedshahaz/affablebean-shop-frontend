import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useUsers = () => {

    const axiosPublic = useAxiosPublic();

    const { data: users, isPending: userLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/user`);
            return res.data;
        }
    });
    return [users, userLoading, refetch];
};

export default useUsers;