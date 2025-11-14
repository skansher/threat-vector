import React, { useState, useEffect } from 'react';
import newsData from '../data/news.json';
import Header from "./Header.jsx";
import Card from "../Components/NewsCard.jsx";
import '../CSS/news.css';

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
        <div class="page-container">
            <Header />
                <div className="news-banner mb-4">
                  <h1>Recent Cyber Attacks</h1>
                  <p className="welcome-subtitle">Stay up to date on active threats in the national and global environment</p>
                </div>

                <div className="container-fluid pb-5">
                    <div className="row g-4 mt-3">
                        {article.length > 0 ? (
                            article.map((art, index) => (
                                <div key={index} className="col-12 col-md-6 d-flex justify-content-center">
                                    <Card news={art} index={index} />
                                </div>
                            ))
                        ) : (
                            <div className="col-12">
                                <p>No articles found</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
    );
}

export default News;