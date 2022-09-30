import { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import AudioPlayerView, { AudioPlayer } from '../../components/AudioPlayerView';
import StationsPanel from '../../components/StationsPanel';
import stationsManager from '../../utils/stations';
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

  useEffect(() => {
    stationsManager.getLastPlayed()
      .then((station) => AudioPlayer.load(station.streamUrl))
      .then(() => setStation(station))
      .catch(() => {});
  }, []);

  const handleStationChange = (station) => {
    AudioPlayer.load(station.streamUrl)
      .then(() => {
        setStation(station);
        stationsManager.setLastPlayed(station);
      })
      .catch(() => {});
  };

  return (
    <View style={styles.container}>
      <AudioPlayerView station={station} setStation={handleStationChange} />
      <ImageBackground style={styles.list} source={bg}>
        <StationsPanel station={station} onStationChange={handleStationChange} />
      </ImageBackground>
    </View>
  );
};

export default RadioScreen;
