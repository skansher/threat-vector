import React, { useState, useEffect } from 'react';
import newsData from '../data/news.json';
import Header from "./Header.jsx";
import Card from "../Components/NewsCard.jsx";

const News = () => {
    const [article, setArticles] = useState([]);

    useEffect(() => {
    const newsArray = Object.entries(newsData).map(([key, value]) => ({
      newsKey: key,
      ...value[0],
    }));

    setArticles(newsArray);
      }, []);
    return (
    <div>
      <Header />
      <div className="page-container">
        <h1>Recent Cyber Attacks</h1>

        <div className="news-container">
          {article.length > 0 ? (
            article.map((art, index) => (
              <Card key={index} news={art} index={index} />
            ))
          ) : (
            <p>No articles found</p>
          )}
        </div>
      </div>
    </div>
    );
}

export default News;