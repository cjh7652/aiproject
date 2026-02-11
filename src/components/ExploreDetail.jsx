import { useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { TravelContext } from "../App";
import { fetchPlaceImage } from "../api/unsplashApi";
import { TripContext } from "../context/TripContext";
import "../styles/ExploreDetail.scss";

const ExploreDetail = () => {
  const { addTrip } = useContext(TripContext);
  const [searchParams] = useSearchParams();
  const placeId = searchParams.get("pid");

  const { places, loading: contextLoading } = useContext(TravelContext);

  const [place, setPlace] = useState(null);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);

  // place 찾기
  useEffect(() => {
    if (!placeId || places.length === 0) return;

    const found = places.find(
      (item) => String(item.properties.place_id) === placeId
    );

    setPlace(found);
  }, [placeId, places]);

  // 이미지 가져오기
  useEffect(() => {
    if (!place?.properties?.name) return;

    const loadImage = async () => {
      const img = await fetchPlaceImage(place.properties.name);
      setImage(img);
      setLoading(false);
    };

    loadImage();
  }, [place]);

  // 🔵 로딩 먼저 체크
  if (contextLoading || loading) return <p>로딩중...</p>;

  if (!place) return <p>여행지 정보를 찾을 수 없습니다.</p>;

  const {
    name,
    website,
    district,
    categories,
    address_line1,
    address_line2,
    country,
    city,
  } = place.properties; //객체 구조분해할당

  return (
    <div className="explore-detail">
      <img src={image || "/img/no-image.jpg"} alt={name} />

      <h1>{name}</h1>

      <ul className="info">
        {Array.isArray(categories) && (
          <li>
            <strong>카테고리</strong>
            <span>
              {categories
                .map((c) => c.replaceAll(".", " · "))
                .join(", ")}
            </span>
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
    </div>
  );
};

export default ExploreDetail;
