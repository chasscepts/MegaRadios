import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AudioPlayer from '../../components/AudioPlayer';
import StationsPanel from '../../components/StationsPanel';

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
      <View style={styles.list}>
        <StationsPanel station={station} onStationChange={setStation} />
      </View>
    </View>
  );
};

export default RadioScreen;
