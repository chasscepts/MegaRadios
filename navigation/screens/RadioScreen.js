import { StyleSheet, Text, View } from 'react-native';
import screens from '../../utils/screens';
import VectorIcon from '../../components/VectorIcon';

const RadioScreen = () => (
  <View style={styles.screen}>
    <VectorIcon path={screens.RADIO.path} color="#ff0688" size={72} />
    <Text>This is Radio</Text>
  </View>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RadioScreen;
