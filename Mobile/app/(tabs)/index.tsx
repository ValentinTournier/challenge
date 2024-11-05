import { Image, StyleSheet, Platform, View, Text } from 'react-native';


import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';


export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      {/* Bouton rond */}
      <View style={styles.roundButton}>
        <Text style={styles.buttonText}>Go</Text>
      </View>

      {/* Barre de texte */}
      <View style={styles.textBar}>
        <Text style={styles.textStyle}>Bienvenue dans l'application !</Text>
      </View>

      {/* Autres composants ou contenu */}
    </ParallaxScrollView>
  );
}


const styles = StyleSheet.create({
  textBar: {
    backgroundColor: '#A1CEDC',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 18,
    color: '#1D3D47',
    fontWeight: 'bold',
  },
  roundButton: {
    backgroundColor: '#1D3D47',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
