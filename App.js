import React, { useEffect, useState } from 'react'
import { ActivityIndicator, DrawerLayoutAndroidBase, StatusBar, StyleSheet, Text, View } from 'react-native'
import SearchBar from './components/SearchBar';
import Weather from './components/Weather';

const API_KEY = "9de173c630a48a58999180c48427d169";
const App = () => {

  const [weatherData, setWeatherData] = useState(null);
  const [loaded, setLoaded] = useState(true);

  async function fetchWeatherData(cityName) {
    setLoaded(false)
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
    try {
      const response = await fetch(API);
      if (response.status == 200) {
        const data = await response.json();
        setWeatherData(data);
      } else {
        setWeatherData(null);
      }
      setLoaded(true);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchWeatherData('jakarta')
    console.log(weatherData)
  }, [])

  if (!loaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color='gray' size={36} />
      </View>
    )
  }

  else if (weatherData === null) {
    return (
    <View style={styles.container}>
      <StatusBar barStyle="auto" />
      <SearchBar fetchWeatherData={fetchWeatherData}  />
      <Text>City Not found!</Text>
    </View>

    )
  }

  return (
    <View style={styles.container}>
      <Weather weatherData={weatherData} fetchWeatherData={fetchWeatherData} />
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
