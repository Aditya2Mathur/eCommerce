
// `${server}/${photo}` for server input images

type ProductProps = {
    productId: string,
    photo: string,
    name: string,
    price: number,
    stock: number,
    discription: string,
    category: string,
    handle: () => void
}
const ProductCard = ({ 
    photo,
    name,
    price,
    handle, }: ProductProps) => {
    return (
        <div className='ProductCard'>
            <div className="imgBox">
                <img src={photo} alt={name} className="product"/>
            </div>
            <div className="detailBox">
                <h3>{name}</h3>
                <h2>RS: {price}</h2>
                <button onClick={() => handle()}>
                    Add to Cart
                </button>
            </div>
        </div>
    )
}
export default ProductCard
