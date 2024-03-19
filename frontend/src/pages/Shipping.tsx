import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { FaArrowCircleLeft } from "react-icons/fa"

const Shipping = () => {
    const [shippingInfo, setShippingInfo] = useState({
        name: "",
        address: "",
        city: "",
        state: "",
        country: "",
        pinCode: "",
        phone:"",
    })
    const onChangeHandler= (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>{
        setShippingInfo((prev) => ({...prev, [e.target.name]: e.target.value}))
    }
    const Navigate = useNavigate();
  return (
    
    <div className="shipping">
        <button className="backBtn" onClick={()=>Navigate("/cart")}>
            <FaArrowCircleLeft />
        </button>
        <form >
            <h1>Shipping Address</h1>
            <input required type="text" name="name" placeholder="Name" value={shippingInfo.name}
            onChange={onChangeHandler}/>
            <input required type="text" name="address" placeholder="address" value={shippingInfo.address}
            onChange={onChangeHandler}/>
            <input required type="text" name="city" placeholder="city" value={shippingInfo.city}
            onChange={onChangeHandler}/>
            <input required type="text" name="state" placeholder="state" value={shippingInfo.state}
            onChange={onChangeHandler}/>
            <select name="country" onChange={onChangeHandler} required value={shippingInfo.country}>
                <option value="India">Choose Country</option>
                <option value="India">  India</option>
                <option value="Nepal">  Nepal </option>
                <option value="Shree Lanka">  Shree Lanka </option>
            </select>
            <input required type="text" name="phone"  placeholder="phone" value={shippingInfo.phone}
            onChange={onChangeHandler}/>
            <button className="submitBTn" type='submit'> Buy Now</button>
        </form>
    </div>
  )
}

export default Shipping
