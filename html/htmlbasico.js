import React, { useRef } from 'react';
import { StyleSheet, View, Animated, Image, ScrollView, Text, TouchableOpacity } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

const SECTION_TOP_OFFSET = 300;
const SECTION_BORDER_RADIUS = 60;

const lessons = [
  { name: 'Aula 1', screen: 'aulahtml1' },
  { name: 'Aula 2', screen: 'aulahtml2' },
  { name: 'Aula 3', screen: 'aulahtml3' },
  { name: 'Aula 4', screen: 'aulahtml4' },
  { name: 'Aula 5', screen: 'aulahtml5' },
];

export default function Example({ navigation }) {
  const scrollY = useRef(new Animated.Value(0)).current;
  const animatedBackgroundScale = scrollY.interpolate({
    inputRange: [
      -SECTION_TOP_OFFSET - 100,
      -SECTION_TOP_OFFSET,
      0,
      SECTION_TOP_OFFSET,
      SECTION_TOP_OFFSET + 50,
      SECTION_TOP_OFFSET + 100,
    ],
    outputRange: [1.5, 1.25, 1.1, 1, 0, 0],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <FeatherIcon name="arrow-left" size={24} color="white" />
      </TouchableOpacity>
      <Animated.View
        style={[
          styles.backgroundImage,
          {
            transform: [
              { scaleX: animatedBackgroundScale },
              { scaleY: animatedBackgroundScale },
            ],
          },
        ]}>
        <Image
          style={styles.backdrop}
          resizeMode="cover"
          source={{ uri: 'https://img.freepik.com/vetores-gratis/programacao-html5-desenvolvimento-de-sites-da-internet-engenharia-de-aplicativos-da-web-escrita-de-scripts-otimizacao-de-codigo-html-programador-corrigindo-bugs_335657-2678.jpg' }}
        />
      </Animated.View>
      <ScrollView
        style={styles.scrollView}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={16}>
        <View style={styles.content}>
          <Text style={styles.descriptionText}>
            Estamos prestes a mergulhar no universo do HyperText Markup Language (HTML). Nesta parte do curso, vamos explorar os fundamentos essenciais para criar páginas da web, entender a estrutura básica do HTML e aprender a criar conteúdo web interativo e acessível.
          </Text>
        </View>
        <View style={styles.lessonsOverlay}>
          <View style={styles.lessons}>
            <Text style={styles.lessonsTitle}>Básico</Text>
            {lessons.map(({ name, screen }, index) => (
              <TouchableOpacity
                key={index}
                style={styles.card}
                onPress={() => navigation.navigate(screen, { lessonName: name })}>
                <Text style={styles.cardIcon}>0{index + 1}</Text>
                <View style={styles.lessonDetails}>
                  <Text style={styles.cardTitle}>{name}</Text>
                </View>
                <View style={styles.cardAction}>
                  <FeatherIcon color="#fff" name="book-open" size={20} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#363636',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 400,
    zIndex: 1,
  },
  backdrop: {
    width: '100%',
    height: '100%',
  },
  scrollView: {
    flex: 1,
    zIndex: 2,
  },
  content: {
    flex: 1,
    marginTop: SECTION_TOP_OFFSET,
    backgroundColor: '#363636',
    borderTopLeftRadius: SECTION_BORDER_RADIUS,
    borderTopRightRadius: SECTION_BORDER_RADIUS,
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  descriptionText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#ffffff',
    lineHeight: 24,
    textAlign: 'center',
  },
  lessonsOverlay: {
    backgroundColor: '#363636',
    alignItems: 'center',
  },
  lessons: {
    width: '100%',
    borderTopLeftRadius: SECTION_BORDER_RADIUS,
    borderTopRightRadius: SECTION_BORDER_RADIUS,
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
  lessonsTitle: {
    fontSize: 25,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 12,
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#363636',
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    shadowColor: '#00ffff',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    width: '100%',
    alignSelf: 'center',
  },
  cardIcon: {
    fontSize: 17,
    fontWeight: '700',
    color: '#00ffff',
    marginRight: 16,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#ffffff',
  },
  cardAction: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00ffff',
    marginLeft: 'auto',
  },
  lessonDetails: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 3,
  },
  lessonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lessonText: {
    fontSize: 24,
    color: '#ffffff',
  },
});

