export interface EnvironmentThreshold {
  id: number;
  coffeeLotId: number;
  minTemperature: number;
  maxTemperature: number;
  minHumidity: number;
  maxHumidity: number;
}

export interface EnvironmentThresholdFormValues {
  minTemperature: number;
  maxTemperature: number;
  minHumidity: number;
  maxHumidity: number;
}
