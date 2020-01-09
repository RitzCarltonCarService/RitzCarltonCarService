import React, { useState } from 'react';
import { connect } from 'react-redux';
import { navigate, toHome } from '../redux/actions';
import { View, Text, Button } from 'react-native';
import MainScreen from '../layouts/Home-SubComponents/MainScreen';
import NewPickup from '../layouts/Home-SubComponents/NewPickup';
import PrePickupInfo from '../layouts/PickupInfo-SubComponents/PrePickupInfo';
import MapBackground from '../components/MapBackground'

const Home = props => {
   const [page, setPage] = useState("home");

   return (
      <>
         <MapBackground />
         {(() => {
            switch (page) {
               case "new pickup":
                  return (
                     <View>
                        <NewPickup setPage={setPage} />
                     </View>
                  )
               case "pickup info":
                  return (
                     <View>
                        <PrePickupInfo setPage={setPage} />
                     </View>
                  )
               default:
                  return (
                     <View>
                        <MainScreen setPage={setPage} />
                     </View>
                  )
            }
         })()}
      </>
   )
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