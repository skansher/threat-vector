import "../CSS/newscard.css";
import spyImage from "../assets/Spy.webp"; 

const NewsCard = ({ news, index }) => {
  const hasUrl = news["URL"] && news["URL"] !== "N/A";

  const handleCardClick = () => {
    if (hasUrl) {
      window.open(news["URL"], "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div 
      className={`card news-card ${hasUrl ? 'clickable' : 'inactive'}`}
      onClick={handleCardClick}
      role={hasUrl ? "button" : undefined}
      tabIndex={hasUrl ? 0 : undefined}
    >
      <div className="card-header p-3">
        <div className="col-sm-2 d-flex justify-content-center align-items-center">
          <img src={spyImage} alt="Spy" className="news-image" />
        </div>
        <div className="col-sm-10 d-flex justify-content-start align-items-center">
          <h2 className="card-title m-0">{news["Article Name"] || "N/A"}</h2>
        </div>
      </div>

      <div className="card-body p-3">
        <div className="news-details">
          <label className="detail-label">Channel:</label>
          <span>{news["News Channel"] || "N/A"}</span>
        </div>

        <div className="news-details">
          <label className="detail-label">Published:</label>
          <span>{news["Published Date"] || "N/A"}</span>
        </div>

        <div className="news-details">
          <label className="detail-label">Description:</label>
          <span className="description-text">{news["Summary"] || "N/A"}</span>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;