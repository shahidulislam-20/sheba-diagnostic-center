import { FaArrowAltCircleRight} from 'react-icons/fa';
import PropTypes from 'prop-types';

const PrimaryBtn = ({text}) => {
    return <button className=" font-bold hover:bg-white transition ease-linear uppercase py-5 px-10 bg-prime rounded-full text-sec flex items-center gap-2">{text} <FaArrowAltCircleRight></FaArrowAltCircleRight></button>
};

PrimaryBtn.propTypes = {
    text: PropTypes.string.isRequired
}

export default PrimaryBtn;