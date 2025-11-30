import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';

const TABS = [
  { label: 'Home', icon: require('../assets/Home.png'), screen: 'Home' },
  { label: 'Schedule', icon: require('../assets/dates.png'), screen: 'Home' },
  { label: 'Employee', icon: require('../assets/multi-user.png'), screen: 'Home' },
  { label: 'Activity', icon: require('../assets/clock.png'), screen: 'Activity' },
  { label: 'Profile', icon: require('../assets/user.png'), screen: 'Profile' },
];

export default function BottomNav({ navigation, activeTab }) {
  return (
    <View style={styles.tabBar}>
      {TABS.map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={styles.tabItem}
          onPress={() => navigation.navigate(tab.screen)}
        >
          <Image
            source={tab.icon}
            style={[
              styles.tabIcon,
              activeTab === tab.label && styles.tabIconActive,
            ]}
          />
          <Text
            style={[
              styles.tabLabel,
              activeTab === tab.label && styles.tabLabelActive,
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 68, 
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 10,
    shadowColor: '#18274B',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 12,
  },

  tabItem: {

    justifyContent: 'center',
    alignItems: 'center',
  },

  tabIcon: {
    width: 26, 
    height: 26, 
    marginBottom: 2,
  },

  tabIconActive: {
    tintColor: '#FF6E4E', 
  },

  tabLabel: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
    color: '#4B4B4B', 
    marginTop: 1,
  },

  tabLabelActive: {
    color: '#FF6E4E',
    fontWeight: '700',
  },
});


