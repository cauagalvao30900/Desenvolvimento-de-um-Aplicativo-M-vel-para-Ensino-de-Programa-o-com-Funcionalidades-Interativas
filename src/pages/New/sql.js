import React from 'react';
import { StyleSheet, SafeAreaView, View, Text, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

// Dados de exemplo para os vídeos
const videos = [
  {
    id: 1,
    title: 'Introdução ao SQL: Conceitos Básicos',
    thumbnail: 'https://via.placeholder.com/150',
    channel: 'Nome do Canal 1',
    views: '1M visualizações',
    uploadDate: 'Há 1 semana',
    youtubeUrl: 'URL_DO_VIDEO_3',
  },
  {
    id: 2,
    title: 'SQL Avançado: Consultas Complexas',
    thumbnail: 'https://via.placeholder.com/150',
    channel: 'Nome do Canal 2',
    views: '500K visualizações',
    uploadDate: 'Há 2 semanas',
    youtubeUrl: 'URL_DO_VIDEO_4',
  },
  {
    id: 3,
    title: 'Administração de Banco de Dados com SQL Server',
    thumbnail: 'https://via.placeholder.com/150',
    channel: 'Nome do Canal 3',
    views: '250K visualizações',
    uploadDate: 'Há 3 semanas', 
    youtubeUrl: 'URL_DO_VIDEO_5',
  },
  {
    id: 4,
    title: 'Otimização de Consultas em SQL: Dicas e Truques',
    thumbnail: 'https://via.placeholder.com/150',
    channel: 'Nome do Canal 3',
    views: '250K visualizações',
    uploadDate: 'Há 3 semanas', 
    youtubeUrl: 'URL_DO_VIDEO_7',
  },
  {
    id: 5,
    title: 'Aprenda SQL com Exercícios Práticos',
    thumbnail: 'https://via.placeholder.com/150',
    channel: 'Nome do Canal 3',
    views: '250K visualizações',
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
        <Text style={styles.headerText}>Aulas de SQL</Text>
      </View>
      <ScrollView>
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
    marginBottom: 22,
    paddingHorizontal: 25,
    paddingTop: 10,

  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 20,
    color: '#000000',
  },
  videoContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingHorizontal: 25,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  thumbnail: {
    width: 120,
    height: 80,
    borderRadius: 6,
    marginRight: 15,
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
    marginBottom: 20,
  },
  icon: {
    marginHorizontal: 10,
  },
});
