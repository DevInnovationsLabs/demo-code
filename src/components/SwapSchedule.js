import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNav from '../screens/BottomNav';

const { height } = Dimensions.get('window');

export default function SwapSchedule({ navigation }) {
  const [activeTab, setActiveTab] = useState('Upcoming');
  const [showDateModal, setShowDateModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [selectedDate, setSelectedDate] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState("Select Employee");

  const employees = ["Alexandro", "Joshua", "Daniel", "Michael"];

  const slideAnim = useRef(new Animated.Value(height)).current;

  const slideUp = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 350,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const slideDown = (cb) => {
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 250,
      useNativeDriver: true,
    }).start(() => cb && cb());
  };

  const openDateModal = () => {
    setShowDateModal(true);
    slideUp();
  };

  const closeDateModal = () => {
    slideDown(() => setShowDateModal(false));
  };

  const applySwap = () => {
    if (!selectedDate || selectedEmployee === "Select Employee") return;
    slideDown(() => {
      setShowDateModal(false);
      setTimeout(() => {
        setShowSuccessModal(true);
        slideUp();
      }, 200);
    });
  };

  const closeSuccessModal = () => slideDown(() => setShowSuccessModal(false));

  const cardData = [
    { status: "Pending", color: "#FFB200" },
    { status: "Approved", color: "#00C781" },
    { status: "Approved", color: "#00C781" },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>

      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../assets/back.png')} style={styles.headerIcon} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Swap Schedule</Text>

          <TouchableOpacity onPress={openDateModal}>
            <Image source={require('../assets/plus.png')} style={styles.headerIcon} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tabRow}>
        {['Upcoming', 'Past', 'Requested'].map(item => {
          const active = item === activeTab;
          return (
            <TouchableOpacity
              key={item}
              onPress={() => setActiveTab(item)}
              style={[styles.tabButton, active && styles.activeTabButton]}
            >
              <Text style={[styles.tabText, active && styles.activeTabText]}>{item}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView contentContainerStyle={styles.cardList}>
        {cardData.map((item, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.cardRow}>
              <Text style={styles.label}>Date</Text>
              <Text style={[styles.status, { color: item.color }]}>{item.status}</Text>
            </View>

            <Text style={styles.date}>06 December 2023</Text>

            <View style={styles.cardRow}>
              <View style={styles.nameSection}>
                <Text style={styles.label}>Name</Text>
                <Text style={styles.value}>Alexandro</Text>
              </View>

              <View style={styles.approveSection}>
                <Text style={styles.label}>Approved By</Text>
                <Text style={styles.value}>
                  {item.status === "Pending" ? "-" : "Joshua"}
                </Text>
              </View>
            </View>

          </View>
        ))}
      </ScrollView>

      {/* Bottom Nav Hidden During Modal */}
      {!showDateModal && !showSuccessModal && (
        <BottomNav navigation={navigation} activeTab="SwapSchedule" />
      )}

      <Modal transparent visible={showDateModal}>
        <View style={styles.backdrop}>
          <Animated.View style={[styles.dateModal, { transform: [{ translateY: slideAnim }] }]}>

            <View style={styles.dragLine} />
            <Text style={styles.sheetTitle}>Set The Dates</Text>
            <Text style={styles.calendarMonth}>December 2023</Text>

            <Text style={styles.subLabel}>Start</Text>

            <View style={styles.calendarGrid}>
              {Array.from({ length: 31 }).map((_, index) => {
                const day = index + 1;
                const selected = selectedDate === day;
                return (
                  <TouchableOpacity
                    key={index}
                    style={[styles.calendarCell, selected && styles.selectedDate]}
                    onPress={() => setSelectedDate(day)}
                  >
                    <Text style={[styles.calendarDate, selected && { color: '#fff' }]}>
                      {day}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={styles.employeeBox}>
              <Text style={styles.subLabel}>Name of Employee</Text>

              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setDropdownOpen(!dropdownOpen)}
              >
                <Text style={styles.dropdownValue}>{selectedEmployee}</Text>
                <Image source={require('../assets/dropdown.png')} style={styles.dropdownIcon} />
              </TouchableOpacity>

              {dropdownOpen && (
                <View style={styles.dropdownList}>
                  {employees.map((name, i) => (
                    <TouchableOpacity
                      key={i}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setSelectedEmployee(name);
                        setDropdownOpen(false);
                      }}
                    >
                      <Text style={styles.dropdownItemTxt}>{name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            <TouchableOpacity
              style={[
                styles.applyButton,
                (!selectedDate || selectedEmployee === "Select Employee") && { opacity: 0.4 }]}
              onPress={applySwap}
              disabled={!selectedDate || selectedEmployee === "Select Employee"}
            >
              <Text style={styles.applyButtonText}>Apply Swap</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.closeBtn} onPress={closeDateModal}>
              <Text style={{ fontSize: 26 }}>✕</Text>
            </TouchableOpacity>

          </Animated.View>
        </View>
      </Modal>

      <Modal transparent visible={showSuccessModal}>
        <View style={styles.backdrop}>
          <Animated.View style={[styles.successModal, { transform: [{ translateY: slideAnim }] }]}>

            <Image
              source={require('../assets/check.png')}
              style={{ width: 90, height: 90, marginBottom: 20 }}
            />

            <Text style={styles.successTitle}>Swap Schedule Applied Successfully</Text>

            <Text style={styles.successTxt}>
              Your leave request is in progress with HR and{'\n'}
              awaits your friend's approval. Please be patient.{'\n'}
              Thanks!
            </Text>

            <TouchableOpacity style={styles.doneButton} onPress={closeSuccessModal}>
              <Text style={styles.doneText}>Done</Text>
            </TouchableOpacity>

          </Animated.View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F4F6' },

  headerWrapper: {
    backgroundColor: '#fff',
    paddingTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center'
  },
  headerIcon: { width: 20, height: 20, tintColor: '#111' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#111' },

  tabRow: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16
  },
  tabButton: {
    width: 342 / 3 - 16,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  activeTabButton: { backgroundColor: '#FF6E4E' },
  tabText: { fontSize: 14, fontWeight: '600', color: '#444' },
  activeTabText: { color: '#FFF' },

  cardList: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 120,
    gap: 16,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    gap: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameSection: { width: '50%' },
  approveSection: { width: '50%', alignItems: 'flex-end' },
  label: { fontSize: 12, fontWeight: '500', color: '#9A9CAC' },
  date: { fontSize: 16, fontWeight: '700', color: '#111' },
  value: { fontSize: 15, fontWeight: '700', color: '#111' },
  status: { fontSize: 13, fontWeight: '700' },

  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  dateModal: {
    height: '75%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    padding: 20,
  },
  successModal: {
    height: '40%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    padding: 24,
    paddingBottom: 30,
    alignItems: 'center',
  },
  dragLine: {
    width: 60,
    height: 6,
    backgroundColor: '#ddd',
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 10,
  },
  sheetTitle: { fontSize: 18, fontWeight: '700', marginBottom: 6 },
  calendarMonth: { fontSize: 18, fontWeight: '700', marginBottom: 6 },

  subLabel: { fontSize: 13, fontWeight: '600', color: '#9A9CAC', marginVertical: 6 },
  calendarGrid: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 14 },
calendarCell: {
  width: '14.2%',
  height: 40,
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 6,
},


selectedDate: {
  backgroundColor: "#FF6E4E",
  width: 36,
  height: 36,
  borderRadius: 18,
  justifyContent: "center",
  alignItems: "center",
  alignSelf: "center"
},

calendarDate: {
  fontSize: 14,
  fontWeight: '600',
  color: '#111',
  textAlign: 'center'
},

  employeeBox: { marginBottom: 16 },
  dropdown: {
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownValue: { fontSize: 15, fontWeight: '600', color: '#111' },
  dropdownIcon: { width: 14, height: 14 },

  dropdownList: {
    width: "100%",
    backgroundColor: "#FFF",
    borderRadius: 8,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#DDD",
    marginTop: 6,
  },
  dropdownItem: { padding: 10 },
  dropdownItemTxt: { color: "#111", fontSize: 15 },

  applyButton: {
    backgroundColor: '#FF6E4E',
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  applyButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  closeBtn: { position: 'absolute', right: 18, top: 18 },

  successTitle: { fontSize: 16, fontWeight: '700', marginBottom: 10 },
  successTxt: { fontSize: 14, textAlign: 'center', width: '88%', marginBottom: 20 },

  doneButton: {
    backgroundColor: '#FF6000',
    height: 52,
    width: '100%',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneText: { fontSize: 16, fontWeight: '700', color: '#fff' },
});
