import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNav from '../screens/BottomNav';

export default function HomePage({ navigation }) {

  const STATS = [
  {
    label: 'Clock-In',
    time: '07:40',
    icon: require('../assets/clock-in.png'),
  },
  {
    label: 'Clock-Out',
    time: '16:40',
    icon: require('../assets/afternoon.png'),
  },
  {
    label: 'Working Hrs',
    time: '09h00m',
    icon: require('../assets/countdown.png'),
  },
];

const FEATURES = [
  { label: 'Leave', icon: require('../assets/Holiday.png') },
  { label: 'Swap\nSchedule', icon: require('../assets/Calendar.png') ,onPress: () => navigation.navigate('SwapSchedule')  },
  { label: 'Overtime', icon: require('../assets/Timer.png') },
  { label: 'Permissions', icon: require('../assets/Agreement.png') },
  { label: 'My Payslip', icon: require('../assets/Purchase Order.png') },
  { label: 'My Archives', icon: require('../assets/Documents.png') },
  { label: 'Koperasi', icon: require('../assets/Bank Building.png') },
  { label: 'Report', icon: require('../assets/System Report.png') },
];

const ACTIVITIES = [
  {
    title: 'Clock-In',
    date: '01 Nov 2023',
    time: '07:30',
    status: 'On-time',
    icon: require('../assets/icon-clock4.png'),
  },
  {
    title: 'Clock-Out',
    date: '01 Nov 2023',
    time: '16:30',
    status: 'On-time',
    icon: require('../assets/icon-clock3.png'),
  },
  {
    title: 'Clock-In',
    date: '31 Sep 2023',
    time: '07:30',
    status: 'On-time',
    icon: require('../assets/icon-clock2.png'),
  },
  {
    title: 'Clock-Out',
    date: '31 Sep 2023',
    time: '16:30',
    status: 'On-time',
    icon: require('../assets/icon-clock.png'),
  },
];
  const [showLocationPopup, setShowLocationPopup] = useState(true);
  const [clockedIn, setClockedIn] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [showCapturePopup, setShowCapturePopup] = useState(false);

  const handleClockIn = async () => {
    if (!clockedIn) {
      try {
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
          );
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            alert('Camera permission denied');
            return;
          }
        }

        launchCamera(
          {
            mediaType: 'photo',
            saveToPhotos: false,
            cameraType: 'front',
          },
          res => {
            if (res.didCancel) return;
            if (res.assets && res.assets.length > 0) {
              const photoUri = res.assets[0].uri;

              setCapturedImage(photoUri);
              setShowCapturePopup(true);
              setClockedIn(true);
            }
          },
        );
      } catch (err) {
        console.warn(err);
      }
    } else {
      setClockedIn(false);
      setCapturedImage(null);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/HomePage.png')}
      style={styles.bg}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safe}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 140 }}
        >

          <View style={styles.profileSection}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={require('../assets/profile.png')}
                style={styles.profileImg}
              />
              <View>
                <Text style={styles.profileName}>Bayu Prasetya Adji S</Text>
                <Text style={styles.profileRole}>Product Designer</Text>
              </View>
            </View>
            <TouchableOpacity
              style={{
                height: 24,
                width: 24,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image
                source={require('../assets/Bell.png')}
                style={styles.bellIcon}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.timeBlock}>
            <Text style={styles.timeText}>07:40</Text>
            <Text style={styles.dateText}>Monday, 01 November</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.clockBtn}
            onPress={handleClockIn}
          >
            <Image
              source={
                clockedIn
                  ? require('../assets/out-clock.png')
                  : require('../assets/btn-clock.png')
              }
              style={styles.clockImage}
            />
          </TouchableOpacity>

          <View style={styles.locationBlock}>
            <Image
              source={require('../assets/pin-loc.png')}
              style={styles.locationIcon}
            />
            <Text style={styles.locationText}>
              Jl. Majapahit No.23, Semarang
            </Text>
          </View>

          <View style={styles.statsRow}>
            {STATS.map((item, i) => (
              <View key={i} style={styles.statItem}>
                <Image source={item.icon} style={styles.statIcon} />
                <Text style={styles.statTime}>{item.time}</Text>
                <Text style={styles.statLabel}>{item.label}</Text>
              </View>
            ))}
          </View>

          <View style={styles.bottomSheet}>
            <View style={styles.featureGrid}>
              {FEATURES.map((item, i) => (
                <TouchableOpacity key={i} style={styles.featureCard} onPress={item.onPress}>
                  <View style={styles.featureIconWrap}>
                    <Image source={item.icon} style={styles.featureIcon} />
                  </View>
                  <Text style={styles.featureLabel}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.dotsRow}>
              <View style={styles.dotActive} />
              <View style={styles.dotInactive} />
            </View>

            <Text style={styles.activityTitle}>Your Activity</Text>

            {ACTIVITIES.map((item, index) => (
              <View key={index} style={styles.activityCard}>
                <View style={styles.activityLeft}>
                  <View style={styles.activityIconCircle}>
                    <Image source={item.icon} style={styles.activityIcon} />
                  </View>
                  <View>
                    <Text style={styles.activityName}>{item.title}</Text>
                    <Text style={styles.activityDate}>{item.date}</Text>
                  </View>
                </View>

                <View style={styles.activityRight}>
                  <Text style={styles.activityTime}>{item.time}</Text>
                  <Text style={styles.activityStatus}>{item.status}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        <BottomNav navigation={navigation} activeTab="Home" />

        {showLocationPopup && (
          <View style={styles.popupOverlay}>
            <View style={styles.locationPopupBox}>
              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => setShowLocationPopup(false)}
              >
                <Image
                  source={require('../assets/close.png')}
                  style={styles.closeIcon}
                />
              </TouchableOpacity>

              <Image
                source={require('../assets/pana.png')}
                style={styles.locationIllustration}
                resizeMode="contain"
              />

              <Text style={styles.locationPopupTitle}>
                Enable Location for Seamless Attendance
              </Text>

              <TouchableOpacity
                style={styles.turnOnBtn}
                onPress={() => setShowLocationPopup(false)}
              >
                <Text style={styles.turnOnBtnText}>Turn On Location</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {showCapturePopup && (
          <View style={styles.popupOverlay}>
            <View style={styles.capturePopup}>
              <Image
                source={require('../assets/check.png')}
                style={styles.capturedImg}
              />

              <Text style={styles.captureTitle}>Attendance Successful!</Text>

              <Text style={styles.captureInfo}>
                Great job! Your attendance has been successfully recorded.
                You're all set for today.
              </Text>

              <TouchableOpacity
                style={styles.doneBtn}
                onPress={() => setShowCapturePopup(false)}
              >
                <Text style={styles.doneBtnText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },

  bg: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingTop: 0,
  },

  profileSection: {
    paddingTop: 50,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  profileImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },

  bellIcon: {
    width: 18,
    height: 19.5,
    tintColor: '#fff',
  },

  profileName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },

  profileRole: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFE8DB',
  },

  timeBlock: {
    alignItems: 'center',
    marginTop: 28,
  },

  timeText: {
    fontSize: 42,
    fontWeight: '700',
    color: '#fff',
  },

  dateText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFE8DB',
  },

  clockBtn: {
    alignSelf: 'center',
    marginTop: 28,
  },

  clockImage: {
    width: 160,
    height: 160,
    resizeMode: 'contain',
  },

  locationBlock: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 18,
    alignItems: 'center',
  },

  locationIcon: {
    width: 14,
    height: 14,
    tintColor: '#fff',
  },

  locationText: {
    fontSize: 13,
    marginLeft: 6,
    color: '#fff',
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 26,
  },

  statItem: { alignItems: 'center' },

  statIcon: {
    width: 22,
    height: 22,
  },

  statTime: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },

  statLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: '#FFE8DB',
  },

  bottomSheet: {
    marginTop: 42,
    backgroundColor: '#fff',
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingHorizontal: 22,
    paddingTop: 26,
    paddingBottom: 40,
    marginBottom: -110,
  },

  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  featureCard: {
    width: '22%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    alignItems: 'center',
    paddingVertical: 14,
    marginBottom: 18,
  },

  featureIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },

  featureIcon: {
    width: 24,
    height: 24,
  },

  featureLabel: {
    fontSize: 10.5,
    fontWeight: '600',
    textAlign: 'center',
    color: '#343741',
  },

  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },

  dotActive: {
    width: 22,
    height: 4,
    backgroundColor: '#FF6E4E',
    borderRadius: 4,
    marginHorizontal: 4,
  },

  dotInactive: {
    width: 6,
    height: 4,
    backgroundColor: '#FFD4C8',
    borderRadius: 4,
    marginHorizontal: 4,
  },

  activityTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
    marginBottom: 10,
  },

  activityCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 18,
    marginBottom: 12,
    elevation: 3,
  },

  activityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  activityIconCircle: {
    width: 32,
    height: 32,
    backgroundColor: '#FFCEB0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginRight: 10,
  },

  activityIcon: {
    width: 18,
    height: 18,
  },

  activityName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#161827',
  },

  activityDate: {
    fontSize: 12,
    fontWeight: '500',
    color: '#9A9CAC',
  },

  activityRight: {
    alignItems: 'flex-end',
  },

  activityTime: {
    fontSize: 14,
    fontWeight: '700',
  },

  activityStatus: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9A9CAC',
  },

  popupOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },

  locationPopupBox: {
    width: 282,
    height: 348,
    backgroundColor: '#fff',
    borderRadius: 24,
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: 'center',
    elevation: 10,
    position: 'relative',
  },

  closeBtn: {
    position: 'absolute',
    top: 14,
    right: 14,
    zIndex: 10,
  },

  closeIcon: {
    width: 24,
    height: 24,
  },

  locationIllustration: {
    width: 234,
    height: 140,
    marginTop: 10,
    marginBottom: 16,
  },

  locationPopupTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
    textAlign: 'center',
    width: 240,
    marginBottom: 22,
  },

  turnOnBtn: {
    width: 234,
    height: 40,
    backgroundColor: '#FF6E4E',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  turnOnBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  capturePopup: {
    width: 282,
    height: 310,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  capturedImg: {
    width: 90,
    height: 90,
    borderRadius: 12,
    marginBottom: 14,
  },

  captureTitle: {
    width: 234,
    height: 24,
    fontFamily: 'Inter_24pt-Bold',
    fontSize: 16,
    fontWeight: '600',
    color: '#0C0E11',
    marginTop: 4,
    textAlign: 'center',
  },

  captureInfo: {
    height: 60,
    width: 234,
    fontFamily: 'Inter_24pt-Regular',
    fontSize: 14,
    fontWeight: '400',
    color: '#000000',
    marginTop: 4,
    marginBottom: 16,
    textAlign: 'center',
  },

  doneBtn: {
    width: 234,
    height: 40,
    backgroundColor: '#FF6000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },

  doneBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
});
