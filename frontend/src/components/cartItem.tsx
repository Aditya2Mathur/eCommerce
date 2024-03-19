import { FaMinus, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

type cartItemProps = {
    cartItem: any;
}
const CartItem = ({ cartItem }: cartItemProps) => {
    const { productId, photo, name, price, quantity } = cartItem
    return (
        <div className="cart-item">
        <div className="cart-item-info">
          <img src={photo} alt={name} />
          <article>
            <Link to={`/product/${productId}`}>{name}</Link>
            <span>₹{price}</span>
          </article>
        </div>
        <div className="cart-item-controls">
          <button>
            <FaMinus />
          </button>
          <b>{quantity}</b>
          <button>
            <FaPlus />
          </button>
        </div>
      </div>
        )
}

export default CartItem
