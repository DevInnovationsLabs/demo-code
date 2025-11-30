import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Platform,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNav from '../screens/BottomNav';

const { width } = Dimensions.get('window');

export default function ActivityPage({ navigation }) {

  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('Month');

  const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];

const ActivityItem = ({ title, date, time, textStyle }) => (
  <View style={styles.card}>
    <View style={styles.leftContent}>
      <View style={styles.iconCircle}>
        <Image source={require('../assets/icon-clock2.png')} style={styles.cardIcon} />
      </View>

      <View style={styles.cardTextBlock}>
        <Text style={[styles.cardTitle]}>{title}</Text>
        <Text style={[styles.cardDate]}>{date}</Text>
      </View>
    </View>

    <View style={styles.rightContent}>
      <Text style={[styles.cardTime]}>{time}</Text>
      <Text style={[styles.cardStatus]}>On-time</Text>
    </View>
  </View>
);


  const selectMonth = (month) => {
    setSelectedMonth(month);
    setShowMonthDropdown(false);
  };

  const closeDropdown = () => {
    if (showMonthDropdown) setShowMonthDropdown(false);
  };

  return (
    <TouchableWithoutFeedback onPress={closeDropdown}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../assets/back.png')} style={styles.headerIcon} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Your Activity</Text>

          <TouchableOpacity>
            <Image source={require('../assets/Bell.png')} style={styles.headerIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.contentArea}>
          <View style={styles.filterRow}>
            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => setShowMonthDropdown(!showMonthDropdown)}
            >
              <Text style={styles.filterText}>{selectedMonth}</Text>
              <Image source={require('../assets/dropdown.png')} style={styles.filterBell} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterText}>Sort by</Text>
              <Image source={require('../assets/dropdown.png')} style={styles.filterBell} />
            </TouchableOpacity>
          </View>
          {showMonthDropdown && (
            <View style={styles.dropdown}>
              <FlatList
                data={months}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => selectMonth(item)}
                  >
                    <Text style={styles.dropdownText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20}}>

            <Text style={styles.sectionTitle}>November</Text>
            <ActivityItem title="Clock-In" date="01 November 2023" time="07:30" textStyle={styles.customText} />
            <ActivityItem title="Clock-Out" date="01 November 2023" time="16:30" />

            <Text style={styles.sectionTitle}>September</Text>
            <ActivityItem title="Clock-In" date="31 September 2023" time="07:30" />
            <ActivityItem title="Clock-Out" date="31 September 2023" time="16:30" />

          </ScrollView>

        </View>

        <BottomNav navigation={navigation} activeTab="Activity" />

      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({

  container: {
    flex: 1,
    width,
    backgroundColor: '#FFFFFF', 
  },

  header: {
    width,
    height: 56,
    paddingHorizontal: 24,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 1,
  },
  headerIcon: {
    width: 18,
    height: 20,
    tintColor: '#111',
  },
  headerTitle: {
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },

  contentArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  filterRow: {
    marginTop: 16,
    flexDirection: 'row',
    paddingHorizontal: 24,
    alignItems: 'center',
  },

  filterButton: {
    width: 104,
    height: 36,
    backgroundColor: '#E9EAEA',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 8,
  },
  filterText: {
    width: 44,
    height: 20,
    fontFamily: 'Inter_24pt-Medium',
    fontSize: 14,
    fontWeight: '800',
    color: '#111',
  },
  filterBell: {
    width: 20,
    height: 20,
  },

  dropdown: {
    width: 104,
    maxHeight: 200,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    alignSelf: 'flex-start',
    marginLeft: 24,
    marginTop: 6,
    zIndex: 999,
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  dropdownText: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#111',
  },

  sectionTitle: {
    marginTop: 24,
    marginBottom: 12,
    marginLeft: 24,
    fontFamily: 'Inter_24pt-Medium',
    fontStyle: 'style',
    fontSize: 16,
    fontWeight: '600',
    color: '#0C0E11',
  },
  customText:{
    fontFamily: 'Inter_24pt-Medium',
    fontSize: 16,
    color: '#222831',
    fontWeight: '600'
  },

  card: {
    width: width - 32,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 14,
    marginHorizontal: 16,
    marginBottom: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',

    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 7,
        shadowOffset: { width: 0, height: 2 },
      },
      android: {
        elevation: 3,
      },
    }),
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    borderRadius: 22,
    backgroundColor: '#FFE5CC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardIcon: {
    width: 32,
    height: 32,
  },
  cardTextBlock: {
    marginLeft: 12,
  },
  cardTitle: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },
  cardDate: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#A1A1A1',
    marginTop: 4,
  },

  rightContent: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  cardTime: {
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
  },
  cardStatus: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#A1A1A1',
    marginTop: 4,
  },

});
