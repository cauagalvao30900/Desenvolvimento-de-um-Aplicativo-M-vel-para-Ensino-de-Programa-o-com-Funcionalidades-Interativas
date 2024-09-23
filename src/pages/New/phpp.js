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
      uri: 'https://firebasestorage.googleapis.com/v0/b/techlearn-5e347.appspot.com/o/videos%2FAula%20de%20PHP%20001%20-%20Ol%C3%A1%2C%20Mundo!.mp4?alt=media&token=529a3d23-6959-4f31-b0ca-59f8fb6a1501',
      title: 'Primeiro Olá, Mundo',
      description: 'Como iniciar o na linguagem PHP',
      creator: 'Carlos Henrique Java',
      thumbnail: 'https://image.spreadshirtmedia.net/image-server/v1/products/T1459A839PA4459PT28D122701375W10000H793/views/1,width=378,height=378,appearanceId=839,backgroundColor=F2F2F2/php-hello-world.jpg', 
    },
    {
      id: '2',
      uri: 'https://firebasestorage.googleapis.com/v0/b/techlearn-5e347.appspot.com/o/videos%2FAula%2003%20-%20VARI%C3%81VEIS%20e%20CONSTANTES.mp4?alt=media&token=578510da-b04a-4429-b101-cfa57350fca9',
      title: 'Variáveis e constantes PHP',
      description: 'Esta aula você aprenderar a usar Variáveis e constantes.',
      creator: 'Sharpax',
      thumbnail: 'https://i.ytimg.com/vi/vtCJBaXyOkU/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAIOKdFv8K6MY9xFzO3hIzkrSbaWg', 
    },
    {
      id: '3',
      uri: 'https://firebasestorage.googleapis.com/v0/b/techlearn-5e347.appspot.com/o/videos%2F%2302%20-%20Sintaxe%20do%20PHP%20-%20CURSO%20PHP%20PARA%20INICIANTES.mp4?alt=media&token=8fffa1b2-20b3-4396-8d32-d72a15fe63c9',
      title: 'Aprendendo a sintaxe do PHP',
      description: ' Nesse vídeo ira ensinar sobre a sintaxe do PHP.',
      creator: 'Professor Eliel',
      thumbnail: 'https://arquivo.devmedia.com.br/marketing/img/artigo-if-switch-for-while-e-foreach-em-php-29527.png', 
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
