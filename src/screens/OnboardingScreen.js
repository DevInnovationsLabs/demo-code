import React, { useRef, useState } from 'react';
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
      "Welcome to HRD App! Elevate your attendance experience with ease and efficiency! Begin your productive journey today!",
    image: require('../assets/hello.png'),
  },
  {
    key: '2',
    title: 'Seamless design and feature improvement',
    description:
      'Simplify your HR processes and enhance your workflow with our intuitive features designed for ultimate flexibility.',
    image: require('../assets/rafiki.png'),
  },
  {
    key: '3',
    title: 'All employee duty in one app!',
    description:
      "Ready for peak productivity? Let’s dive in and elevate your efficiency!",
    image: require('../assets/chair.png'),
  },
];

export default function OnboardingScreen() {
  const navigation = useNavigation();
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef(null);
  const [index, setIndex] = useState(0);

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

  const onScrollEnd = (e) => {
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
          { useNativeDriver: false }
        )}
      >
        {SCREENS.map((screen, i) => (
          <View key={screen.key} style={styles.page}>

            <View style={styles.illustrationWrapper}>
              <Image source={screen.image} style={styles.illustration} />
            </View>

            <View style={styles.card}>
              <Text style={styles.title}>{screen.title}</Text>
              <Text style={styles.description}>{screen.description}</Text>

              <View style={styles.bottomRow}>
                <View style={styles.dotsRow}>
                  {SCREENS.map((_, dotIndex) => {
                    const inputRange = [
                      (dotIndex - 1) * width,
                      dotIndex * width,
                      (dotIndex + 1) * width,
                    ];

                    const animatedWidth = scrollX.interpolate({
                      inputRange,
                      outputRange: [8, 28, 8],
                      extrapolate: 'clamp',
                    });

                    const isActive = dotIndex === index;

                    return (
                      <Animated.View
                        key={dotIndex}
                        style={[
                          styles.dot,
                          {
                            width: animatedWidth,
                            backgroundColor: isActive ? '#FF6E4E' : '#FFCBBF',
                          },
                        ]}
                      />
                    );
                  })}
                </View>

                <TouchableOpacity style={styles.button} onPress={handleNext}>
                  <Text style={styles.buttonText}>
                    {i === SCREENS.length - 1 ? 'Login' : 'Next'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFE7D9',
  },
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
  page: {
    width,
    height,
    alignItems: 'center',
  },
  illustrationWrapper: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 10,
  },
  illustration: {
    width: width * 0.75,
    height: height * 0.35,
    resizeMode: 'contain',
  },
  title: {
    width: 342,
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: 0,
    color: '#0C0E11',
    marginBottom: 12,
  },
  description: {
    width: 342,
    fontFamily: 'Inter-Regular',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
    color: '#6B6D79',
    marginBottom: 35,
  },

  card: {
    width,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
    minHeight: height * 0.38,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginRight: 7,
  },
  button: {
    backgroundColor: '#FF6E4E',
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
    fontFamily: 'Inter-Medium',
  },
});
