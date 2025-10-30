import "../CSS/newscard.css";

const NewsCard = ({news, index}) => {
    // Determine color class based on index
    const colorClass = `color-${index % 3}`;

    return (
        <div className={`news-card ${colorClass}`}>
           {/* Title */}
           <h2 className="card-title">{news["Article Name"] || 'N/A'}</h2>

                <div className="news-details">
                    <label>{news["News Channel"] || 'N/A'}</label>
                </div>
                <div className="news-details">
                    <label>{news["Published Date"] || 'N/A'}</label>
                </div>
                <div className="news-details">
                    <label>{news["Summary"] || 'N/A'}</label>
                </div>
                <div className="news-details">
                    <label>{news["URL"] || 'N/A'}</label>
                </div>
        </div>
    );
}

export default NewsCard;