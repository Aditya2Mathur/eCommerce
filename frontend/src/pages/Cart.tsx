import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItem from "../components/cartItem";
import { Link } from "react-router-dom";
const cartItems = [
  {
    productId: "PRD1001",
    photo: "https://www.bonsoir.co.in/cdn/shop/products/BLAZERB-223_1_large.jpg?v=1648618726",
    name: "Product 1",
    price: 49.99,
    stock: 15,
    quantity: 0
  },
  {
    productId: "PRD1001",
    photo: "https://www.bonsoir.co.in/cdn/shop/products/BLAZERB-223_1_large.jpg?v=1648618726",
    name: "Product 1",
    price: 49.99,
    stock: 15,
    quantity: 0
  },
];
const subTotal = 4000;
const tax = Math.round(subTotal * 0.18);
const ShippingCharges = 200;
const discount = 400;
const total = subTotal + tax + ShippingCharges - discount
const Cart = () => {
  const [couponCode, setCouponCode] = useState<string>("")
  const [isValidCoupon, setIsValidCoupon] = useState<boolean>(false);

  useEffect(() =>{
    const timeOutId = setTimeout(() => {
      if(Math.random() > 0.5) setIsValidCoupon(true);
      else setIsValidCoupon(false)
    }, 1000)
    return () =>{
      clearTimeout(timeOutId)
      setIsValidCoupon(false)
    }
  }, [couponCode])
  return (
    <div className="cart">
      <main>
        { cartItems.length > 0 ?
         cartItems.map((i,idx) =>(
          <CartItem key={idx} cartItem={i}/>
        )) : <h1>No items on cart</h1>
        }
      </main>
      <aside>
        <p>Subtotal : ₹{subTotal}</p>
        <p>Shipping Charger : ₹{ShippingCharges}</p>
        <p>tax : ₹{tax}</p>
        <p>Discount : <em> - ₹{discount}</em></p>
        <p><b>Subtotal : ₹{total}</b></p>
        <input type="text" 
      placeholder="Coupon Code" 
      value={couponCode}
      onChange={(e) => setCouponCode(e.target.value)}
      />
      {
        couponCode &&(
          isValidCoupon ?(
            <span className="Green">
              ₹{discount} off using the <code>{couponCode}</code>
            </span>
          ) : (
            <span>Invalid Code <VscError/> </span>
            )
        )
      }
      {cartItems.length > 0 && <Link className="checkout-link" to="/shipping"> CheckOut</Link> }
      </aside>
    </div>
  )
}

export default Cart