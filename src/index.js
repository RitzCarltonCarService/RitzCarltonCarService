import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Dashboard from './screens/Dashboard';
import DriverDash from './screens/DriverDash';
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';

const Router = createStackNavigator(
   {
      AuthLoadingScreen,
      Dashboard,
      DriverDash,
      ForgotPasswordScreen,
      HomeScreen,
      LoginScreen,
      SignupScreen,
   },
   {
      initialRouteName: "AuthLoadingScreen",
      headerMode: "none"
   }
);

export default createAppContainer(Router);
