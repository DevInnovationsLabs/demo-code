import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const SCREENS = [
  {
    key: '1',
    title: 'Welcome to the HR Application',
    description:
      'Welcome to HRD App! Elevate your attendance\nexperience with ease and efficiency! Begin your\nproductive journey today!',
    image: require('../assets/hello.png'),
  },
  {
    key: '2',
    title: 'Seamless design and feature\nimprovement',
    description:
      'Simplify your HR processes and enhance your\nworkflow with our intuitive features designed for\nultimate flexibility.',
    image: require('../assets/rafiki.png'),
  },
  {
    key: '3',
    title: 'All employee duty in one app!',
    description:
      "Ready for peak productivity? Let's dive in and\nelevate your efficiency!",
    image: require('../assets/chair.png'),
  },
];

const BASE_DOT_WIDTH = 16;
const MAX_DOT_WIDTH = 74;

const CARD_PADDING = 24;

export default function OnboardingScreen() {
  const navigation = useNavigation();
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef(null);
  const [index, setIndex] = useState(0);

  const textOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(textOpacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  }, [index]);

  const handleSkip = () => navigation.replace('Login');

  const handleNext = () => {
    if (index < SCREENS.length - 1) {
      scrollRef.current.scrollTo({
        x: (index + 1) * width,
        animated: true,
      });
    } else {
      navigation.replace('Login');
    }
  };

  const onScrollEnd = e => {
    const x = e.nativeEvent.contentOffset.x;
    setIndex(Math.round(x / width));
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFE7D9" />

      <TouchableOpacity style={styles.skipContainer} onPress={handleSkip}>
        <Image source={require('../assets/skip.png')} style={styles.skipIcon} />
      </TouchableOpacity>

      <Animated.ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false },
        )}
      >
        {SCREENS.map((screen, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
          });

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1, 0.8],
          });

          return (
            <Animated.View
              key={screen.key}
              style={[styles.page, { opacity, transform: [{ scale }] }]}
            >
              <Image source={screen.image} style={styles.illustration} />
            </Animated.View>
          );
        })}
      </Animated.ScrollView>

      <View style={styles.card}>
        <Animated.View style={{ opacity: textOpacity }}>
          <Text style={styles.title}>{SCREENS[index].title}</Text>
          <Text style={styles.description}>{SCREENS[index].description}</Text>
        </Animated.View>

        <View style={styles.bottomRowAbsolute}>
          <View style={styles.dotsRow}>
            {SCREENS.map((_, i) => {
              const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

              const animatedWidth = scrollX.interpolate({
                inputRange,
                outputRange: [BASE_DOT_WIDTH, MAX_DOT_WIDTH, BASE_DOT_WIDTH],
                extrapolate: 'clamp',
              });

              return (
                <Animated.View
                  key={i}
                  style={[
                    styles.dot,
                    {
                      width: animatedWidth,
                      backgroundColor: index === i ? '#FF6000' : '#FFCEB0',
                    },
                  ]}
                />
              );
            })}
          </View>

          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>
              {index === SCREENS.length - 1 ? 'Login' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#FFE7D9' },

  skipContainer: {
    marginTop: 30,
    position: 'absolute',
    top: 55,
    right: 20,
    zIndex: 10,
  },

  skipIcon: {
    width: 53,
    height: 20,
    resizeMode: 'contain',
  },

  page: { width, height, alignItems: 'center' },

  illustration: {
    width: width * 0.75,
    height: height * 0.35,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 200,
  },

  card: {
    width,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    minHeight: height * 0.38,
  },

  title: {
    fontFamily: 'Inter_24pt-Medium',
    paddingTop: 32,
    paddingHorizontal: CARD_PADDING,
    fontSize: 22,
    fontWeight: '500',
    color: '#0C0E11',
    marginBottom: 12,
  },

  description: {
    fontFamily: 'Inter_24pt-Regular',
    fontWeight: '400',
    fontSize: 14,
    paddingHorizontal: CARD_PADDING,
    color: '#454545',
    lineHeight: 20,
    marginBottom: 35,
  },
  bottomRowAbsolute: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: CARD_PADDING,
    paddingVertical: 32,
  },

  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  dot: {
    height: 6,
    borderRadius: 3,
    marginRight: 7,
  },

  button: {
    backgroundColor: '#FF6000',
    height: 48,
    width: 110,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
