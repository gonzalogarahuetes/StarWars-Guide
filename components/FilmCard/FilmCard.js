import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import axios from "axios";

export default function FilmCard({ film }) {
  const [isOpen, setIsOpen] = useState(false);
  const [characters, setCharacters] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async function fetchCharacters() {
      try {
        const res = await axios.all(
          film?.characters?.map(async (endpoint) => {
            const { data } = await axios.get(endpoint);
            return data;
          })
        );

        setCharacters(res);
      } catch (err) {
        setError(err.message);
      }
    })();
  }, []);

  const handlePress = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <TouchableOpacity style={styles.filmBtn} onPress={handlePress}>
        <Text style={styles.btnText}>{film.title}</Text>
      </TouchableOpacity>
      <View style={isOpen ? styles.dropInfo : styles.displayNone}>
        {characters?.map((char) => (
          <Text key={char.name} style={styles.infoText}>
            {char.name}
          </Text>
        ))}
        {error && (
          <Text style={styles.errorText}>Something happened: {error}</Text>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  btnText: {
    color: "#fff",
    fontSize: 25,
  },
  errorText: {
    color: "red",
    fontSize: 25,
    marginBottom: 5,
  },
  filmBtn: {
    padding: 15,
    alignItems: "center",
    backgroundColor: "black",
    borderWidth: 5,
    borderColor: "yellow",
    borderRadius: 50,
    marginTop: 30,
  },
  displayNone: {
    display: "none",
  },
  dropInfo: {
    backgroundColor: "yellow",
    width: 325,
    margin: "auto",
    borderRadius: 50,
    borderWidth: 5,
    borderColor: "yellow",
    padding: 15,
    alignItems: "center",
  },
  infoText: {
    color: "black",
    fontSize: 25,
    marginBottom: 5,
  },
});
