import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import Dashboard from './screens/Dashboard';
import Login from './screens/Login';

const Router = createStackNavigator(
   {
      AuthLoadingScreen,
      Dashboard,
      Login,
   },
   {
      initialRouteName: "Dashboard",
      headerMode: "none"
   }
);

export default createAppContainer(Router);
