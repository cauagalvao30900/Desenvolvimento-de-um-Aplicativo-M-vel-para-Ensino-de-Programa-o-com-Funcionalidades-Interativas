import React, { useState, useRef } from 'react';
import { View, FlatList, Dimensions, StyleSheet, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { Video } from 'expo-av';
import Ionicons from 'react-native-vector-icons/Ionicons'; 

const { height } = Dimensions.get('window');

const App = ({ navigation }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [fullScreen, setFullScreen] = useState(false); 
  const videoRef = useRef(null);

  const videos = [
    {
      id: '1',
      uri: 'https://firebasestorage.googleapis.com/v0/b/techlearn-5e347.appspot.com/o/videos%2F%2302%20-%20Sintaxe%20do%20PHP%20-%20CURSO%20PHP%20PARA%20INICIANTES.mp4?alt=media&token=8fffa1b2-20b3-4396-8d32-d72a15fe63c9',
      title: 'Consultas SQL na Prática',
      description: 'Nesse vídeo aprendemos a criar consultas básicas em SQL',
      creator: 'Programação Dinâmica',
      thumbnail: 'https://i0.wp.com/blogadvpl.com/wp-content/uploads/2015/12/sql.png?resize=640%2C267', 
    },
    {
      id: '2',
      uri: 'https://firebasestorage.googleapis.com/v0/b/techlearn-5e347.appspot.com/o/videos%2F4%20formas%20de%20LISTAR%20as%20COLUNAS%20das%20TABELAS%20no%20SQL%20Server.mp4?alt=media&token=8132ded0-a01a-4920-9252-170f8ef89042',
      title: '4 formas de LISTAR as COLUNAS das TABELAS no SQL Server',
      description: 'veremos 4 formas de listar as colunas das tabelas no SQL Server!',
      creator: 'DBA PRO',
      thumbnail: 'https://i.ytimg.com/vi/dz-SqbnkRLA/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAlOVxvOcfRIU_0BSibs6XwlRA03g', 
    },
    {
      id: '3',
      uri: 'https://firebasestorage.googleapis.com/v0/b/techlearn-5e347.appspot.com/o/videos%2FSQL%20SERVER%20-%20DELETE%20-%204%20formas%20de%20apagar%20%20dados%20das%20tabelas.mp4?alt=media&token=8d407d97-682a-4c35-951f-0458ad907f2d',
      title: 'SQL SERVER - DELETE - 4 formas de apagar dados das tabelas',
      description: 'Como adicionamos uma imagem no nosso html, para isso utilizamos a tag img',
      creator: 'Adilson Paranhos',
      thumbnail: 'https://i.ytimg.com/vi/s-VOXTNibY0/sddefault.jpg', 
    },
 
  ];

  const togglePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pauseAsync();
    } else {
      videoRef.current.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVideoChange = (index) => {
    setCurrentVideoIndex(index);
    setIsPlaying(true);
    if (fullScreen) {
      videoRef.current.dismissFullscreenPlayer(); 
      setFullScreen(false);
    }
  };

  const toggleFullScreen = () => {
    if (fullScreen) {
      videoRef.current.dismissFullscreenPlayer();
    } else {
      videoRef.current.presentFullscreenPlayer();
    }
    setFullScreen(!fullScreen);
  };

  const handleShare = () => {
    const currentVideo = videos[currentVideoIndex];
    Alert.alert(
      'Canal Amigo',
      `Vídeo tirado do canal: ${currentVideo.creator}`,
      [{ text: 'OK', onPress: () => console.log('Canal divulgado') }]
    );
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity style={styles.videoItem} onPress={() => handleVideoChange(index)}>
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <View>
        <Text style={styles.videoTitle}>{item.title}</Text>
        <Text style={styles.videoDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Botão de voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Container do vídeo */}
      <TouchableOpacity style={styles.videoContainer} onPress={togglePlayPause}>
        <Video
          ref={videoRef}
          source={{ uri: videos[currentVideoIndex].uri }}
          style={styles.video}
          shouldPlay={isPlaying}
          resizeMode="contain"
        />
        {/* Botão de tela cheia no canto inferior direito */}
        <TouchableOpacity style={styles.fullScreenButton} onPress={toggleFullScreen}>
          <Ionicons name={fullScreen ? 'contract' : 'expand'} size={30} color="#fff" />
        </TouchableOpacity>
      </TouchableOpacity>

      {/* Informações do vídeo */}
      <View style={styles.overlay}>
        <Text style={styles.title}>{videos[currentVideoIndex].title}</Text>
        <Text style={styles.description}>{videos[currentVideoIndex].description}</Text>
        <Text style={styles.creator}>Canal: {videos[currentVideoIndex].creator}</Text>

        {/* Botão de divulgar */}
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Text style={styles.shareButtonText}>Acessar canal</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de vídeos relacionados */}
      <Text style={styles.relatedTitle}>Vídeos relacionados</Text>
      <FlatList
        data={videos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.videoList}
        horizontal={false} // Faz com que a lista seja rolável verticalmente
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#363636',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 10,
    zIndex: 10, // Garante que o botão de voltar fique por cima de outros elementos
  },
  videoContainer: {
    width: '100%',
    height: height * 0.45, // Ajuste da altura para dar espaço à lista de vídeos
  },
  video: {
    width: '100%',
    height: '140%',
  },
  fullScreenButton: {
    position: 'absolute',
    bottom: -0, // Coloca o botão no canto inferior
    right: 10,  // Coloca o botão à direita
    zIndex: 10, // Mantém o botão por cima do vídeo
    padding: 5, // Ajuste o padding conforme necessário
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo levemente transparente para maior visibilidade
    borderRadius: 5,
  },
  overlay: {
    padding: 10,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    color: '#fff',
    fontSize: 14,
    marginTop: 5,
  },
  creator: {
    color: '#00ffff',
    fontSize: 14,
    marginTop: 10,
    fontStyle: 'italic',
  },
  shareButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  relatedTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  videoList: {
    flex: 1,
  },
  videoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#565656',
    marginBottom: 20, // Maior espaçamento entre os itens
    borderRadius: 5,
  },
  thumbnail: {
    width: 100,
    height: 60,
    borderRadius: 5,
    marginRight: 10,
  },
  videoTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  videoDescription: {
    color: '#fff',
    fontSize: 12,
  },
});

export default App;
