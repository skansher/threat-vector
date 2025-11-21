// import React, { useState, useEffect } from 'react';
// import infiltratorData from '../data/infiltrator_profiles.json';
// import Header from "./Header.jsx";
// import ProfileModal from "../Components/ProfileModal.jsx";
// import ITCard from '../Components/ITCard.jsx'; 
// import '../CSS/profilecard.css';

// const Infiltrators = () => {
//   const [profiles, setProfiles] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedProfile, setSelectedProfile] = useState(null);
//   const [selectedColorClass, setSelectedColorClass] = useState('');

//   useEffect(() => {
//     const profilesArray = Object.entries(infiltratorData).map(([key, value]) => ({
//       profileKey: key,
//       ...(Array.isArray(value) && value.length > 0 ? value[0] : {}),
//     }))
//     .filter(profile => profile.alias !== "Parse Error"); 
//     setProfiles(profilesArray);
//   }, []);

//   const handleCardClick = (profile, colorClass) => {
//     setSelectedProfile(profile);
//     setSelectedColorClass(colorClass);
//     setShowModal(true);
//   };

//   return (
//     <div className="page-container">
//       <Header />
      
//       {/* Banner */}
//       <div className="alt-banner mt-5 mb-4 ms-4 me-4">
//         <h1>IT Infiltrators</h1>
//         <p className="welcome-subtitle">Aggregated list of IT Infiltrators.</p>
//         <br/>
//       </div>

//       {/* Bootstrap Grid for Cards */}
//       <div className="container-fluid px-4">
//         <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
//           {profiles.length > 0 ? (
//             profiles.map((profile, index) => (
//               <div className="col" key={profile.profileKey}>
//                 <ITCard
//                 profile={profile}
//                   index={index}
//                   onCardClick={handleCardClick}
//                 />
//               </div>
//             ))
//           ) : (
//             <div className="col-12">
//               <p className="text-center">No profiles found</p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Modal */}
//       <ProfileModal 
//         show={showModal}
//         onHide={() => setShowModal(false)}
//         profile={selectedProfile}
//         colorClass={selectedColorClass}
//       />
//     </div>
//   );
// };

// export default Infiltrators;