import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";


const Team = () => {

    const [teamData, setTeamData] = useState([]);

    useEffect(() => {
        fetch('team.json')
            .then(res => res.json())
            .then(data => setTeamData(data))
    }, [])

    console.log(teamData);

    return (
        <div className="max-w-7xl mx-auto py-20">
            <Helmet>
                <title>Team | Sheba Diagnostic Center</title>
            </Helmet>
            <div>
            <h3 className="bg-prime text-white font-bold uppercase text-4xl py-5 text-center rounded-lg">Team</h3>
                <div className="grid lg:grid-cols-3 grid-cols-1 gap-10 my-10">
                    {
                        teamData.map((data, index) => <div
                            key={index}
                            className="card bg-base-100 shadow-xl">
                            <figure className="px-10 pt-10">
                                <img src={data.image} alt="Shoes" className="rounded-xl w-full h-80 object-cover" />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">{data.name}</h2>
                                <p>{data.position}</p>
                                <p className="bg-sec py-2 px-5 text-white rounded-full">{data.specialization}</p>
                                <p>Experience of {data.experience_years} years</p>
                                <div className="card-actions">
                                    
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Team;