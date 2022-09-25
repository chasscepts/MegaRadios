import { useState } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import AudioPlayer from '../../components/AudioPlayer';
import StationsPanel from '../../components/StationsPanel';
import bg from '../../assets/images/glassy.jpg';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
});

const RadioScreen = () => {
  const [station, setStation] = useState(null);

  return (
    <View style={styles.container}>
      <AudioPlayer station={station} setStation={setStation} />
      <ImageBackground style={styles.list} source={bg}>
        <StationsPanel station={station} onStationChange={setStation} />
      </ImageBackground>
    </View>
  );
};

export default RadioScreen;
