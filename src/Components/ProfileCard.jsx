import "../CSS/profilecard.css";

const ProfileCard = () => {
    return (
        <div className="card">
            <div className="title1">Actor Name (replace with function) </div>
                <div className="profile-details"> Last Dated Attack </div>
                <div className="profile-details"> Country of Origin </div>
                <div className="profile-details"> Targeted Industry </div>
                <div className="profile-details"> Description </div>
                <div className="profile-details"> Motive </div>
                <div className="profile-details"> TTPs </div>
                <div className="profile-details"> Mitre Framework Recommendations/CVES </div>
                <div className="profile-details"> Resources </div>
        </div>
    );
}

export default ProfileCard;