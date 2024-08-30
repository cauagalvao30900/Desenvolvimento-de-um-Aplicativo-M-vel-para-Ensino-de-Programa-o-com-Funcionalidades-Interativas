import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/styles/hljs'; // ou outro estilo que preferir
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReactLessonScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]); // Estado para armazenar favoritos

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const savedFavorites = await AsyncStorage.getItem('favorites');
      if (savedFavorites !== null) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error);
    }
  };

  const saveFavorites = async (updatedFavorites) => {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Erro ao salvar favoritos:', error);
    }
  };

  const handleFavoriteToggle = (itemId) => {
    const updatedFavorites = favorites.includes(itemId)
      ? favorites.filter(id => id !== itemId)
      : [...favorites, itemId];
    setFavorites(updatedFavorites);
    saveFavorites(updatedFavorites); // Salva os favoritos atualizados
  };

  const renderItem = ({ item }) => {
    const isFavorite = favorites.includes(item.id);

    return (
      <View style={styles.lessonContent}>
        <Text style={styles.subtitle}>{item.title}</Text>
        <Text style={styles.paragraph}>{item.content}</Text>
        <View style={styles.codeBlock}>
          <SyntaxHighlighter language="javascript" style={docco}>
            {item.code}
          </SyntaxHighlighter>
        </View>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => handleFavoriteToggle(item.id)}
        >
          <Ionicons 
            name={isFavorite ? 'heart' : 'heart-outline'} 
            size={24} 
            color={isFavorite ? 'red' : 'white'} 
          />
        </TouchableOpacity>
      </View>
    );
  };

  const data = [
    {
      id: '6',
      title: 'Ciclo de Vida dos Componentes',
      content: 'Os componentes passam por fases como montagem, atualização e desmontagem. Durante essas fases, métodos como componentDidMount(), componentDidUpdate() e componentWillUnmount() podem ser usados para executar ações específicas.',
      code: 'class Timer extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = { seconds: 0 };\n  }\n\n  componentDidMount() {\n    this.timerID = setInterval(\n      () => this.tick(),\n      1000\n    );\n  }\n\n  componentWillUnmount() {\n    clearInterval(this.timerID);\n  }\n\n  tick() {\n    this.setState({\n      seconds: this.state.seconds + 1\n    });\n  }\n\n  render() {\n    return (\n      <div>\n        Seconds: {this.state.seconds}\n      </div>\n    );\n  }\n}',
    },
    {
      id: '7',
      title: 'Hooks e Efeitos',
      content: 'Hooks são funções especiais no React que possibilitam o uso de estado e outras funcionalidades em componentes funcionais. Os Hooks mais comuns são useState() para gerenciar o estado e useEffect() para lidar com efeitos colaterais.',
      code: 'import React, { useState, useEffect } from \'react\';\n\nconst ExampleComponent = () => {\n  const [count, setCount] = useState(0);\n\n  useEffect(() => {\n    document.title = `Você clicou ${count} vezes`;\n  });\n\n  return (\n    <div>\n      <p>Você clicou {count} vezes</p>\n      <button onClick={() => setCount(count + 1)}>Clique aqui</button>\n    </div>\n  );\n};',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <View style={styles.header}>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#343434', // Cor de fundo atualizada
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 25,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 20,
    fontWeight: '400',
  },
  lessonContent: {
    marginBottom: 10,
    fontWeight: '400',
    position: 'relative',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 70,
    marginRight: 70,
    textAlign: 'center', // Centraliza o texto
    color: 'white', // Cor do texto atualizada
  },
  paragraph: {
    fontSize: 12,
    marginBottom: 10,
    backgroundColor: '#343434', // Cor de fundo atualizada
    color: 'white', // Cor do texto atualizada
    textAlign: 'center', // Centraliza o texto
  },
  codeBlock: {
    backgroundColor: '#1e1e1e', // Cor de fundo atualizada
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1, // Adiciona uma borda
    borderColor: '#ccc', // Cor da borda
    alignItems: 'center', // Centraliza o conteúdo horizontalmente
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  favoriteButton: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
});

export default ReactLessonScreen;
