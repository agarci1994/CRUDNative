import React from "react";
import { View, StyleSheet, Alert, Platform } from "react-native";
import { Headline, Text, Subheading, Button, FAB } from "react-native-paper";
import globalStyles from "../styles/global";
import axios from "axios";

const DetailsClient = ({ route, navigation }) => {
  const { name, phone, company, email, id } = route.params.item;
  const viewAlert = () => {
    Alert.alert(
      "Deseas eliminar este cliente",
      "Un contacto eliminado nunca podras recuperarlo",
      [
        { text: "Si eliminar", onPress: () => deleteClient() },
        { text: "Cancelar", style: "cancel" },
      ]
    );
  };

  const deleteClient = async () => {
    const url =
      Platform.OS === "ios"
        ? `http://localhost:3000/clients/${id}`
        : `http://10.0.2.2:3000/clients/${id}`;
    try {
      await axios.delete(url);
      navigation.navigate("Init");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <View style={globalStyles.container}>
        <Headline style={globalStyles.title}>{name}</Headline>
        <Text style={styles.text}>
          {" "}
          Empresa: <Subheading>{company}</Subheading>
        </Text>
        <Text style={styles.text}>
          {" "}
          Correo: <Subheading>{email}</Subheading>
        </Text>
        <Text style={styles.text}>
          {" "}
          Telefono: <Subheading>{phone}</Subheading>
        </Text>
        <Button
          style={styles.button}
          mode="contained"
          icon="cancel"
          onPress={() => viewAlert()}
        >
          Eliminar Cliente
        </Button>
        <FAB icon="pencil" style={styles.fab} onPress={() => navigation.navigate("NewClient", {clients: route.params})} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    marginBottom: 20,
    fontSize: 10,
  },
  button: {
    marginTop: 100,
    backgroundColor: "red",
  },
  fab: {
    position: "absolute",
    margin: 20,
    right: 0,
    bottom: 20,
  },
});

export default DetailsClient;
