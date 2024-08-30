

import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, ScrollView, Image, TouchableOpacity, Modal, Pressable } from 'react-native';
import { Video } from 'expo-av'; 
import { MaterialIcons } from '@expo/vector-icons';

const videos = [
  {
    id: 1,
    title: 'Título do Vídeo 1',
    thumbnail: require('../../../assets/tech.png'), // Caminho para o thumbnail na pasta assets
    channel: 'TechLearn',
    views: '0 views',
    uploadDate: 'Há 1 semana',
    videoUrl: require('../../../assets/aulateste.mp4') // Caminho para o vídeo na pasta assets
  },
  {
    id: 1,
    title: 'Título do Vídeo 1',
    thumbnail: require('../../../assets/tech.png'), // Caminho para o thumbnail na pasta assets
    channel: 'TechLearn',
    views: '0 views',
    uploadDate: 'Há 1 semana',
    videoUrl: require('../../../assets/aulateste.mp4') // Caminho para o vídeo na pasta assets
  },
  {
    id: 1,
    title: 'Título do Vídeo 1',
    thumbnail: require('../../../assets/tech.png'), // Caminho para o thumbnail na pasta assets
    channel: 'TechLearn',
    views: '0 views',
    uploadDate: 'Há 1 semana',
    videoUrl: require('../../../assets/aulateste.mp4') // Caminho para o vídeo na pasta assets
  },
  {
    id: 1,
    title: 'Título do Vídeo 1',
    thumbnail: require('../../../assets/tech.png'), // Caminho para o thumbnail na pasta assets
    channel: 'TechLearn',
    views: '0 views',
    uploadDate: 'Há 1 semana',
    videoUrl: require('../../../assets/aulateste.mp4') // Caminho para o vídeo na pasta assets
  },
  {
    id: 1,
    title: 'Título do Vídeo 1',
    thumbnail: require('../../../assets/lg.png'), // Caminho para o thumbnail na pasta assets
    channel: 'TechLearn',
    views: '0 views',
    uploadDate: 'Há 1 semana',
    videoUrl: require('../../../assets/aulateste.mp4') // Caminho para o vídeo na pasta assets
  },
];
export default function VideoScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);

  const handleVideoPress = (url) => {
    setSelectedVideoUrl(url);
    setModalVisible(true);
  };

  const handleBackPress = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Aulas de PHP</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {videos.map((video) => (
          <TouchableOpacity key={video.id} style={styles.videoContainer} onPress={() => handleVideoPress(video.videoUrl)}>
            <Image source={video.thumbnail} style={styles.thumbnail} />
            <View style={styles.videoInfo}>
              <Text style={styles.title}>{video.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={handleBackPress}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <Pressable style={styles.backButtonModal} onPress={handleBackPress}>
            <MaterialIcons name="arrow-back" size={30} color="#FFF" />
          </Pressable>
          <Video
            source={selectedVideoUrl}
            style={styles.videoPlayer}
            useNativeControls
            resizeMode="contain"
            isLooping
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#343434',
  },
  header: {
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222',
    borderBottomWidth: 1,
    borderBottomColor: '#555',
    paddingTop: 40, // Adicionado para descer o título
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
  },
  scrollViewContent: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  videoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#444',
    borderRadius: 8,
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#555',
  },
  thumbnail: {
    width: 120,
    height: 80,
    borderRadius: 6,
    marginRight: 10,
  },
  videoInfo: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    paddingTop: 40, // Adicionado para descer a flecha de voltar
  },
  videoPlayer: {
    width: '90%',
    height: '70%',
  },
  backButtonModal: {
    position: 'absolute',
    top: 60, // Aumentado para descer a flecha de voltar
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 25,
    padding: 10,
    zIndex: 1,
  },
});

