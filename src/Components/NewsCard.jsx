import "../CSS/newscard.css";
import spyImage from "../assets/Spy.webp"; 

const NewsCard = ({ news, index }) => {
  const colorClass = `color-${index % 3}`;

  return (
    <div className={`news-card ${colorClass}`}>

      {/* Header with image and title */}
      <div className="card-header">
        <img src={spyImage} alt="Spy" className="news-image" />
        <h2 className="card-title">{news["Article Name"] || "N/A"}</h2>
      </div>

      {/* News Details */}
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
        <span>{news["Summary"] || "N/A"}</span>
      </div>

      <div className="news-details">
        <label className="detail-label">URL:</label>
        <a href={news["URL"]} target="_blank" rel="noopener noreferrer">
          {news["URL"] || "N/A"}
        </a>
      </div>
    </div>
  );
};

export default NewsCard;