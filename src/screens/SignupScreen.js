import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SignupScreen() {
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>

        <TouchableOpacity
          style={styles.backTopLeft}
          onPress={() => navigation.navigate('Login')}
        >
          <Image
            source={require('../assets/back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>

        <Image
          source={require('../assets/SplashImg.png')}
          style={styles.logo}
        />

        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Text style={styles.headerText}>Activate Your Account</Text>
        </View>

        <View style={styles.subHeaderContainer}>
          <Text style={styles.subHeaderText}>
            Please make sure you have been invited by your
          </Text>
          <Text style={styles.subHeaderText}>
            company to activate your account
          </Text>
        </View>

        <View style={styles.formContainer}>

          <Text style={styles.label}>Email</Text>
          <TextInput placeholder="Email address" style={styles.input} />

          <Text style={styles.label}>Password</Text>
          <TextInput placeholder="Password" secureTextEntry style={styles.input} />

          <Text style={styles.label}>Confirm Password</Text>
          <TextInput placeholder="Confirm Password" secureTextEntry style={styles.input} />

          <TouchableOpacity style={styles.loginBtn}>
            <Text style={styles.loginText}>Send</Text>
          </TouchableOpacity>

          <View style={styles.helperRow}>
            <Text style={styles.helperNormal}>
              Having issues with the activation?
            </Text>
            <TouchableOpacity onPress={() => console.log('Chat Us pressed!')}>
              <Text style={styles.helperChatUs}> Chat Us</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe7d9',
  },

  backTopLeft: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 10,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: '#000000ff',
  },

  logo: {
    alignSelf: 'center',
    marginTop: 113,
  },

  headerText: {
    fontFamily: 'Inter_24pt-Medium',
    fontWeight: '500',
    fontSize: 16,
    color: '#0C0E11',
  },

  subHeaderContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  subHeaderText: {
    color: '#6B6D79',
    fontFamily: 'Inter_24pt-Medium',
    fontWeight: '500',
    fontSize: 14,
  },

  formContainer: {
    flex: 1,
    width: '100%',
    marginTop: 40,
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 20,
  },

  label: {
    fontFamily: 'Inter_24pt-Medium',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 25,
  },
input: {
  backgroundColor: '#F1F2F3',
  height: 40,
  color:'#6B6D79',
  borderColor: '#C5C5C5',
  borderWidth: 1,
  marginTop: 12,
  paddingHorizontal: 10,
  borderRadius: 8,
  paddingLeft: 12,
},

  loginBtn: {
    backgroundColor: '#ff6e4e',
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  loginText: {
    color: '#fff',
    fontFamily: 'Inter_24pt-Medium',
    fontWeight: '500',
  },

  helperRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 18,
  },
  helperNormal: {
    color: '#6B6D79',
    fontSize: 14,
    fontFamily: 'Inter_24pt-Medium',
    fontWeight: '500',
  },
  helperChatUs: {
    color: '#ff6e4e',
    fontSize: 14,
    fontFamily: 'Inter_24pt-Medium',
    fontWeight: '500',
  },
});
