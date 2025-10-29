
import Header from "./Header.jsx";
import Card from "../Components/ProfileCard.jsx";

const Profile = () => {
    return (
       <div className="Home">
      <Header />
      <header className="App-header">
        Threat Profiles
        <Card />
      </header>
    </div>
    );
}

export default Profile;