import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import screens from '../utils/screens';
import VectorIcon from '../components/VectorIcon';
import RadioScreen from './screens/RadioScreen';
import TwitterScreen from './screens/TwitterScreen';

const Tab = createBottomTabNavigator();

const MainNavigation = () => (
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
);

export default MainNavigation;
