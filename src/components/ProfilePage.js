import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomNav from '../screens/BottomNav';

export default function ProfilePage({ navigation }) {

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/back.png')}
            style={styles.headerIcon}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Profile</Text>

        <TouchableOpacity style={{height:24,width:24,alignItems:'center',justifyContent:'center'}}>
          <Image
            source={require('../assets/Bell.png')}
            style={styles.headerIcon}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        
        <View style={styles.profileCard}>
          <View style={styles.profileLeft}>
            <Image
              source={require('../assets/woman.png')}
              style={styles.profilePic}
            />
            <View>
              <Text style={styles.profileName}>Annette Black</Text>
              <Text style={styles.profileRole}>Project Manager</Text>
            </View>
          </View>

          <TouchableOpacity>
            <Image
              source={require('../assets/pen.png')}
              style={styles.editIcon}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Account</Text>

        <TouchableOpacity style={styles.rowItem}>
          <View style={styles.rowLeft}>
            <Image source={require('../assets/terms.png')} style={styles.rowIcon} />
            <Text style={styles.rowText}>Awards</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Others</Text>

        <TouchableOpacity style={styles.rowItem}>
          <View style={styles.rowLeft}>
            <Image source={require('../assets/globe.png')} style={styles.rowIcon} />
            <Text style={styles.rowText}>Language</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.rowItem}>
          <View style={styles.rowLeft}>
            <Image source={require('../assets/badge.png')} style={styles.rowIcon} />
            <Text style={styles.rowText}>Term and Conditions</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.rowItem}>
          <View style={styles.rowLeft}>
            <Image source={require('../assets/info.png')} style={styles.rowIcon} />
            <Text style={styles.rowText}>Help</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.rowItem}>
          <View style={styles.rowLeft}>
            <Image source={require('../assets/call.png')} style={styles.rowIcon} />
            <Text style={styles.rowText}>Contact Us</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutBtn} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

      </ScrollView>

      <BottomNav navigation={navigation} activeTab="Profile" />

    </SafeAreaView>
  );
}

/************ STYLES ************/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  headerIcon: { width: 18, height: 19.5, tintColor: '#111' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#111' },

  profileCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 26,
    marginBottom:25,
    borderRadius: 18,
    paddingVertical: 20,
    paddingHorizontal: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 4,
  },
  profileLeft: { flexDirection: 'row', alignItems: 'center' },
  profilePic: { width: 54, height: 54, borderRadius: 27, marginRight: 14 },
  profileName: { fontSize: 16, fontWeight: '700', color: '#111' },
  profileRole: { fontSize: 13, color: '#777', marginTop: 3 },
  editIcon: { width: 22, height: 22, tintColor: '#111' },

  sectionTitle: {
    fontSize: 12,
    fontFamily:'Inter_24pt-Medium',
    lineHeight: 16,
    color: '#777986',
    marginTop: 24,
    marginBottom: 10,
    marginLeft: 22,
    fontWeight: '500',
  },

  rowItem: {
    width:342,
    height:48,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
    border:12,
    marginBottom: 12,
    elevation: 1,
  },
  rowLeft: { flexDirection: 'row', alignItems: 'center',width:284,height:20 },
  rowText: { fontFamily:'Inter_24pt-Medium',fontSize: 14, fontWeight: '500', color: '#0C0E11', marginLeft: 16,lineHeight:20},
  rowIcon: { width: 18, height: 18, tintColor: '#111' },

 logoutBtn: {
  width: '90%',
  height: 50,
  alignSelf: 'center',
  backgroundColor: '#FFE4E2',
  borderRadius: 12,
  marginTop: 100,
  alignItems: 'center',
  justifyContent: 'center',
},
logoutText: {
  fontSize: 15,
  fontWeight: '700',
  color: '#FC4C3C',
},

});
