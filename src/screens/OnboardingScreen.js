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
      "Welcome to HRD App! elevate your attendance\nexperience with ease and efficiency! begin your\nproductive journey today!",
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
      "Ready for peak productivity? Let’s dive in and\nelevate your efficiency!",
    image: require('../assets/chair.png'), 
  },
];

const CARD_PADDING = 24;
const BASE_DOT_WIDTH = 8;
const MAX_DOT_WIDTH = 60;

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

  const handleDotPress = (dotIndex) => {
    scrollRef.current.scrollTo({
      x: dotIndex * width,
      animated: true,
    });
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
        {SCREENS.map((screen, i) => {
          
          const inputRange = [
            (i - 1) * width, 
            i * width,       
            (i + 1) * width, 
          ];

          const contentOpacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0], 
            extrapolate: 'clamp',
          });
          
          const contentScale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1, 0.8], 
            extrapolate: 'clamp',
          });

          return (
            <View key={screen.key} style={styles.page}>
              
              <View style={styles.contentAndCardWrapper}>
              
                <Animated.View 
                    style={[
                        styles.illustrationWrapper, 
                        { 
                            opacity: contentOpacity,
                            transform: [
                                { scale: contentScale },
                            ],
                        }
                    ]}
                >
                    <Image source={screen.image} style={styles.illustration} />
                </Animated.View>

                <View style={styles.card}>
                
                  <Animated.View
                    style={[{
                        opacity: contentOpacity,
                        transform: [{ scale: contentScale }],
                    }, styles.textBlockContainer]} 
                  >
                    <Text style={styles.title}>{screen.title}</Text>
                    <Text style={styles.description}>{screen.description}</Text>
                  </Animated.View>
                  
                  <View style={styles.bottomRowAbsolute}> 
                    <View style={styles.dotsRow}>
                      {SCREENS.map((_, dotIndex) => {
                        const dotInputRange = [
                          (dotIndex - 1) * width,
                          dotIndex * width,
                          (dotIndex + 1) * width,
                        ];
                        
                        const animatedWidth = scrollX.interpolate({
                          inputRange: dotInputRange,
                          outputRange: [BASE_DOT_WIDTH, MAX_DOT_WIDTH, BASE_DOT_WIDTH],
                          extrapolate: 'clamp',
                        });

                        const isActive = dotIndex === index;

                        return (
                          <TouchableOpacity 
                            key={dotIndex}
                            onPress={() => handleDotPress(dotIndex)}
                            hitSlop={{ top: 10, bottom: 10, left: 5, right: 5 }}
                          >
                            <Animated.View
                              style={[
                                styles.dot,
                                {
                                  width: animatedWidth, 
                                  backgroundColor: isActive ? '#FF6E4E' : '#FFCBBF',
                                },
                              ]}
                            />
                          </TouchableOpacity>
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
            </View>
          );
        })}
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
  contentAndCardWrapper: {
      flex: 1,
      width: width, 
      alignItems: 'center',
      position: 'relative', 
  },
  illustrationWrapper: {
    flex: 1, 
    justifyContent: 'center',
    marginTop: 10,
    paddingHorizontal: CARD_PADDING,
    width: '100%',
  },
  illustration: {
    width: width * 0.75,
    height: height * 0.35,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  card: {
    width,
    position: 'relative', 
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    flexShrink: 0, 
    minHeight: height * 0.38,
  },
  textBlockContainer: {
    paddingTop: 32, 
    paddingHorizontal: CARD_PADDING, 
    marginBottom: 60, 
  },
  title: {
    width: '100%', 
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: 0,
    color: '#0C0E11',
    marginBottom: 12,
  },
  description: {
    width: '100%',
    fontFamily: 'Inter-Regular',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
    color: '#6B6D79',
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
    justifyContent: 'flex-start',
  },
  dot: {
    height: BASE_DOT_WIDTH,
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