import React, { useContext } from "react";
import { TripContext } from "../context/TripContext";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

import "../styles/Mytrip.scss";

const Mytrip = () => {

  const { trips, loading } = useContext(TripContext);
  const { user } = useContext(AuthContext);


  // 🔥 Firestore 로딩중
  if (loading) {

    return <h2>불러오는 중...</h2>;

  }


  // 🔥 로그인 안된 경우
  if (!user) {

    return (

      <div className="empty-trip">

        <img src="/img/empty-trip.jpg" />

        <h2>로그인이 필요합니다</h2>

        <Link to="/login" className="login-btn">
          로그인 하러가기
        </Link>

      </div>

    );

  }


  // 🔥 로그인 했지만 여행 없음
  if (trips.length === 0) {

    return (

      <div className="empty-trip">

        <img src="/img/empty-trip.jpg" />

        <h2>아직 저장된 여행이 없습니다</h2>

      </div>

    );

  }



  // 🔥 정상 출력
  return (

    <div className="mytrip-container">

      <h1>My Trip</h1>

      <ul className="trip-list">

        {trips.map((trip) => (

          <li key={trip.id} className="trip-item">

            <img
              src={trip.image || "/img/no-image.jpg"}
            />

            <div>

              <h3>{trip.name}</h3>

              <p>{trip.country}</p>

            </div>

          </li>

        ))}

      </ul>

    </div>

  );

};

export default Mytrip;