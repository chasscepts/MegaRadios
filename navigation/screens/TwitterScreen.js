import { StyleSheet, Text, View } from 'react-native';
import screens from '../../utils/screens';
import VectorIcon from '../../components/VectorIcon';

const TwitterScreen = () => (
  <View style={styles.screen}>
    <VectorIcon path={screens.TWITTER.path} color="#0006ff" size={144} />
    <Text>This is Twitter</Text>
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

export default TwitterScreen;
