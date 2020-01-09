import React from 'react';
import { connect } from 'react-redux';
import { navigate, toHome } from '../../../redux/actions';
import { View, Text, Button } from 'react-native';
import MainScreen from '../../Home-SubComponents/MainScreen';
import NewPickup from '../../Home-SubComponents/NewPickup';

const Home = props => {
   switch (props.nav.page) {
      case "new pickup":
         return (
            <View>
               <NewPickup />
            </View>
         )
      default:
         return (
            <View>
               <MainScreen />
            </View>
         )
   }
}

const mapStateToProps = state => {
   return {
      nav: state.nav
   }
}

const mapDispatchToProps = {
   navigate: navigate
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);