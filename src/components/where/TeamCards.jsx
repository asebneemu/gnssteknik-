const TeamCards = ({ team }) => {
    return (
      <div className="w-10/12 mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 py-10">
        {team.map((member, index) => (
          <div key={index} className="bg-white p-6 shadow-lg rounded-lg text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <img src={member.photo} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
            <p className="text-sm text-gray-600">{member.role}</p>
            <div className="flex justify-center gap-4 mt-4">
              {member.socials.map((social, i) => (
                <a key={i} href={social.link} className="text-blue-500 hover:text-blue-700 text-lg">
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default TeamCards;
  