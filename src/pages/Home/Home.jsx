import Banner from "./Banner";
import Categories from "./Categories";
import FAQ from "./Faq";
import FeaturedProducts from "./FeaturedProducts";
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
                <FeaturedProducts></FeaturedProducts>
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