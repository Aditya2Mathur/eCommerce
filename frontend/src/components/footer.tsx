import { FaInstagram, FaLinkedin, FaPinterest, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
const Footer = () => {
    return (
        <div className="footer">
           
           
            
                <div className="link">
                    <h4>About</h4>
                    <ul className="about">
                        <li><Link to={"/home"} >How it Work</Link></li>
                        <li><Link to={"/search"} >Our Packages</Link></li>
                        <li><Link to={"/contact"} >Promotions</Link></li>
                        <li><Link to={"/offer"} >Refer</Link></li>
                    </ul>

                </div>
                <div className="link">
                    <h4>Quick Link</h4>
                    <ul className="quicklink">
                        <li><Link to={"/home"} >Home</Link>  </li>
                        <li> <Link to={"/search"} >Shop</Link>    </li>
                        <li>  <Link to={"/contact"} >Contact</Link> </li>
                        <li>  <Link to={"/offer"} >Offer</Link> </li>
                        <li>   <Link to={"/About Us"} >About Us</Link> </li>
                    </ul>
                </div>
                <div className="social_media">
                    <h4>Social Links</h4>
                    <ul className="socialIcons">
                        <li> <Link to={"/home"} ><FaLinkedin/></Link></li>
                        <li><Link to={"/search"} ><FaInstagram/></Link></li>
                        <li><Link to={"/contact"} > <FaTwitter/> </Link></li>
                        <li><Link to={"/offer"} ><FaPinterest/></Link></li>
                        <li> <Link to={"/About Us"} ><FaYoutube/></Link></li>
                    </ul>
                    <Link to={"/"}><img src="/logos/logoCompany.png" alt="" /></Link>
                </div>
            </div>


    )
}

export default Footer