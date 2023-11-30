import { FaClock, FaFacebook, FaInstagram, FaMapMarked, FaPhoneAlt, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";


const Footer = () => {
    return (
        <footer className="footer p-10 bg-black text-white">
            <aside>
                <h2 className="text-3xl uppercase font-bold tracking-widest text-prime">Sheba</h2>
                <h3 className="font-semibold mb-5">Diagnostic Center</h3>
                <p>Mirpur-1, Dhaka-1216, Bangladesh</p>
                <p>2023 &copy; All rights reserved Sheba Diagnostic Center</p>
            </aside>
            <nav>
                <header className="footer-title">Contact</header>
                <p className="flex items-center gap-2"><FaPhoneAlt></FaPhoneAlt> Hotline : +8801700000000</p>
                <p className="flex items-center gap-2"><FaMapMarked></FaMapMarked> Address : Mirpur-1, Dhaka, Bangladesh</p>
                <p className="flex items-center gap-2"><FaClock></FaClock> Mon-Sat :  8:00AM - 7:00PM</p>
            </nav>
            <nav>
                <header className="footer-title">Quick Links</header>
                <Link to="/">Home</Link>
                <Link to="/all-tests">All tests</Link>
                <Link to="/blog">Blog</Link>
            </nav>
            <nav>
                <header className="footer-title">Follow us on</header>
                <div>
                    <Link to="www.facebook.com" className="flex items-center gap-2 text-lg"><FaFacebook></FaFacebook> Facebook</Link>
                    <Link to="www.twitter.com" className="flex items-center gap-2 text-lg"><FaTwitter></FaTwitter> Twitter</Link>
                    <Link to="www.instagram.com" className="flex items-center gap-2 text-lg"><FaInstagram></FaInstagram> Instagram</Link>
                    <Link to="www.youtube.com" className="flex items-center gap-2 text-lg"><FaYoutube></FaYoutube> Youtube</Link>
                </div>
            </nav>
        </footer>
    );
};

export default Footer;