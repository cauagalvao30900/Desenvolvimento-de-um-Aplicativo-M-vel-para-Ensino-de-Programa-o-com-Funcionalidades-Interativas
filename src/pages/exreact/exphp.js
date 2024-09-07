import React, { useState } from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

function App() {
  const navigation = useNavigation();

  // Exercícios de PHP
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

  const checkAnswer = () => {
    if (exercises[currentExerciseIndex]) {
      const correctAnswer = exercises[currentExerciseIndex].correctAnswer;
      if (selectedAnswer === correctAnswer) {
        setFeedback('Resposta correta!');
        setIsCorrect(true);
      } else {
        setFeedback('Resposta incorreta. Tente novamente.');
        setIsCorrect(false);
      }
    }
  };

  const nextExercise = () => {
    if (isCorrect) {
      if (currentExerciseIndex === exercises.length - 1) {
        setShowCongrats(true);
      } else {
        setFeedback('');
        setSelectedAnswer('');
        setIsCorrect(false);
        setCurrentExerciseIndex(currentExerciseIndex + 1);
      }
    }
  };

  const resetExercises = () => {
    setCurrentExerciseIndex(0);
    setFeedback('');
    setSelectedAnswer('');
    setIsCorrect(false);
    setShowCongrats(false);
  };

  const navigateToHome = () => {
    navigation.navigate('Code'); // Ajuste se necessário
  };

  const navigateToCode = () => {
    navigation.navigate('Code');
  };

  if (showCongrats) {
    return (
      <View style={styles.congratsContainer}>
        <TouchableOpacity onPress={navigateToCode} style={styles.backButton}>
          <View style={styles.circle}>
            <Icon name="arrow-back" size={30} color="#fff" />
          </View>
        </TouchableOpacity>
        <Image source={{uri: 'https://example.com/congrats-image.png'}} style={styles.congratsImage} />
        <Text style={styles.congratsText}>Parabéns! Você concluiu todos os exercícios!</Text>
        <TouchableOpacity style={styles.homeButton} onPress={navigateToHome}>
          <Text style={styles.homeButtonText}>Voltar para Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetButton} onPress={resetExercises}>
          <Text style={styles.resetButtonText}>Reiniciar Exercícios</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const currentExercise = exercises[currentExerciseIndex];

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigateToCode} style={styles.backButton}>
        <View style={styles.circle}>
          <Icon name="arrow-back" size={30} color="#fff" />
        </View>
      </TouchableOpacity>
      <Text style={styles.header}>Exercícios de PHP</Text>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        {currentExercise ? (
          <View key={currentExercise.id} style={styles.exerciseContainer}>
            <Text style={styles.exerciseTitle}>{currentExercise.title}</Text>
            <View style={styles.questionContainer}>
              <Text style={styles.questionText}>{currentExercise.question}</Text>
              {currentExercise.options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    selectedAnswer === option.charAt(0) && styles.selectedOption
                  ]}
                  onPress={() => setSelectedAnswer(option.charAt(0))}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity style={styles.checkButton} onPress={checkAnswer}>
                <Text style={styles.checkButtonText}>Verificar Resposta</Text>
              </TouchableOpacity>
              {feedback !== '' && <Text style={isCorrect ? styles.correctFeedback : styles.incorrectFeedback}>{feedback}</Text>}
              <TouchableOpacity
                style={[styles.nextButton, !isCorrect && { backgroundColor: '#ccc' }]}
                onPress={nextExercise}
                disabled={!isCorrect}
              >
                <Text style={styles.nextButtonText}>Próximo Exercício</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <Text style={styles.noExerciseText}>Nenhum exercício disponível.</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#545454',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  congratsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#2e2e2e',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  congratsImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: '#00ffff',
  },
  congratsText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  homeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#00ffff',
    alignItems: 'center',
    width: '100%',
  },
  homeButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  resetButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#007bff',
    alignItems: 'center',
    width: '100%',
  },
  resetButtonText: {
    color: '#FFF',
    fontSize: 16,
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
  scrollContent: {
    alignItems: 'center',
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
  questionContainer: {
    backgroundColor: '#454545',
    padding: 20,
    borderRadius: 5,
    width: '100%',
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
  selectedOption: {
    backgroundColor: '#2b961f',
  },
  optionText: {
    fontSize: 16,
    color: '#FFF',
  },
  checkButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#28a745',
    alignItems: 'center',
    width: '100%',
  },
  checkButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  correctFeedback: {
    color: 'green',
    marginTop: 10,
    fontSize: 16,
  },
  incorrectFeedback: {
    color: 'red',
    marginTop: 10,
    fontSize: 16,
  },
  nextButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#007bff',
    alignItems: 'center',
    width: '100%',
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  noExerciseText: {
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default App;
