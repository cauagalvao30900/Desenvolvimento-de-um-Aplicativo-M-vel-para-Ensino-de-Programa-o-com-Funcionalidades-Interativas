import React, { useRef } from 'react';
import { StyleSheet, View, Animated, Image, ScrollView, Text, TouchableOpacity } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

const SECTION_TOP_OFFSET = 300;
const SECTION_BORDER_RADIUS = 60;

const lessons = [
  { name: 'Aula 1', screen: 'RstBasic' },
  { name: 'Aula 2', screen: 'Aula2' },
  { name: 'Aula 3', screen: 'aula3' },
  { name: 'Aula 4', screen: 'aula4' },
  { name: 'Aula 5', screen: 'aula5' },
];

function LessonScreen({ route }) {
  const { lessonName } = route.params;

  return (
    <View style={styles.lessonContainer}>
      <Text style={styles.lessonText}>{lessonName}</Text>
    </View>
  );
}

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
          source={{ uri: 'https://c4.wallpaperflare.com/wallpaper/294/834/442/reactjs-facebook-javascript-minimalism-wallpaper-preview.jpg' }}
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
            Vocês aprenderão sobre expansões/Documentos React, que são técnicas
            poderosas para criar interfaces de usuário dinâmicas e
            reutilizáveis. Explorarão como criar e gerenciar expansões,
            entenderão os benefícios de usar expansões em vez de componentes
            tradicionais e aprenderão a integrar expansões em projetos React
            existentes.
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
