import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import Home from './Home/Home';
import Login from './Login/Login';

const Login_Signup = ({ isLoggedIn }) => (
   <View>
      <Text>
         Is the user logged in? {`${isLoggedIn}`}
      </Text>
      {isLoggedIn ? <Home /> : <Login />}
   </View>
);

const mapStateToProps = ({ isLoggedIn }) => ({ isLoggedIn });

export default connect(mapStateToProps)(Login_Signup);
