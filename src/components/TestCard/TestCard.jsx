import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { FaArrowAltCircleRight } from "react-icons/fa";

const TestCard = ({test}) => {

    return (
        <div>
            <div>
                <img className="w-full h-[250px] rounded-tl-2xl" src={test.image} alt="test" />
            </div>
            <div className="p-5 bg-sec text-white rounded-br-2xl">
                <h3 className="font-bold text-2xl mb-5">{test.title}</h3>
                <div>
                    <h3 className="font-semibold bg-prime  rounded-full mb-2">Avaiable Dates :</h3>
                    <ul className=" flex justify-between px-5 mb-5">
                        {test.availableDates.map(data => <li key={data}>{data}</li>)}
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold bg-prime py-2  rounded-full mb-2">Booking available slots : {test.slots}</h3>
                </div>
                <p className="mt-5">{test.shortDescription}</p>
                <Link to={`/test-details/${test._id}`}>
                    <button className="font-bold hover:bg-prime transition ease-linear uppercase py-2 px-5 mt-5 bg-white rounded-full text-sec flex items-center gap-2">Details <FaArrowAltCircleRight></FaArrowAltCircleRight></button>
                </Link>
            </div>
        </div>
    );
};

TestCard.propTypes = {
    test: PropTypes.object.isRequired
}

export default TestCard;