import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SignupScreen() {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backTopLeft}
          onPress={() => navigation.goBack()}
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

        <Text style={styles.headerText}>Activate Your Account</Text>
        <Text style={styles.subHeader}>
          Please make sure you have been invited by your company to activate
          your account
        </Text>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="Email address"
            placeholderTextColor="#A8A8A8"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />

          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Password"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="default"
              placeholderTextColor="#A8A8A8"
              style={[styles.input, styles.passwordInput]}
            />
            <TouchableOpacity
              style={styles.eyeIconWrapper}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Image
                source={require('../assets/eye-open.png')}
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Confirm Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Confirm Password"
              secureTextEntry={!showConfirmPassword}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="default"
              placeholderTextColor="#A8A8A8"
              style={[styles.input, styles.passwordInput]}
            />
            <TouchableOpacity
              style={styles.eyeIconWrapper}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Image
                source={require('../assets/eye-open.png')}
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => setPopupVisible(true)}
          >
            <Text style={styles.loginText}>Send</Text>
          </TouchableOpacity>

          <Text style={styles.helperText}>
            Having issues with the activation?
            <Text style={styles.chatUs}> Chat Us</Text>
          </Text>
        </View>
        {/* Popup Modal */}
        <Modal
          transparent={true}
          visible={popupVisible}
          animationType="fade"
          onRequestClose={() => setPopupVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <View style={styles.modalImg}>
                <Image
                  source={require('../assets/check.png')}
                  resizeMode="contain"
                />
              </View>
              <Text style={{ ...styles.modalTitle,fontWeight:'bold',marginBottom:10,fontSize: 28 }}>Success!</Text>
              <Text style={{ ...styles.modalMsg,fontWeight:'bold',fontSize: 16,fontFamily: 'Inter_24pt-Regular' }}>
                Your activation request has been sent.
              </Text>

              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => {
                  setPopupVisible(false);
                  navigation.replace('Login');
                }}
              >
                <Text style={styles.closeBtnText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE7D9',
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
  },
  logo: {
    alignSelf: 'center',
    width: 163,
    height: 163,
    resizeMode: 'contain',
    marginTop: 118,
  },
  headerText: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: '600',
    color: '#0C0E11',
    textAlign: 'center',
  },
  subHeader: {
    marginTop: 8,
    fontSize: 14,
    textAlign: 'center',
    color: '#6B6D79',
    paddingHorizontal: 40,
    lineHeight: 20,
  },

  formContainer: {
    position: 'absolute',
    top: 416,
    width: '100%',
    minHeight: 428,
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    opacity: 1,
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    marginTop: 24,
  },
  input: {
    backgroundColor: '#F1F2F3',
    height: 50,
    marginTop: 10,
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 14,
  },
  passwordContainer: {
    position: 'relative',
    justifyContent: 'center',
  },
  passwordInput: {
    paddingRight: 45,
  },
  eyeIconWrapper: {
    position: 'absolute',
    right: 12,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  eyeIcon: {
    width: 20,
    height: 20,
    tintColor: '#6B6D79',
    resizeMode: 'contain',
    marginTop: 8,
  },
  loginBtn: {
    backgroundColor: '#FF6000',
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  helperText: {
    textAlign: 'center',
    marginTop: 24,
    color: '#6B6D79',
  },
  chatUs: {
    color: '#FF6000',
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalBox: {
    width: 260,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    color: '#111',
  },
  modalMsg: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  closeBtn: {
    backgroundColor: '#FF6000',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  closeBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  modalImg: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },
});
