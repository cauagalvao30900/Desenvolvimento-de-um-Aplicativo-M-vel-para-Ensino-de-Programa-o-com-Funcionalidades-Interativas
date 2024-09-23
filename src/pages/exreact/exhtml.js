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
