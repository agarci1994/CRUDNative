import React from "react";
import { Button } from "react-native-paper";

const Nav = ({navigation, route}) => {
  const handlePress = () => {
    navigation.navigate('NewClient')
  };
  return (
    <>
      <Button icon='plus' color='#FFF' onPress={() => handlePress()}>Cliente</Button>
    </>
  );
};

export default Nav;
