import React, { useRef } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const SECTION_TOP_OFFSET = 200;
const SECTION_BORDER_RADIUS = 40;

const lessons = [
  {
    name: 'Aula 1',
    duration: 22,
    screen: 'Aula1',
  },
  {
    name: 'Aula 2',
    duration: 12,
    screen: 'Aula 3',
  },
  {
    name: 'Aula 3',
    duration: 37,
    screen: 'BasicShooting',
  },
  {
    name: 'Aula 4',
    duration: 12,
    screen: 'BasicsOfLivestream',
  },
  {
    name: 'Aula 5',
    duration: 23,
    screen: 'ClassicLightingTechniques',
  },
];

function LessonScreen({ route }) {
  const { lessonName } = route.params;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{lessonName}</Text>
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
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <Animated.View
        style={{
          transform: [
            {
              scaleX: animatedBackgroundScale,
            },
            {
              scaleY: animatedBackgroundScale,
            },
          ],
        }}>
        <Image
          style={styles.backdrop}
          resizeMode="cover"
          source={{
            uri: 'https://crowdbotics.ghost.io/content/images/2019/06/React-Event-Listeners.png',
          }}
        />
      </Animated.View>
      <ScrollView
        style={styles.container}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY,
                },
              },
            },
          ],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={1}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>React JS</Text>

            <View style={styles.headerBadge}>
              <FeatherIcon name="code" color="#fff" size={24} />
            </View>
          </View>

          <Text style={styles.text}>
            Vocês aprenderão sobre expansões/Documentos React, que são técnicas
            poderosas para criar interfaces de usuário dinâmicas e
            reutilizáveis. Explorarão como criar e gerenciar expansões,
            entenderão os benefícios de usar expansões em vez de componentes
            tradicionais e aprenderão a integrar expansões em projetos React
            existentes.
          </Text>

          <View style={styles.stats}>
            <View style={styles.statsItem}></View>
            <View style={styles.statsItem}></View>
          </View>
        </View>
        <View style={styles.lessonsOverlay}>
          <View style={styles.lessons}>
            <Text style={styles.lessonsTitle}>Intermediário</Text>

            {lessons.map(({ name, duration, screen }, index) => (
              <TouchableOpacity
                key={index}
                style={styles.card}
                onPress={() => navigation.navigate(screen, { lessonName: name })}>
                <Text style={styles.cardIcon}>0{index + 1}</Text>

                <View style={styles.lessonDetails}>
                  <Text style={styles.cardTitle}>{name}</Text>

                  <Text style={styles.cardDuration}>
                    {duration} minutes
                  </Text>
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
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    height: 400,
  },
  container: {
    flex: 1,
    position: 'relative',
    zIndex: 2,
  },
  content: {
    flex: 1,
    marginTop: SECTION_TOP_OFFSET,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: SECTION_BORDER_RADIUS,
    borderTopRightRadius: SECTION_BORDER_RADIUS,
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
  text: {
    marginTop: 16,
    fontSize: 15,
    fontWeight: '500',
    color: '#3c3c3c',
    lineHeight: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000000',
  },
  headerBadge: {
    backgroundColor: '	#FFFFFF',
    width: 46,
    height: 46,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stats: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statsItemText: {
    marginLeft: 4,
    fontSize: 13,
    fontWeight: '600',
    color: '#185aca',
  },
  lessons: {
    backgroundColor: 'white',
    borderTopLeftRadius: SECTION_BORDER_RADIUS,
    borderTopRightRadius: SECTION_BORDER_RADIUS,
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
  lessonsOverlay: {
    backgroundColor: '#FFFFFF',
  },
  lessonsTitle: {
    fontSize: 25,
    fontWeight: '700',
    color: '#2c2c2c',
    marginBottom: 12,
  },
  card: {
    paddingTop: 12,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  cardIcon: {
    fontSize: 17,
    fontWeight: '700',
    color: '#185aca',
    marginRight: 16,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#2c2c2c',
    marginBottom: 4,
  },
  cardDuration: {
    fontSize: 13,
    fontWeight: '500',
    color: '#94b1f0',
  },
  cardAction: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#696969',
  },
  lessonDetails: {
    flex: 1,
  },
});
