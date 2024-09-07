import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, ScrollView, Image, TouchableOpacity, Modal, Pressable } from 'react-native';
import { Video } from 'expo-av'; 
import { MaterialIcons } from '@expo/vector-icons';

const videos = [
  {
    id: 1,
    title: 'Título do Vídeo 1',
    thumbnail: require('../../../assets/tech.png'),
    channel: 'TechLearn',
    views: '0 views',
    uploadDate: 'Há 1 semana',
    videoUrl: require('../../../assets/aulateste.mp4')
  },
  // Outros vídeos...
];

export default function VideoScreen({ navigation }) {
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
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={30} color="#FFF" />
        </Pressable>
        <Text style={styles.headerText}>Aulas de SQL</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {videos.map((video) => (
          <TouchableOpacity 
            key={video.id} 
            style={styles.videoContainer} 
            onPress={() => handleVideoPress(video.videoUrl)}
            activeOpacity={0.7} 
          >
            <Image source={video.thumbnail} style={styles.thumbnail} />
            <View style={styles.videoInfo}>
              <Text style={styles.title}>{video.title}</Text>
              <Text style={styles.channel}>{video.channel}</Text>
              <Text style={styles.videoDetails}>{`${video.views} • ${video.uploadDate}`}</Text>
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
    backgroundColor: '#363636',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#222',
    borderBottomWidth: 1,
    borderBottomColor: '#555',
    paddingTop: 40,
  },
  backButton: {
    marginLeft: 10,
    padding: 5,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    flex: 1,  
    textAlign: 'center',  
    marginRight: 40,  
  },
  scrollViewContent: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  videoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#555',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
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
  channel: {
    color: '#AAA',
    fontSize: 14,
  },
  videoDetails: {
    color: '#777',
    fontSize: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    paddingTop: 80,  
  },
  videoPlayer: {
    width: '90%',
    height: '70%',
  },
  backButtonModal: {
    position: 'absolute',
    top: 60,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 25,
    padding: 10,
    zIndex: 1,
  },
});
