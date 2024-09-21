type GeographicCoordinates = {
  latitude: number
  longitude: number
}

export type Vector3 = {
  x: number
  y: number
  z: number
}
export type Unit = 'km' | 'miles' | string

type Quaternions = {
  q0: number
  q1: number
  q2: number
  q3: number
}

export type AstronomicalData = {
  centroid_coordinates: GeographicCoordinates
  dscovr_j2000_position: Vector3
  lunar_j2000_position: Vector3
  sun_j2000_position: Vector3
  attitude_quaternions: Quaternions
}

export type NaturalItem = {
  coords: AstronomicalData
  date: Date
  image: string
}
