import React, { useState } from "react";
import globalStyles from "../styles/global.js";

import { View, StyleSheet } from "react-native";
import {
  TextInput,
  Headline,
  Button,
  Paragraph,
  Portal,
  Dialog,
} from "react-native-paper";

const NewClient = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [alert, setAlert] = useState(false);
  const client = { name, phone, company, email };

  const saveClient = () => {
    if (name === "" || phone === "" || email === "" || company === "") {
      setAlert(true);
      return;
    }
  };

  return (
    <>
      <View style={globalStyles.container}>
        <Headline style={globalStyles.title}>Añadir Nuevo Cliente</Headline>
        <TextInput
          label="Nombre"
          placeholder="Juan"
          value={name}
          onChange={(text) => setName(text)}
          style={style.input}
        />
        <TextInput
          label="Telefono"
          placeholder="+34 655215109"
          value={phone}
          onChange={(text) => setPhone(text)}
          style={style.input}
        />
        <TextInput
          label="Email"
          value={email}
          placeholder="alex23@gmail.com"
          onChange={(text) => setEmail(text)}
          style={style.input}
        />
        <TextInput
          label="Empresa"
          value={company}
          placeholder="Silicom S.A "
          onChange={(text) => setCompany(text)}
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
