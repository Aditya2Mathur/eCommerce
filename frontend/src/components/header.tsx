import { FaSignInAlt, FaSearch, FaShoppingBag, FaSignOutAlt, FaUser } from 'react-icons/fa';

import { Link } from 'react-router-dom';
import "../styles/header.scss"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoCompany from "../assets/images/channelLogo/logoCompany.png"

const user = { _id: "", role: "" }
const Header = () => {
  const logoutHandler = () => {
    setIsOpen(false)
  };
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <nav className="header">
      <div className='container1'>
        <button className='homeBtn' onClick={() => navigate("/")}><img src={logoCompany} alt="logo" /> </button>
      </div>
      <div className='container2'>
        <Link className='ink' onClick={() => setIsOpen(false)} to={"/"}>
          HOME
        </Link>
        <Link className='ink' onClick={() => setIsOpen(false)} to={"/search"}>
          Shop
        </Link>
        <Link className='ink' onClick={() => setIsOpen(false)} to={"/"}>
          Contact
        </Link>
        <Link className='ink' onClick={() => setIsOpen(false)} to={"/"}>
          Offer
        </Link>
      </div>
      <div className='container3'>

        <Link onClick={() => setIsOpen(false)} to={"/search"}>
          <FaSearch />
        </Link>
        <Link onClick={() => setIsOpen(false)} to={"/cart"}>
          <FaShoppingBag />
        </Link>

        {user?._id ? (
          <>
            <button onClick={() => setIsOpen((prev) => !prev)}>
              <FaUser />
            </button>
            <dialog open={isOpen}>
              <div>
                {user.role === "admin" && (
                  <Link onClick={() => setIsOpen(false)} to="/admin/dashboard">
                    Admin
                  </Link>
                )}

                <Link onClick={() => setIsOpen(false)} to="/orders">
                  Orders
                </Link>
                <button onClick={logoutHandler}>
                  <FaSignOutAlt />
                </button>
              </div>
            </dialog>
          </>
        ) : (
          <Link to={"/login"}>
            <FaSignInAlt />
          </Link>
        )}</div>
    </nav>
  )
}

export default Header
