import React from 'react';
import { StyleSheet, SafeAreaView, View, Text, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

// Dados de exemplo para os vídeos
const videos = [
  {
    id: 1,
    title: 'Título do Vídeo 1',
    thumbnail: 'https://via.placeholder.com/150',
    channel: 'Nome do Canal 1',
    views: '1M views',
    uploadDate: 'Há 1 semana',
    youtubeUrl: 'URL_DO_VIDEO_3',
  },
  {
    id: 2,
    title: 'Título do Vídeo 2',
    thumbnail: 'https://via.placeholder.com/150',
    channel: 'Nome do Canal 2',
    views: '500K views',
    uploadDate: 'Há 2 semanas',
    youtubeUrl: 'URL_DO_VIDEO_4',
  },
  {
    id: 3,
    title: 'Título do Vídeo 3',
    thumbnail: 'https://via.placeholder.com/150',
    channel: 'Nome do Canal 3',
    views: '250K views',
    uploadDate: 'Há 3 semanas', 
    youtubeUrl: 'URL_DO_VIDEO_5',
  },
  {
    id: 4,
    title: 'Título do Vídeo 4',
    thumbnail: 'https://via.placeholder.com/150',
    channel: 'Nome do Canal 3',
    views: '250K views',
    uploadDate: 'Há 3 semanas', 
    youtubeUrl: 'URL_DO_VIDEO_7',
  },
  {
    id: 5,
    title: 'Título do Vídeo 5',
    thumbnail: 'https://via.placeholder.com/150',
    channel: 'Nome do Canal 3',
    views: '250K views',
    uploadDate: 'Há 3 semanas', 
    youtubeUrl: 'URL_DO_VIDEO_9',
  },
];

export default function App() {
  const handleInstagramPress = () => {
    Linking.openURL('https://www.instagram.com/');
  };

  const handleYouTubePress = () => {
    Linking.openURL('https://www.youtube.com/');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Aulas de Hardware</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {videos.map((video, index) => (
          <TouchableOpacity key={video.id} style={styles.videoContainer}>
            <Image source={{ uri: video.thumbnail }} style={styles.thumbnail} />
            <View style={styles.videoInfo}>
              <Text style={styles.title}>{video.title}</Text>
              <Text style={styles.channel}>{video.channel}</Text>
              <Text style={styles.details}>{`${video.views} • ${video.uploadDate}`}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={handleInstagramPress}>
          <Icon name="instagram" size={30} color="#C13584" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleYouTubePress}>
          <FontAwesome name="youtube" size={30} color="#FF0000" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
  
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000', // Cor do texto branca
  },
  scrollViewContent: {
    paddingHorizontal: 15, // Espaçamento horizontal
    paddingBottom: 20, // Espaçamento inferior
  },
  videoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9', // Cor de fundo cinza claro
    borderRadius: 8, // Borda arredondada
    marginBottom: 15, // Espaçamento inferior
    padding: 10, // Preenchimento interno
  },
  thumbnail: {
    width: 120,
    height: 80,
    borderRadius: 6, // Borda arredondada
    marginRight: 10, // Espaçamento à direita
  },
  videoInfo: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  channel: {
    fontSize: 14,
    color: '#777',
    marginBottom: 3,
  },
  details: {
    fontSize: 14,
    color: '#777',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20, // Espaçamento vertical
  },
  icon: {
    marginHorizontal: 10, // Espaçamento horizontal
  },
});
