import React, { useEffect, useState } from "react";
import axios from "axios";
import { View, Platform, FlatList, StyleSheet } from "react-native";
import { List, Headline, Button, FAB } from "react-native-paper";
import globalStyles from "../styles/global";

const Init = ({ navigation }) => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const getClient = async () => {
      try {
        const result =
          Platform.OS === "ios"
            ? await axios.get("http://localhost:3000/clients")
            : await axios.get("http://10.0.2.2:3000/clients");
        setClients(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    getClient();
  }, [clients]);
  return (
    <>
      <View style={globalStyles.container}>
        <Button
          icon="plus-circle"
          onPress={() => navigation.navigate("NewClient")}
        >
          Nuevo Cliente
        </Button>
        <Headline style={globalStyles.title}>
          {clients.length ? "Clientes" : "Aún no hay clientes"}
        </Headline>

        <FlatList
          data={clients}
          keyExtractor={(clients) => clients.id.toString()}
          renderItem={({ item }) => (
            <List.Item title={item.name} description={item.company} onPress={() => navigation.navigate('DetailsClient', {item})} />
          )}
        />
        <FAB icon="plus" style={styles.fab} onPress={() => navigation.navigate("NewClient")} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 20,
    right: 0,
    bottom: 20,
  },
});

export default Init;
