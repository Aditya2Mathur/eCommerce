import { Link } from "react-router-dom"

const ProductCategory = () => {
  return (
    <div className='productCategory'>
      <div className="heading">
        <h2>Category</h2>
      </div>
      <div className="categoryCardOuter">
      <div className="categoryCard">
        <div>
          <img src="productsImages/homePage/1704843031.png" alt="" />
          <h3>Heading</h3>
          <p>discription</p>
        </div>
      </div>
      <div className="categoryCard">
        <div>
          <img src="productsImages/homePage/1704843031.png" alt="" />
          <h3>Heading</h3>
          <p>discription</p>
        </div>
      </div>
      <div className="categoryCard">
        <div>
          <img src="productsImages/homePage/1704843031.png" alt="" />
          <h3>Heading</h3>
          <p>discription</p>
        </div>
      </div>
      </div>
    
      <br />
      <div className="shopBtn">
          <Link to={"/search"}> Shop All</Link>
        </div>
    </div>
  )
}

export default ProductCategory