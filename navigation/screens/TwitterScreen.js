import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import screens from '../../utils/screens';
import VectorIcon from '../../components/VectorIcon';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    position: 'relative',
  },
  bg: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1d9bf0',
  },
  webview: {
    flex: 1,
    width: 300,
    height:  200,
    backgroundColor: 'transparent',
  },
});

const html = `
  <html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body>
    <div>
      <a class="twitter-timeline" datd-width="500" style="color:transparent;" href="https://twitter.com/chasscepts/lists/software-development-11837?ref_src=twsrc%5Etfw">
        Tweets By Megalectrics
      </a>
    </div>
    <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
  </body>
  </html>
`;

const TwitterScreen = () => (
  <View style={styles.screen}>
    <View style={styles.bg}>
      <VectorIcon path={screens.TWITTER.path} color="fff" size={144} />
    </View>
    <WebView
      style={styles.webview}
      originWhitelist={['*']}
      javaScriptEnabled={true}
      javaScriptCanOpenWindowsAutomatically={true}
      source={{
        html
      }}
    />
  </View>
);

export default TwitterScreen;
