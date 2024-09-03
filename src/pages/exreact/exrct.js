import React, { useState } from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Animated } from 'react-native';
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

  const fadeAnim = useState(new Animated.Value(0))[0];

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
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true
        }).start();
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
    fadeAnim.setValue(0);  // Reset fade animation
  };

  const navigateToHome = () => {
    navigation.navigate('Code');
  };

  const navigateToCode = () => {
    navigation.navigate('Code');
  };

  if (showCongrats) {
    return (
      <Animated.View style={[styles.congratsContainer, { opacity: fadeAnim }]}>
        <TouchableOpacity onPress={navigateToCode} style={styles.backButton}>
          <View style={styles.circle}>
            <Icon name="arrow-back" size={30} color="#fff" />
          </View>
        </TouchableOpacity>
        <Text style={styles.congratsText}>Parabéns! Você concluiu todos os exercícios!</Text>
        <TouchableOpacity style={styles.homeButton} onPress={navigateToHome}>
          <Text style={styles.homeButtonText}>Voltar para Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetButton} onPress={resetExercises}>
          <Text style={styles.resetButtonText}>Reiniciar Exercícios</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigateToCode} style={styles.backButton}>
        <View style={styles.circle}>
          <Icon name="arrow-back" size={30} color="#fff" />
        </View>
      </TouchableOpacity>
      <Text style={styles.header}>Exercícios de React</Text>
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
    backgroundColor: '#333',
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
    backgroundColor: '#007bff',
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
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 25,
    marginTop: 20,
    alignItems: 'center',
    width: '100%',
  },
  checkButtonText: {
    fontSize: 16,
    color: '#FFF',
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
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 25,
    marginTop: 20,
    alignItems: 'center',
    width: '100%',
  },
  nextButtonText: {
    fontSize: 16,
    color: '#FFF',
  },
  resetButton: {
    backgroundColor: '#ff5722',
    paddingVertical: 10,
    borderRadius: 25,
    marginTop: 20,
    alignItems: 'center',
    width: '100%',
  },
  resetButtonText: {
    fontSize: 16,
    color: '#FFF',
  },
  homeButton: {
    backgroundColor: '#4CAF50',
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
