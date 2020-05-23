import React, { useState, useEffect } from "react";
import globalStyles from "../styles/global.js";
import axios from "axios";
import { View, StyleSheet, Platform } from "react-native";
import {
  TextInput,
  Headline,
  Button,
  Paragraph,
  Portal,
  Dialog,
} from "react-native-paper";

const NewClient = ({ navigation, route }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    if (route.params) {
      const { name, phone, email, company } = route.params.clients.item;
      setName(name);
      setPhone(phone);
      setEmail(email);
      setCompany(company);
    }
  }, []);

  const saveClient = async () => {
    if (name === "" || phone === "" || email === "" || company === "") {
      setAlert(true);
      return;
    }
    const client = { name, phone, company, email, id };
    if (route.params) {
      const { id } = route.params.clients.item;
      client.id = id;
      const url =
        Platform.OS === "ios"
          ? `http://localhost:3000/clients/${id}`
          : `http://10.0.2.2:3000/clients/${id}`;

      try {
        await axios.put(url, client);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        Platform.OS === "ios"
          ? await axios.post("http://localhost:3000/clients", client)
          : await axios.post("http://10.0.2.2:3000/clients");
      } catch (error) {
        console.log(error);
      }
    }

    navigation.navigate("Init");
    setName("");
    setPhone("");
    setEmail("");
    setCompany("");
  };

  return (
    <>
      <View style={globalStyles.container}>
        <Headline style={globalStyles.title}>Añadir Nuevo Cliente</Headline>
        <TextInput
          label="Nombre"
          placeholder="Juan"
          value={name}
          onChangeText={(text) => setName(text)}
          style={style.input}
        />
        <TextInput
          label="Telefono"
          placeholder="+34 655215109"
          value={phone}
          onChangeText={(text) => setPhone(text)}
          style={style.input}
        />
        <TextInput
          label="Email"
          value={email}
          placeholder="alex23@gmail.com"
          onChangeText={(text) => setEmail(text)}
          style={style.input}
        />
        <TextInput
          label="Empresa"
          value={company}
          placeholder="Silicom S.A "
          onChangeText={(text) => setCompany(text)}
          style={style.input}
        />
        <Button
          icon="pencil-circle"
          mode="contained"
          onPress={() => saveClient()}
        >
          Guardar Cliente
        </Button>

        <Portal>
          <Dialog visible={alert} onDismiss={() => setAlert(false)}>
            <Dialog.Title>Error</Dialog.Title>
            <Dialog.Content>
              <Paragraph>Todos los campos son obligatorios.</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setAlert(false)}>OK</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  input: {
    marginBottom: 20,
    backgroundColor: "transparent",
  },
});

export default NewClient;
