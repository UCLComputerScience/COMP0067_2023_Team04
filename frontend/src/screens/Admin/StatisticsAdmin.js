import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { PieChart } from "react-native-chart-kit";

const chartConfig = {
  backgroundColor: "#e26a00",
  backgroundGradientFrom: "#fb8c00",
  backgroundGradientTo: "#ffa726",
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
};

const API_BASE_URL = "https://0067team4app.azurewebsites.net/posts";

const calculateYearlyChartData = (data) => {
  const { totalLoans, onTime } = data;
  const overdue = totalLoans - onTime;

  const onTimePercentage = (onTime / totalLoans) * 100;
  const overduePercentage = (overdue / totalLoans) * 100;

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
  const { total, Available, overdue } = data;
  const out = total - Available;

  const availablePercentage = (Available / total) * 100;
  const outPercentage = (out / total) * 100;

  return [
    {
      name: "Available",
      population: availablePercentage,
      color: "#AC145A",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Out",
      population: outPercentage,
      color: "#D9D9D9",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];
};

async function getJwtToken() {
  try {
    
    const jwtToken = await SecureStore.getItemAsync("jwtToken");
    if (jwtToken) {
      console.log("JWT token 获取成功:", jwtToken);
      return jwtToken;
    } else {
      console.log("未找到 JWT token");
      return null;
    }
  } catch (error) {
    console.log("JWT token 获取失败:", error);
    return null;
  }
}

export default function AdminSettingsScreen() {
  const [currentData, setCurrentData] = useState(null);
  const [yearlyData, setYearlyData] = useState(null);
  const [currentTab, setCurrentTab] = useState("Current");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwtToken = await getJwtToken();
        const currentResponse = await axios.get(
          `${API_BASE_URL}/stats/current`, {
            headers: { Authorization: `Bearer ${jwtToken}` },
          }
        );
        setCurrentData(currentResponse.data);

        const yearlyResponse = await axios.get(
          `${API_BASE_URL}/stats/yearly`, {
            headers: { Authorization: `Bearer ${jwtToken}` },
          }
        );
        setYearlyData(yearlyResponse.data);
      } catch (error) {
        console.error("获取数据时出错:", error);
      }
    };

    fetchData();
  }, []);

  const chartData = useMemo(() => {
    if (currentData) {
      return calculateChartData(currentData);
    } else {
      return [];
    }
  }, [currentData]);

  const yearlyChartData = useMemo(() => {
  if (yearlyData) {
  return calculateYearlyChartData(yearlyData);
  } else {
  return [];
  }
  }, [yearlyData]);
  
  const handleTabPress = (tab) => {
  setCurrentTab(tab);
  };
  
  return (
  <View style={styles.container}>
    <View style={styles.tabBar}>
      <TouchableOpacity
        style={[
          styles.tabButton,
          currentTab === "Current" && styles.activeTabButton,
        ]}
          onPress={() => handleTabPress("Current")}
        >
        <Text
          style={[
          styles.tabButtonText,
          { color: currentTab === "Current" ? "#000" : "#ccc" },
          ]}
        >
        Current
        </Text>
      </TouchableOpacity>
  <TouchableOpacity
      style={[
        styles.tabButton,
        currentTab === "Yearly" && styles.activeTabButton,
      ]}
      onPress={() => handleTabPress("Yearly")}
    >
      <Text
        style={[
          styles.tabButtonText,
          { color: currentTab === "Yearly" ? "#000" : "#ccc" },
        ]}
      >
        Yearly
      </Text>
    </TouchableOpacity>
  </View>

  {currentTab === "Current" && currentData && (
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
          <View key="current" style={styles.listItem}>
            <View style={styles.leftColumn}>
              <Text style={styles.textBold}>Total Devices:</Text>
              <Text style={styles.textBold}>Out:</Text>
              <Text style={styles.textBold}>Available:</Text>
              <Text style={styles.textBold}>Overdue:</Text>
            </View>
            <View style={styles.rightColumn}>
              <Text style={styles.textBold}>{currentData.total}</Text>
              <Text style={styles.textBold}>
                {currentData.total - currentData.Available}
              </Text>
              <Text style={styles.textBold}>{currentData.Available}</Text>
              <Text style={styles.textBold}>{currentData.overdue}</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  )}

  {currentTab === "Yearly" && yearlyData && (
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
          <View key="yearly" style={styles.listItem}>
            <View style={styles.leftColumn}>
              <Text style={styles.textBold}>Expenditure:</Text>
              <Text style={styles.textBold}>Loans:</Text>
              <Text style={styles.textBold}>On Time:</Text>
              <Text style={styles.textBold}>Overdue:</Text>
              <Text style={styles.textBold}>Most Popular:</Text>
            </View>
            <View style={styles.rightColumn}>
              <Text style={styles.textBold}>{yearlyData.expenditure}</Text>
              <Text style={styles.textBold}>{yearlyData.totalLoans}</Text>
              <Text style={styles.textBold}>{yearlyData.onTime}</Text>
              <Text style={styles.textBold}>{yearlyData.late}</Text>
              <Text style={styles.textBold}>{yearlyData.mostPopular}</Text>
            </View>
          </View>
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
justifyContent: "flex-start",
alignItems: "center",
paddingTop: 20,
},
listItem: {
flexDirection: "row",
backgroundColor: "#f0f0f0",
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
fontWeight: "bold",
},
container: {
flex: 1,
backgroundColor: "#fff",
padding: 20,
},

tabBar: {
flexDirection: "row",
justifyContent: "space-between",
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

