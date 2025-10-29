
import "../CSS/newscard.css";

const NewsCard = () => {
    return (
        <div className="card">
            <div className="title1"> Article Name </div>
                <div className="profile-details"> News name (channel, forum, etc.) </div>
                <div className="profile-details"> Date </div>
                <div className="profile-details"> Summary </div>
        </div>
    );
}

export default NewsCard;