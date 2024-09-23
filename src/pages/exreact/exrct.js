import React, { useState } from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

function App() {
  const navigation = useNavigation();
  
  const exercises = [
    {
      id: 1,
      title: "Exercício 1",
      question: "Qual método é usado para criar componentes de classe em React?",
      options: [
        "a) createComponent()",
        "b) renderComponent()",
        "c) Component()",
        "d) class Component extends React.Component"
      ],
      correctAnswer: "d"
    },
    {
      id: 2,
      title: "Exercício 2",
      question: "Qual hook é usado para gerenciar o estado em componentes de função?",
      options: [
        "a) useState",
        "b) useEffect",
        "c) useContext",
        "d) useReducer"
      ],
      correctAnswer: "a"
    },
    {
      id: 3,
      title: "Exercício 3",
      question: "Qual diretiva JSX é usada para renderizar listas de elementos?",
      options: [
        "a) for",
        "b) while",
        "c) map",
        "d) each"
      ],
      correctAnswer: "c"
    },
    {
      id: 4,
      title: "Exercício 4",
      question: "Qual é a finalidade do hook useEffect?",
      options: [
        "a) Executar código assíncrono",
        "b) Gerenciar estado local",
        "c) Acessar o contexto do aplicativo",
        "d) Realizar efeitos colaterais em componentes de função"
      ],
      correctAnswer: "d"
    },
    {
      id: 5,
      title: "Exercício 5",
      question: "Como você aplica um estilo condicional em um componente JSX?",
      options: [
        "a) style={this.style ? 'condicional' : 'default'}",
        "b) style={{condition ? 'condicional' : 'default'}}",
        "c) style={{condition && 'condicional'}}",
        "d) style={condition ? styles.condicional : styles.default}"
      ],
      correctAnswer: "d"
    }
  ];

  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);

  const checkAnswer = (answer) => {
    const correctAnswer = exercises[currentExerciseIndex].correctAnswer;
    setSelectedAnswer(answer);
    if (answer === correctAnswer) {
      setIsCorrect(true);
      setFeedback('Resposta correta!');
      setTimeout(nextExercise, 1000); // Avança após 2 segundos
    } else {
      setIsCorrect(false);
      setFeedback('Resposta incorreta. Tente novamente.');
    }
  };

  const nextExercise = () => {
    if (currentExerciseIndex === exercises.length - 1) {
      setShowCongrats(true);
    } else {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      resetFeedback();
    }
  };

  const resetFeedback = () => {
    setFeedback('');
    setSelectedAnswer('');
    setIsCorrect(false);
  };

  const navigateToHome = () => {
    navigation.navigate('Code');
  };

  if (showCongrats) {
    return (
      <View style={styles.congratsContainer}>
        <TouchableOpacity onPress={navigateToHome} style={styles.backButton}>
          <Icon name="arrow-back" size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.congratsText}>Parabéns! Você concluiu todos os exercícios!</Text>
        <TouchableOpacity style={styles.homeButton} onPress={navigateToHome}>
          <Text style={styles.homeButtonText}>Voltar para Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigateToHome} style={styles.backButton}>
        <Icon name="arrow-back" size={30} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.header}>Exercícios de React</Text>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.exerciseContainer}>
          <Text style={styles.exerciseTitle}>{exercises[currentExerciseIndex].title}</Text>
          <Text style={styles.questionText}>{exercises[currentExerciseIndex].question}</Text>
          {exercises[currentExerciseIndex].options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                selectedAnswer === option.charAt(0) && (isCorrect ? styles.correctOption : styles.incorrectOption)
              ]}
              onPress={() => checkAnswer(option.charAt(0))}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
          <Text style={styles.feedbackText}>{feedback}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#545454',
    paddingHorizontal: 20,
    paddingTop: 150,
  },
  congratsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#333',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#FFF',
  },
  scrollContainer: {
    width: '100%',
  },
  exerciseContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 20,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#363636',
  },
  exerciseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFF',
  },
  questionText: {
    fontSize: 18,
    marginBottom: 20,
    color: '#FFF',
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#00ffff',
    alignItems: 'center',
    width: '100%',
  },
  correctOption: {
    backgroundColor: '#2b961f',
  },
  incorrectOption: {
    backgroundColor: '#ff4d4d',
  },
  optionText: {
    fontSize: 16,
    color: '#FFF',
  },
  feedbackText: {
    color: '#FFF',
    marginTop: 10,
    fontSize: 16,
  },
  homeButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 25,
    marginTop: 20,
    alignItems: 'center',
    width: '100%',
  },
  homeButtonText: {
    fontSize: 16,
    color: '#FFF',
  },
  congratsText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00ff00',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default App;
