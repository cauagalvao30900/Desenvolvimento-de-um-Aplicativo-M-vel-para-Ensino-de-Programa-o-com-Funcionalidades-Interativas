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
      uri: 'https://firebasestorage.googleapis.com/v0/b/techlearn-5e347.appspot.com/o/videos%2Fcriarcomponentreact.mp4?alt=media&token=6a033497-8bfe-4a28-85c0-3e0dd326410b',
      title: 'Criando componentes no React',
      description: 'Neste vídeo vocês iram aprender e entender um componente no React',
      creator: 'Matheus Battisti - Hora de Codar',
      thumbnail: 'https://i.ytimg.com/vi/wSdQ0CS4LU8/maxresdefault.jpg', 
    },
    {
      id: '2',
      uri: 'https://firebasestorage.googleapis.com/v0/b/techlearn-5e347.appspot.com/o/videos%2FDominando%20os%20Hooks%20_%20React%20em%208%20minutos!.mp4?alt=media&token=21c0fd53-cc3b-4a81-9ad5-2f8f987715aa',
      title: 'Aprendendo a usar Hook',
      description: 'Este recurso é realmente importante e como utiliza-lo para melhorar a escrita dos seus componentes React',
      creator: 'Escola de JavaScript',
      thumbnail: 'https://miro.medium.com/v2/resize:fit:1400/1*-Ijet6kVJqGgul6adezDLQ.png', 
    },
    {
      id: '3',
      uri: 'https://firebasestorage.googleapis.com/v0/b/techlearn-5e347.appspot.com/o/videos%2FRenderiza%C3%A7%C3%A3o%20Condicional%20-%20%20Como%20mostrar%20e%20esconder%20elementos%20no%20React.mp4?alt=media&token=e9caaa2f-855b-4613-ac1e-b565caa5479d',
      title: 'Renderização condicional React',
      description: 'Um guia definitivo do State em ReactJS',
      creator: 'Vinicius Dacal',
      thumbnail: 'https://refine-web.imgix.net/blog/2022-12-14-conditional-rendering/social-2.png?w=1788', 
    },
    {
      id: '4',
      uri: 'https://firebasestorage.googleapis.com/v0/b/techlearn-5e347.appspot.com/o/videos%2FCurso%20de%20React_%20Inserindo%20CSS%20no%20React%20(CSS%20modules)%20-%20%2306.mp4?alt=media&token=459348f5-01a9-456c-b4f7-333accedcff5',
      title: 'Aplicando estilo em React',
      description: 'Como aplicar estilo no React-Native',
      creator: 'Matheus Battisti - Hora de Codar',
      thumbnail: 'https://i.ytimg.com/vi/Z_0X0jYtvjE/maxresdefault.jpg', 
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
