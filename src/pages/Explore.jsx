import { TravelContext } from "../App";
import React, { useState, useContext, useEffect } from 'react';
// Import Swiper React components
import { Link } from "react-router-dom";
import { fetchPlaceImage } from "../api/unsplashApi";
import { TripContext } from "../context/TripContext";
import '../styles/Home.scss';

const Explore = () => {
    const { addTrip } = useContext(TripContext);
    const { places, loading } = useContext(TravelContext);
    const [images, setImages] = useState({});
    
    useEffect(() => {
      if (!places || places.length === 0) return;
    
      const loadImages = async () => {
        const imageMap = {};
    
        for (const place of places) {
          const name = place?.properties?.name;
          if (name) {
            imageMap[name] = await fetchPlaceImage(name);
          }
        }
    
        setImages(imageMap);
      };
    
      loadImages();
    }, [places]);
    
      if (loading || !Array.isArray(places)) {
      return <p>로딩중...</p>;
    }
    return (
        <div className="home">
           <h2>추천 여행지</h2>
      
            <ul className="list">
                {places.map((place) => {
                const name = place.properties.name;

                return (
                    <li key={place.properties.place_id} className="place-card">
                        <Link to={`/explore/detail?pid=${place.properties.place_id}`}>
                            <img
                                src={images[name] || "/img/no-image.jpg"}
                                alt={name}
                            />
                            <h3>{name}</h3>
                            <p>{place.properties.opening_hours}</p>
                        </Link>
                        <button className="btn"
                            onClick={() =>
                                addTrip({
                                name: place.properties.name,
                                country: place.properties.country,
                                status: "planned",
                                createdAt: new Date()
                                })
                            }
                        >❤️ 찜하기</button>
                    </li>
                );
                })}
            </ul>
        </div>
    );
};

export default Explore;