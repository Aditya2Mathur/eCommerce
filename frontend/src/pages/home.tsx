import { Link } from "react-router-dom";
import ProductCard from "../components/productCard";
import ProductCategory from "../components/ProductCategory";
import Footer from "../components/footer";
const Home = () => {
  const addToCart = () =>{
    console.log("hello world")
  }
  return (
    <div className="home">
      <section>
        <div>
          <h1>Stay Styling</h1>
          <h1>UP TO 50% OFF</h1>
          <div className="heroLink">
            <Link to="/shipping" className="buyBtn" >Buy Now!</Link>
            <Link to="/shop" className="shopBtn">Shop</Link>
          </div>
        </div>
        <div>
          <div className="imgBackground"> <img src={"/productsImages/homePage/9.png"} alt="" /></div>  
        </div>
      </section>
      <h1>
        Latest Products
        <Link to={"/search"} className="findMore">
          More
        </Link>
      </h1>
      <main>
        <ProductCard
          productId="ad2002"
          name="Coffee Shake"
          price={1000}
          photo="/productsImages/homePage/5.png"
          stock={100}
          handler={addToCart}
        />
        <ProductCard
          productId="ad2002"
          name="Coffee Shake"
          price={1000}
          photo="/productsImages/homePage/4.png"
          stock={100}
          handler={addToCart}
        />
        <ProductCard
          productId="ad2002"
          name="Coffee Shake"
          price={1000}
          photo="/productsImages/homePage/6.png"
          stock={100}
          handler={addToCart}
        />
        <ProductCard
          productId="ad2002"
          name="Coffee Shake"
          price={1000}
          photo="/productsImages/homePage/8.png"
          stock={100}
          handler={addToCart}
        />


        {/* Category */}
      </main>
      <section className="category">
        <ProductCategory />
      </section>
      <br />
      <Footer/>
    </div>
  );
};

export default Home;
