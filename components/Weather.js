import React, { useEffect, useState } from 'react'
import { Dimensions, Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import { clouds, haze, rainy, snow, sunny } from '../assets/bakcgroundImages/index'
import SearchBar from './SearchBar';

export default function Weather({ weatherData, fetchWeatherData }) {

    const [backgroundImage, setBackgroundImage] = useState(null)

    const { weather,
        name,
        main: { temp, humidity, icon },
        wind: { speed },
        sys: { country },
        coord: { lon, lat } } = weatherData;
    const [{ main }] = weather;

    const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`

    useEffect(() => {
        setBackgroundImage(getBackgroundImg(main))
    }, [weatherData])

    function getBackgroundImg(weather) {
        if (weather === 'Snow') return snow
        if (weather === 'Clear') return sunny
        if (weather === 'Rain') return rainy
        if (weather === 'Haze') return haze
        if (weather === 'Clouds') return clouds
        return haze
    }

    let textColor = backgroundImage !== sunny ? 'white' : 'black'

    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.backgroundImg}
                source={backgroundImage}
                resizeMode="cover">
                <SearchBar fetchWeatherData={fetchWeatherData} />
                <View style={{ justifyContent: 'space-between', flex: 1 }}>
                    <View style={{ paddingHorizontal: 10, alignItems: 'center' }}>
                        <Text style={{ ...styles.headerText, color: textColor, fontFamily: 'Lato-bold', fontSize: 50, }}>{name}, {country}</Text>
                        <Text style={{ ...styles.headerText, color: textColor, fontFamily: 'Lato-bold', fontSize: 60 }}>{temp}°C</Text>
                        <Image style={{ width: 60, height: 60 }} source={{ uri: iconUrl }} />
                    </View>
                    <View style={styles.extrainfo}>
                        <Text style={{ ...styles.headerText, color: textColor, fontFamily: 'Lato-bold', fontSize: 100 }}>{main}</Text>
                        <View style={{ borderTopWidth: 3, marginBottom: 20, borderColor: 'white' }} />
                        <View style={{ backgroundColor: 'rgba(0,0,0,0.5)',borderColor: 'rgba(0,0,0,0.5)', borderRadius: 20, flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, padding: 15 }}>
                            <View style={styles.info}>
                                <Text style={styles.title}>Humidity</Text>
                                <View style={{flexDirection: 'row', paddingBottom: 5}}>
                                <Text style={styles.value}>{humidity}</Text>
                                <Text style={styles.value}>%</Text>
                                    </View>  
                                <View style={styles.infobar} >
                                    <View style={{
                                        width: humidity / 2,
                                        height: 5,
                                        backgroundColor: '#69F0AE'
                                    }} />
                                </View>
                            </View>
                            <View style={styles.info}>
                                <Text style={styles.title}>Wind Speed</Text>
                                <Text style={styles.title}>{speed}</Text>
                                <Text style={styles.value}>m/s</Text>
                                <View style={styles.infobar}>
                                    <View style={{
                                        width: speed / 2,
                                        height: 5,
                                        backgroundColor: '#69F0AE'
                                    }} />
                                </View>
                            </View>
                        </View>
                    </View>

                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundImg: {
        flex: 1,
        width: Dimensions.get('screen').width
    },
    headerText: {
        fontSize: 36,
        marginTop: 10,
    },
    extrainfo: {
        // flexDirection: 'row',
        padding: 10,
        // marginTop: 10,
        justifyContent: 'space-between',


    },
    info: {
        width: Dimensions.get('screen').width / 2.5,
        // backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 15,
        padding: 10,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'white'
    },
    title: {
        fontSize: 20,
        color: 'white',
        fontFamily: 'Lato-Regular'
    },
    value: {
        fontSize: 15,
        color: 'white',
        fontFamily: 'Lato-Regular'
    },
    infobar: {
        width: 50,
        height: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.5)'
    },
})
