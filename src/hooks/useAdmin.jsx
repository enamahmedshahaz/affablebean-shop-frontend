import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useAdmin = () => {

    const axiosPublic = useAxiosPublic();
    const { user, loading } = useAuth();

    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosPublic.get(`/user/checkAdmin/${user.email}`);
            console.log(res.data);
            return res.data?.adminStatus;
        }
    });
    return [isAdmin, isAdminLoading];
};


export default useAdmin;