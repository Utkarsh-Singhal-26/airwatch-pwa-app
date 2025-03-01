import { User } from "./user";

export interface UserSession {
  user: User;
  settings: {
    pushNotifications: boolean;
    dailyForecast: boolean;
    aqiAlerts: boolean;
    aqiThreshold: number;
    locationAccess: boolean;
    temperatureUnit: string;
  };
  dailyChallenge: {
    lastUpdated: number;
    completed: boolean;
    challenge: string;
  };
  recommendations: {
    lastUpdated: number;
    items: string[];
  };
  aqiData: {
    value: number;
    lastUpdated: number;
    location: {
      lat: number;
      lng: number;
      name: string;
    };
  };
  expiresAt: number;
}
