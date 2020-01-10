import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import Dashboard from './screens/Dashboard';
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';

const Router = createStackNavigator(
   {
      AuthLoadingScreen,
      Dashboard,
      HomeScreen,
      LoginScreen,
      SignupScreen,
   },
   {
<<<<<<< HEAD
      initialRouteName: "Dashboard",
=======
      initialRouteName: "AuthLoadingScreen",
>>>>>>> 4d53e984729f5329d83875777154b142ef54eea0
      headerMode: "none"
   }
);

export default createAppContainer(Router);
