import React, { useState, useEffect } from "react";
import "./WeatherComponent.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import moment from "moment";

function WeatherComponent() {
  let WeatherApiKey =
    // "http://api.weatherapi.com/v1/forecast.json?key=30a9529e2c9b4034a6a12356232308&q=chennai&days=6&aqi=no&alerts=no";
    "https://api.npoint.io/e24597091b6a434e0a18";
  const [ApiData, ApiSetData] = useState({});
  useEffect(() => {
    fetch(WeatherApiKey)
      .then((data) => data.json())
      .then((data) => ApiSetData({ ...data }));
  }, []);
  const { location, current, forecast } = ApiData;
  return (
    <>
      <Container className=" container-bg mt-5 ">
        <Row>
          <Col md={12}>
            <h1>My Weather App</h1>{" "}
            {location && (
              <h3 className="p-3">
                {location.name} {"In"} {location.region}{" "}
              </h3>
            )}{" "}
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <h1 className="">
              {current && (
                <img src={current.condition.icon} alt="weatherIcon" />
              )}

              {current && <h3 className=""> {current.condition.text}</h3>}
            </h1>
          </Col>
          <Col className="mt-4" md={4}>
            {" "}
            {current && <h1> {current.temp_c}°C</h1>}
          </Col>
          <Col md={4} className="">
            {current && (
              <h5 className="text-center">
                {" "}
                wind_kph : {current.wind_kph} kmph
              </h5>
            )}
            {current && (
              <h5 style={{ letterSpacing: "2px" }} className="text-center">
                {" "}
                Precip_in : {current.precip_in}{" "}
              </h5>
            )}
            {current && (
              <h5 className="text-center">
                {" "}
                pressure_in : {current.pressure_in}{" "}
              </h5>
            )}
          </Col>
        </Row>
        <Row>
          {forecast &&
            forecast.forecastday.map((data) => (
              <Col className="p-3">
                <h3 className="p-3 d-flex justify-content-center">
                  {" "}
                  {moment(data["date"]).format("dddd")}{" "}
                </h3>
                <h3 className="p-3 d-flex justify-content-center">
                  {" "}
                  <img
                    className="md-2"
                    src={data.day.condition.icon}
                    alt="weather Icon"
                  />{" "}
                </h3>
                <h3 className="p-3 d-flex justify-content-center">
                  {" "}
                  {data.day.maxtemp_f} °C
                </h3>
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
}

export default WeatherComponent;
