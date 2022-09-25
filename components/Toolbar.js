import { Image, View, StyleSheet } from "react-native";
import title from '../assets/images/megatext.png';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#3A0101',
  },
  title: {
    width: 180,
    height: 22,
    resizeMode: "contain",
  },
});

const ToolBar = () => (
  <View style={styles.container}>
    <Image style={styles.title} source={title} />
  </View>
);

export default ToolBar;
