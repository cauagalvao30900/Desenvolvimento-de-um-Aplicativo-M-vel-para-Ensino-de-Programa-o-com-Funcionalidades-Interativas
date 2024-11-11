import React, { useState } from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

function App() {
  const navigation = useNavigation();

  const exercises = [
    {
      id: 1,
      title: 'Exercício 1',
      question: 'Qual é o comando para exibir "Hello, World!" em PHP?',
      options: ['A) echo "Hello, World!";', 'B) print "Hello, World!";', 'C) printf("Hello, World!");'],
      correctAnswer: 'A'
    },
    {
      id: 2,
      title: 'Exercício 2',
      question: 'Como você define uma variável em PHP?',
      options: ['A) $variavel = "valor";', 'B) let variavel = "valor";', 'C) var variavel = "valor";'],
      correctAnswer: 'A'
    },
    {
      id: 3,
      title: 'Exercício 3',
      question: 'Qual é a sintaxe correta para um comentário de uma linha em PHP?',
      options: ['A) // Comentário', 'B) <!-- Comentário -->', 'C) /* Comentário */'],
      correctAnswer: 'A'
    },
    {
      id: 4,
      title: 'Exercício 4',
      question: 'Como você inclui um arquivo PHP em outro arquivo PHP?',
      options: ['A) include "arquivo.php";', 'B) import "arquivo.php";', 'C) require "arquivo.php";'],
      correctAnswer: 'A'
    },
    {
      id: 5,
      title: 'Exercício 5',
      question: 'Qual é a função para verificar se uma variável está definida em PHP?',
      options: ['A) isset($variavel);', 'B) defined($variavel);', 'C) is_defined($variavel);'],
      correctAnswer: 'A'
    },
  ];

  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [errorCount, setErrorCount] = useState(0); // Estado para contar os erros consecutivos

  const checkAnswer = (answer) => {
    const correctAnswer = exercises[currentExerciseIndex].correctAnswer;
    setSelectedAnswer(answer);
    if (answer === correctAnswer) {
      setIsCorrect(true);
      setFeedback('Resposta correta!');
      setErrorCount(0); // Reseta a contagem de erros
      setTimeout(nextExercise, 1000); // Avança após 1 segundo
    } else {
      setIsCorrect(false);
      setFeedback('Resposta incorreta. Tente novamente.');
      setErrorCount(prev => prev + 1); // Incrementa a contagem de erros
      if (errorCount + 1 === 3) {
        resetExercises(); // Reseta os exercícios após 3 erros consecutivos
      }
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

  const resetExercises = () => {
    setCurrentExerciseIndex(0);
    setErrorCount(0);
    resetFeedback();
    setFeedback('Você errou 3 vezes seguidas. Voltando ao início.');
  };

  const navigateToHome = () => {
    navigation.navigate('Code');
  };

  if (showCongrats) {
    return (
      <View style={styles.congratsContainer}>
        <TouchableOpacity
  style={[styles.backButton, styles.circularButton]}
  onPress={() => navigation.goBack()}>
  <FeatherIcon name="arrow-left" size={24} color="white" />
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
      <Text style={styles.header}>Exercícios de PHP</Text>
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
  circularButton: {
    width: 48,         // Ajuste para o tamanho desejado do círculo
    height: 48,        // Deve ser igual à largura para manter o formato circular
    borderRadius: 24,  // Metade do tamanho para ficar um círculo perfeito
    backgroundColor: 'black', // Cor de fundo do círculo
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
