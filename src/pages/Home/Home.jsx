import Banner from "./Banner";
import Categories from "./Categories";
import FAQ from "./Faq";
import UserReviews from "./userReviews";

const Home = () => {
    return (
        <div>
            <div className="my-6">
                <Banner></Banner>
            </div>
            <div>
                <Categories></Categories>
            </div>
            <div>
                <UserReviews></UserReviews>
            </div>
            <div>
                <FAQ></FAQ>
            </div>
        </div>
    );
};

export default Home;