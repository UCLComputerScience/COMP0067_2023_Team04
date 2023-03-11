import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const CollapsibleList = () => {
  const [expandedDays, setExpandedDays] = useState([]);

  const handleExpand = day => {
    if (expandedDays.includes(day)) {
      setExpandedDays(expandedDays.filter(d => d !== day));
    } else {
      setExpandedDays([...expandedDays, day]);
    }
  };

  const loanTable = [
    {
      name: 'Lenovo Legion Y9000P 2022 RTX 3070ti',
      user: 'ucabj38',
      state: 'Loan',
      startDate: '2023-03-06'
    },
    {
      name: 'Lenovo Legion Y9000P 2022 RTX 3070ti',
      user: 'ucabj38',
      state: 'Loan',
      startDate: '2023-03-07'
    },
    {
      name: 'Lenovo Legion Y9000P 2022 RTX 3070ti',
      user: 'ucabj38',
      state: 'Loan',
      startDate: '2023-03-08'
    },
    {
      name: 'Lenovo Legion Y9000P 2022 RTX 3070ti',
      user: 'ucabj38',
      state: 'Loan',
      startDate: '2023-03-09'
    },
    {
      name: 'Lenovo Legion Y9000P 2022 RTX 3070ti',
      user: 'ucabj38',
      state: 'Loan',
      startDate: '2023-03-10'
    },
    {
      name: 'Lenovo Legion Y9000P 2022 RTX 3070ti',
      user: 'ucabj38',
      state: 'Loan',
      startDate: '2023-03-11'
    },
  ];

  const groupedLoans = loanTable.reduce((acc, loan) => {
    const date = new Date(loan.startDate);
    const day = DAYS[date.getUTCDay() - 1];

    if (!acc[day]) {
      acc[day] = [];
    }

    acc[day].push(loan);

    return acc;
  }, {});

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {DAYS.map(day => (
          <View key={day}>
            <TouchableOpacity
              style={[
                styles.tabButton,
                expandedDays.includes(day) && styles.activeTabButton
              ]}
              onPress={() => handleExpand(day)}
            >
              <Text style={styles.tabButtonText}>{day}</Text>
            </TouchableOpacity>
            {expandedDays.includes(day) && groupedLoans[day] && (
              <FlatList
                style={styles.dataContainer}
                data={groupedLoans[day]}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.dataRow}
                    onPress={() => handleRowPress(index)}
                  >
                    <Text style={[styles.deviceText, { flex: 2 }]}>{item.name}</Text>
                    <Text style={[styles.userText, { flex: 1, textAlign: 'center' }]}>{item.user}</Text>
                    <Text style={[styles.stateText, { flex: 0.7, textAlign: 'center' }]}>{item.state}</Text>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        ))}
      </View>
    </View>
  );
  };
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  tabBar: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 5,
    marginTop: -5,
  },
  tabButton: {
    paddingHorizontal: 60,
    paddingVertical: 5,
  },
  activeTabButton: {},
  tabButtonText: {
    fontSize: 17,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginLeft: -25,
    marginRight: -25,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 30,
  },
  headerText: {
    fontSize: 14,
    color: '#ccc',
  },
  dataContainer: {},
  dataRow: {
    paddingHorizontal: 25,
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'left',
  },
  deviceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
  },
  userText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
    textAlign: 'right',
  },
  stateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
    textAlign: 'right',
  },
});

export default CollapsibleList;
