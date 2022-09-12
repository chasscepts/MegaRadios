import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import screens from '../utils/screens';
import VectorIcon from '../components/VectorIcon';
import RadioScreen from './screens/RadioScreen';
import TwitterScreen from './screens/TwitterScreen';
import ToolBar from '../components/Toolbar';

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  body: {
    flex: 1,
  },
});

const Tab = createBottomTabNavigator();

const MainNavigation = () => (
  <SafeAreaView style={styles.container}>
    <ToolBar />
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName={screens.RADIO.name}
          backBehavior="history"
          detachInactiveScreens={false}
          screenOptions={({ route: { name } }) => ({
            tabBarIcon: ({ color, size }) => {
              let path;
              if (name === screens.RADIO.name) {
                path = screens.RADIO.path;
              } else if (name === screens.TWITTER.name) {
                path = screens.TWITTER.path;
              }

              return <VectorIcon path={path} size={size} color={color} />;
            },
            tabBarStyle: {
              padding: 10,
              height: 60,
            },
            tabBarLabelStyle: {
              paddingBottom: 5,
              paddingTop: 5,
            },
            headerShown: false,
          })}
        >
          <Tab.Screen
            name={screens.RADIO.name}
            component={RadioScreen}
          />
          <Tab.Screen
            name={screens.TWITTER.name}
            component={TwitterScreen}
          />
        </Tab.Navigator>
      </NavigationContainer>
  </SafeAreaView>
);

export default MainNavigation;
