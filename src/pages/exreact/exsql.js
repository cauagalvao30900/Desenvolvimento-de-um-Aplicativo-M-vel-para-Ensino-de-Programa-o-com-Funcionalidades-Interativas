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
      question: "Qual comando SQL é usado para selecionar dados de um banco de dados?",
      options: [
        "a) SELECT",
        "b) GET",
        "c) OPEN",
        "d) RETRIEVE"
      ],
      correctAnswer: "a"
    },
    {
      id: 2,
      title: "Exercício 2",
      question: "Como você seleciona todas as colunas de uma tabela chamada 'clientes'?",
      options: [
        "a) SELECT * FROM clientes;",
        "b) SELECT all FROM clientes;",
        "c) SELECT clientes;",
        "d) SELECT FROM clientes;"
      ],
      correctAnswer: "a"
    },
    {
      id: 3,
      title: "Exercício 3",
      question: "Qual comando SQL é usado para atualizar dados em um banco de dados?",
      options: [
        "a) MODIFY",
        "b) SAVE",
        "c) UPDATE",
        "d) CHANGE"
      ],
      correctAnswer: "c"
    },
    {
      id: 4,
      title: "Exercício 4",
      question: "Como você adiciona uma condição para selecionar apenas os clientes com idade maior que 30?",
      options: [
        "a) SELECT * FROM clientes WHERE idade > 30;",
        "b) SELECT * FROM clientes HAVING idade > 30;",
        "c) SELECT * FROM clientes WHICH idade > 30;",
        "d) SELECT * FROM clientes FOR idade > 30;"
      ],
      correctAnswer: "a"
    },
    {
      id: 5,
      title: "Exercício 5",
      question: "Qual comando SQL é usado para deletar registros de um banco de dados?",
      options: [
        "a) REMOVE",
        "b) DELETE",
        "c) DROP",
        "d) CLEAR"
      ],
      correctAnswer: "b"
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
