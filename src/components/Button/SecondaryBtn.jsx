import { FaArrowAltCircleRight } from "react-icons/fa";
import PropTypes from 'prop-types';

const SecondaryBtn = ({text}) => {
    return <button className=" font-bold hover:bg-white transition ease-linear uppercase py-5 px-10 bg-sec rounded-full text-white hover:text-sec flex items-center gap-2">{text} <FaArrowAltCircleRight></FaArrowAltCircleRight></button>
};

SecondaryBtn.propTypes = {
    text: PropTypes.string.isRequired
}

export default SecondaryBtn;