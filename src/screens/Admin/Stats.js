import React, { useMemo, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const chartConfig = {
  backgroundColor: '#e26a00',
  backgroundGradientFrom: '#fb8c00',
  backgroundGradientTo: '#ffa726',
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
};

const current = [
  {
    total: 400,
    available: 200,
    overdue: 2,
  },
];

const yearly = [
  {
    expenditure: 2000,
    borrowed: 1000,
    onTime: 300,
    popular: "iPhone 12",
    leastPopular: "iPhone 5",
  },
];

const calculateYearlyChartData = (data) => {
  const { borrowed, onTime } = data[0];
  const overdue = borrowed - onTime;

  const onTimePercentage = (onTime / borrowed) * 100;
  const overduePercentage = (overdue / borrowed) * 100;

  return [
    {
      name: "On Time",
      population: onTimePercentage,
      color: "#AC145A",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Overdue",
      population: overduePercentage,
      color: "#D9D9D9",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];
};

const calculateChartData = (data) => {
  const { total, available, overdue } = data[0];
  const out = total - available;

  const availablePercentage = (available / total) * 100;
  const outPercentage = (out / total) * 100;

  return [
    {
      name: 'Available',
      population: availablePercentage,
      color: '#AC145A',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Out',
      population: outPercentage,
      color: '#D9D9D9',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];
};

export default function AdminSettingsScreen() {
  const chartData = useMemo(() => calculateChartData(current), []);
  const yearlyChartData = useMemo(() => calculateYearlyChartData(yearly), []);
  const [currentTab, setCurrentTab] = useState('Current');

  const handleTabPress = (tab) => {
    setCurrentTab(tab);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            currentTab === 'Current' && styles.activeTabButton,
          ]}
          onPress={() => handleTabPress('Current')}
        >
          <Text
            style={[
              styles.tabButtonText,
              { color: currentTab === 'Current' ? '#000' : '#ccc' },
            ]}
          >
            Current
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            currentTab === 'Yearly' && styles.activeTabButton,
          ]}
          onPress={() => handleTabPress('Yearly')}
        >
          <Text
            style={[
              styles.tabButtonText,
              { color: currentTab === 'Yearly' ? '#000' : '#ccc' },
            ]}
          >
            Yearly
          </Text>
        </TouchableOpacity>
      </View>

      {currentTab === 'Current' && (
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.contentContainer}>
            <View style={styles.container}>
              <PieChart
                data={chartData}
                width={350}
                height={200}
                chartConfig={chartConfig}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="0"
              />
              {current.map((item, index) => (
                <View key={index} style={styles.listItem}>
                  <View style={styles.leftColumn}>
                    <Text style={styles.textBold}>Total Devices:</Text>
                    <Text style={styles.textBold}>Out:</Text>
                    <Text style={styles.textBold}>Available:</Text>
                    <Text style={styles.textBold}>Overdue:</Text>
                  </View>
                  <View style={styles.rightColumn}>
                    <Text style={styles.textBold}>{item.total}</Text>
                    <Text style={styles.textBold}>{item.total - item.available}</Text>
                    <Text style={styles.textBold}>{item.available}</Text>
                    <Text style={styles.textBold}>{item.overdue}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      )}

      {currentTab === 'Yearly' && (
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.contentContainer}>
            <View style={styles.container}>
              <PieChart
                data={yearlyChartData}
                width={350}
                height={200}
                chartConfig={chartConfig}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="0"
              />
              {yearly.map((item, index) => (
                <View key={index} style={styles.listItem}>
                  <View style={styles.leftColumn}>
                    <Text style={styles.textBold}>Expenditure:</Text>
                    <Text style={styles.textBold}>Loans:</Text>
                    <Text style={styles.textBold}>On Time:</Text>
                    <Text style={styles.textBold}>Overdue:</Text>
                    <Text style={styles.textBold}>Most Popular:</Text>
                    <Text style={styles.textBold}>Least Popular:</Text>
                  </View>
                  <View style={styles.rightColumn}>
                    <Text style={styles.textBold}>{item.expenditure}</Text>
                    <Text style={styles.textBold}>{item.borrowed}</Text>
                    <Text style={styles.textBold}>{item.onTime}</Text>
                    <Text style={styles.textBold}>{item.borrowed - item.onTime}</Text>
                    <Text style={styles.textBold}>{item.popular}</Text>
                    <Text style={styles.textBold}>{item.leastPopular}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },
  listItem: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  leftColumn: {
    flex: 1,
  },
  rightColumn: {
    flex: 1,
  },
  textBold: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },

  tabBar: {
    flexDirection: 'row',
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

  scrollView: {
    flexGrow: 1,
  },
});
