import React, { useState, useContext } from "react";
import { TripContext } from "../context/TripContext";
import { Link } from "react-router-dom";
import "../styles/Mytrip.scss";

const MyTrip = () => {
    const { trips, deleteTrip } = useContext(TripContext);


  

  return (
    <div className="mytrip-container">
      <h1>My Trip</h1>

     
        <div className="trip-list">
           {trips.map(trip => (
                <div key={trip.id}>
                <h3>{trip.name}</h3>
                <p>{trip.country}</p>
                <button onClick={() => deleteTrip(trip.id)}>삭제</button>
                </div>
            ))}
        </div>

    </div>
  );
};

export default MyTrip;
