import { useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { TravelContext } from "../App";
import { fetchPlaceImage } from "../api/unsplashApi";
import "../styles/ExploreDetail.scss";

const ExploreDetail = () => {
  const [id] = useSearchParams();
  /* const placeId = searchParams.get("pid"); */

  const { places } = useContext(TravelContext);

  const [place, setPlace] = useState(null);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || places.length === 0) return;

    const found = places.find(
      (item) => item.properties.place_id === id
    );

    setPlace(found);
  }, [id, places]);

  useEffect(() => {
    if (!place?.properties?.name) return;

    const loadImage = async () => {
      const img = await fetchPlaceImage(place.properties.name);
      setImage(img);
      setLoading(false);
    };

    loadImage();
  }, [place]);

  if (!place) return <p>여행지 정보를 찾을 수 없습니다.</p>;
  if (loading) return <p>로딩중...</p>;

  const {
    name,
    website,
    district,
    categories,
    address_line1,
    address_line2,
    country,
    city,
  } = place.properties;

  return (
    <div className="explore-detail">
      <img src={image} alt={name} />

      <h1>{name}</h1>

      <ul className="info">
        {categories && (
          <li>
            <strong>카테고리</strong>
            <span>{categories.replaceAll(".", " · ")}</span>
          </li>
        )}

        {district && (
          <li>
            <strong>지역</strong>
            <span>{district}</span>
          </li>
        )}

        {(address_line1 || address_line2) && (
          <li>
            <strong>주소</strong>
            <span>
              {address_line1} {address_line2}
            </span>
          </li>
        )}

        {(city || country) && (
          <li>
            <strong>위치</strong>
            <span>
              {city} / {country}
            </span>
          </li>
        )}

        {website && (
          <li>
            <strong>웹사이트</strong>
            <a href={website} target="_blank" rel="noopener noreferrer">
              {website}
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};

export default ExploreDetail;
