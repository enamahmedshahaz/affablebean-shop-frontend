import Banner from "./Banner";
import Categories from "./Categories";

const Home = () => {
    return (
        <div>
            <div className="my-6">
                <Banner></Banner>
            </div>
            <div>
                <Categories></Categories>
            </div>
        </div>
    );
};

export default Home;