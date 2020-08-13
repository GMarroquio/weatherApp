import React, { useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image, Text } from "react-native";
import * as Location from "expo-location";

import {
  Container,
  Locale,
  Info,
  Button,
  LocationText,
  Temp,
  TodayText,
  TempWrapper,
  TempDescription,
  TempDegree,
  MoreInfo,
  MoreInfoWrapper,
  MoreInfoNumber,
  MoreInfoText,
} from "./styles";

import api from "../../services/api";
import credentials from "../../../credentials.json";

const Weather: React.FC = () => {
  const [city, setCity] = useState("");
  const [icon, setIcon] = useState("");
  const [temp, setTemp] = useState(0);
  const [feels, setFeels] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState<Location.LocationData>();
  const [permition, setPermition] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setPermition(false);
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();

    location &&
      api
        .get("weather", {
          params: {
            lat: location?.coords.latitude,
            lon: location?.coords.longitude,
            appid: credentials.appid,
            units: "metric",
            lang: "pt_br",
          },
        })
        .then((response) => {
          const data = response.data;
          setTemp(data.main.temp);
          setFeels(data.main.feels_like);
          setHumidity(data.main.humidity);
          setWind(data.wind.speed);
          setDescription(data.weather[0].description);
          setCity(data.name);
          setIcon(data.weather[0].icon);
        });
    setLoading(false);
  }, [temp, location]);

  const handleRefresh = async () => {
    setLoading(true);
    const response = await api.get("weather", {
      params: {
        lat: location?.coords.latitude,
        lon: location?.coords.longitude,
        appid: credentials.appid,
        units: "metric",
        lang: "pt_br",
      },
    });
    setTemp(response.data.main.temp);
    setFeels(response.data.main.feels_like);
    setHumidity(response.data.main.humidity);
    setWind(response.data.wind.speed);
    setDescription(response.data.weather[0].description);
    setCity(response.data.name);
    setIcon(response.data.weather[0].icon);
    setLoading(false);
  };

  return (
    <Container>
      {permition ? (
        loading ? (
          <Text
            style={{
              textAlignVertical: "center",
              flex: 1,
            }}
          >
            Carregando...
          </Text>
        ) : (
          <>
            <Info>
              <Locale>
                <LocationText>{city}</LocationText>
              </Locale>
              <Button onPress={() => handleRefresh()}>
                <MaterialCommunityIcons name="reload" size={30} color="black" />
              </Button>
            </Info>
            <Temp>
              <TodayText>Hoje</TodayText>
              <TempWrapper>
                <Image
                  source={{
                    uri: `https://openweathermap.org/img/wn/${icon}@4x.png`,
                  }}
                  style={{ height: 120, width: 120, resizeMode: "contain" }}
                />
                <TempDegree>{temp.toFixed(1)}°</TempDegree>
              </TempWrapper>
              <TempDescription>{description}</TempDescription>
            </Temp>
            <MoreInfo>
              <MoreInfoWrapper>
                <MoreInfoNumber>{feels.toFixed(1)}°</MoreInfoNumber>
                <MoreInfoText>Sensação</MoreInfoText>
              </MoreInfoWrapper>
              <MoreInfoWrapper>
                <MoreInfoNumber>{humidity}%</MoreInfoNumber>
                <MoreInfoText>Humidade</MoreInfoText>
              </MoreInfoWrapper>
              <MoreInfoWrapper>
                <MoreInfoNumber>{wind.toFixed(1)}km/h</MoreInfoNumber>
                <MoreInfoText>Vento</MoreInfoText>
              </MoreInfoWrapper>
            </MoreInfo>
          </>
        )
      ) : (
        <Text>Não foi possivel carregar localização!</Text>
      )}
    </Container>
  );
};

export default Weather;
