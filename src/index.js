import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Login from './screens/Login';

const Router = createStackNavigator(
   {
      Login
   },
   {
      initialRouteName: "AuthLoadingScreen",
      headerMode: "none"
   }
);

export default createAppContainer(Router);
