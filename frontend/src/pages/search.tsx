import { useState } from "react"
import ProductCard from "../components/productCard";
import { Link } from "react-router-dom";

const Search = () => {

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const addToCart = () => {

  }
  const isPrevPage = page > 1;
  const isNextPage = page < 4;
  return (

    <div className="search">
      <aside>
        <h2>Filters</h2>
        <div>
          <h4>Sort</h4>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">Default</option>
            <option value="asc">(Low to High)</option>
            <option value="dsc">(High to Low)</option>
          </select>
        </div>
        <div>
          <h4>Category</h4>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All</option>
            <option value="Shoes">Shoes</option>
            <option value="t-shirt">T-Shirt</option>
            <option value="shirt">Shirt</option>
          </select>
        </div>
        <div className="rangeBar">
          <h4>Max Price: {maxPrice || ""}</h4>
          <input type="range" min="100" className="rangeStyle" max="100000" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
        </div>
      </aside>
      <main>
        <div className="searchInput">
          <h2>Products</h2>
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search Product...." />
        </div>
        <div className="products">
          
          <ProductCard
            productId="ad2002"
            name="Coffee Shake"
            price={1000}
            photo="/productsImages/19.png"
            stock={100}
            handler={addToCart}
          />
          

        </div>
        <article>
          <button disabled={!isPrevPage} onClick={() => setPage((prev) => prev - 1)}>Prev</button>
          <p>{page} of {4}</p>
          <button disabled={!isNextPage} onClick={() => setPage((prev) => prev + 1)}>Next</button>
        </article>
      </main>
    </div>
  )

}


export default Search