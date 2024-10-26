import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";


const useLoggedInUserInfo = () => {

    const axiosSecure = useAxiosPublic();
    const { user } = useAuth();

    const { data: loggedInUserInfo, isPending: loggedInUserInfoLoading } = useQuery({
        queryKey: [user?.email, 'userInfo'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user?email=${user.email}`);
            console.log('tanstack: ', res.data);
            return res.data;
        }
    });
    return [loggedInUserInfo, loggedInUserInfoLoading];
};

export default useLoggedInUserInfo;