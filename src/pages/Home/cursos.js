import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons'; // Para o ícone de voltar

const coursesData = {
  "React JS": [
    "React Native: A Complete Guide - Udemy - Aprende a criar aplicativos móveis nativos com React Native.",
    "React JS: The Complete Guide - Udemy - Dominando o desenvolvimento web com React JS.",
    "Modern React with Redux - Udemy - Envolva-se com a gestão de estado e Redux."
  ],
  PHP: [
    "Curso Completo de PHP - Udemy - Aprenda desde o básico até o avançado em PHP.",
    "PHP para Iniciantes - Alura - Uma introdução amigável ao PHP para iniciantes.",
    "Desenvolvimento Web com PHP - Coursera - Aprenda a criar sites dinâmicos com PHP."
  ],
  SQL: [
    "SQL para Iniciantes - Udemy - Fundamentos do SQL para quem está começando.",
    "SQL Complete Course - Coursera - Curso completo cobrindo todos os aspectos do SQL.",
    "Data Analysis with SQL - DataCamp - Foco em análise de dados usando SQL."
  ],
  HTML: [
    "HTML e CSS: Desenvolvimento Web Completo - Udemy - Aprenda HTML e CSS para desenvolvimento web.",
    "Curso de HTML5 e CSS3 - Codecademy - Introdução às novas funcionalidades do HTML5 e CSS3.",
    "HTML para Iniciantes - Khan Academy - Curso básico para quem está começando com HTML."
  ]
};

const CourseCard = ({ title, description }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardDescription}>{description}</Text>
  </View>
);

export default class Cursos extends Component {
  handleGoBack = () => {
    // Lógica para voltar à tela anterior (por exemplo, navegação)
    this.props.navigation.goBack();
  };

  renderCourseList = (title, courses) => (
    <View style={styles.section} key={title}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {courses.map((course, index) => (
        <CourseCard
          key={index}
          title={`Curso ${index + 1}`}
          description={course}
        />
      ))}
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Text style={styles.header}>Principais Cursos Populares</Text>
          {Object.keys(coursesData).map(category => 
            this.renderCourseList(category, coursesData[category])
          )}
        </ScrollView>
        <TouchableOpacity style={styles.backButton} onPress={this.handleGoBack}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#343434',
  },
  scrollViewContent: {
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#565656',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#00ffff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardDescription: {
    fontSize: 16,
    color: '#fff',
  },
  backButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: '#565656',
    borderRadius: 30,
    padding: 10,
    elevation: 5,
  },
});
