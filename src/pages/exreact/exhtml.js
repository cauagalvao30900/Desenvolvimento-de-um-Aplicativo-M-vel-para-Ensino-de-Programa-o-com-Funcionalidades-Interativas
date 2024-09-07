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
      question: "Qual tag é usada para definir um parágrafo em HTML?",
      options: [
        "a) <p>",
        "b) <para>",
        "c) <paragraph>",
        "d) <text>"
      ],
      correctAnswer: "a"
    },
    {
      id: 2,
      title: "Exercício 2",
      question: "Como você cria um link em HTML?",
      options: [
        "a) <a href='URL'>Texto</a>",
        "b) <link href='URL'>Texto</link>",
        "c) <url href='URL'>Texto</url>",
        "d) <hyperlink href='URL'>Texto</hyperlink>"
      ],
      correctAnswer: "a"
    },
    {
      id: 3,
      title: "Exercício 3",
      question: "Qual tag é usada para incluir uma imagem em HTML?",
      options: [
        "a) <img src='URL' />",
        "b) <image src='URL' />",
        "c) <picture src='URL' />",
        "d) <src='URL' />"
      ],
      correctAnswer: "a"
    },
    {
      id: 4,
      title: "Exercício 4",
      question: "Qual tag é usada para criar uma lista ordenada em HTML?",
      options: [
        "a) <ol>",
        "b) <ul>",
        "c) <list>",
        "d) <dl>"
      ],
      correctAnswer: "a"
    },
    {
      id: 5,
      title: "Exercício 5",
      question: "Como você define um título de nível 1 em HTML?",
      options: [
        "a) <h1>",
        "b) <title>",
        "c) <header>",
        "d) <head>"
      ],
      correctAnswer: "a"
    }
  ];

  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);

  const checkAnswer = () => {
    const correctAnswer = exercises[currentExerciseIndex].correctAnswer;
    if (selectedAnswer === correctAnswer) {
      setFeedback('Resposta correta!');
      setIsCorrect(true);
    } else {
      setFeedback('Resposta incorreta. Tente novamente.');
      setIsCorrect(false);
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
    navigation.navigate('Code');
  };

  const navigateToCode = () => {
    navigation.navigate('Code');
  };

  if (showCongrats) {
    return (
      <View style={styles.congratsContainer}>
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

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigateToCode} style={styles.backButton}>
        <View style={styles.circle}>
          <Icon name="arrow-back" size={30} color="#fff" />
        </View>
      </TouchableOpacity>
      <Text style={styles.header}>Exercícios de HTML</Text>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        <View key={exercises[currentExerciseIndex].id} style={styles.exerciseContainer}>
          <Text style={styles.exerciseTitle}>{exercises[currentExerciseIndex].title}</Text>
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{exercises[currentExerciseIndex].question}</Text>
            {exercises[currentExerciseIndex].options.map((option, index) => (
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
      </ScrollView>
      {currentExerciseIndex === exercises.length - 1 && (
        <TouchableOpacity style={styles.resetButton} onPress={resetExercises}>
          <Text style={styles.resetButtonText}>Reiniciar Exercícios</Text>
        </TouchableOpacity>
      )}
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
    backgroundColor: '#545454',
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
    backgroundColor: '#545454',
    alignItems: 'center',
    justifyContent: 'center',
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
    borderColor: '#545454',
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
    padding: 20,
    borderRadius: 5,
    width: '100%',
    backgroundColor: '#454545',
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
    backgroundColor: '#007bff',
    alignItems: 'center',
    width: '100%',
  },
  checkButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  correctFeedback: {
    color: '#00ff00',
    marginTop: 10,
    fontSize: 16,
  },
  incorrectFeedback: {
    color: '#ff0000',
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
  resetButton: {
    marginTop: 20,
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
  homeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#007bff',
    alignItems: 'center',
    width: '100%',
  },
  homeButtonText: {
    color: '#FFF',
    fontSize: 16,
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
