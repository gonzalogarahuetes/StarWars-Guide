import axios from "axios";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
  Text,
} from "react-native";

import FilmCard from "./components/FilmCard/FilmCard";

const image = {
  uri: "https://cdn.mos.cms.futurecdn.net/jfkAU4tM8XMUAPZDm4h5Nh-1200-80.jpeg",
};

export default function App() {
  const [films, setFilms] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async function fetchData() {
      try {
        const { data } = await axios.get("https://swapi.dev/api/films");
        setFilms(data);
      } catch (err) {
        setError(err.message);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text style={styles.title}>The Star Wars Guide</Text>
        <ScrollView>
          {films?.results?.map((film) => (
            <FilmCard key={film.episode_id} film={film} />
          ))}
        </ScrollView>
        {error && (
          <Text style={styles.errorText}>Something happened: {error}</Text>
        )}
        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorText: {
    color: "red",
    fontSize: 25,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "black",
    fontSize: 30,
  },
  title: {
    marginTop: 55,
    marginBottom: 10,
    fontSize: 40,
    fontWeight: "500",
    color: "#fff",
  },
});
