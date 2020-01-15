import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import Dashboard from './screens/Dashboard';
import DriverDash from './screens/DriverDash';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';

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
