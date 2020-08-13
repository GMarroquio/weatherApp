import styled from "styled-components/native";
import Constants from "expo-constants";

export const Container = styled.View`
  flex: 1;
  padding: 0 24px;
  padding-top: ${Constants.statusBarHeight + 25}px;
  background: #fff;
  align-items: center;
  justify-content: center;
`;

export const Locale = styled.View`
  flex: 1;
`;

export const Button = styled.TouchableOpacity``;

export const Info = styled.View`
  align-self: flex-start;
  flex-direction: row;
  align-items: center;
`;

export const LocationText = styled.Text`
  color: #001;
  font-size: 30px;
  font-weight: bold;
`;

export const DateText = styled.Text`
  color: #001;
  font-size: 20px;
`;

export const Temp = styled.View`
  padding: 5px;
  border-radius: 8px;
  margin: 5px;
  align-items: center;
  justify-content: center;
  flex: 2;
`;

export const TempWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const TempDescription = styled.Text`
  font-size: 20px;
`;

export const TodayText = styled.Text`
  font-size: 25px;
  font-weight: bold;
`;

export const TempDegree = styled.Text`
  color: #001;
  font-size: 60px;
  font-weight: bold;
  margin-left: 5px;
`;

export const MoreInfo = styled.View`
  flex-direction: row;
  flex: 1;
`;
export const MoreInfoWrapper = styled.View`
  flex: 1;
  align-items: center;
`;

export const MoreInfoNumber = styled.Text`
  font-size: 30px;
  font-weight: bold;
`;

export const MoreInfoText = styled.Text`
  font-size: 20px;
`;
