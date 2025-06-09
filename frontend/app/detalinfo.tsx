import React, { FC, useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LineChart, ChartConfig } from 'react-native-chart-kit';
import { BASE_URL } from "../constants/api";


const screenWidth = Dimensions.get('window').width;

const chartConfig: ChartConfig = {
  backgroundColor: '#1E1E1E',
  backgroundGradientFrom: '#2A2A72',
  backgroundGradientTo: '#009FFD',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: () => '#fff',
  style: { borderRadius: 16 },
  propsForDots: {
    r: '5',
    strokeWidth: '2',
    stroke: '#ffd700',
  },
};

type ReportKey = 'day' | 'week' | 'month';

interface DataPoint {
  timestamp: string; // ISO date string
  value: number;
}

const aggregateData = (data: DataPoint[], period: ReportKey): { labels: string[]; values: number[] } => {
  if (data.length === 0) return { labels: [], values: [] };

  // Конвертуємо строки дат у Date
  const parsedData = data
    .map(d => ({ ...d, date: new Date(d.timestamp) }))
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  if (period === 'day') {
    // Останні 10 значень без агрегації
    const slice = parsedData.slice(-10);
    const labels = slice.map((_, i) => (i + 1).toString());
    const values = slice.map(d => d.value);
    return { labels, values };
  }

  if (period === 'week') {
    // 7 днів - середнє за кожен день
    // Групуємо по даті (рік, місяць, день)
    const groups: Record<string, number[]> = {};
    parsedData.forEach(({ date, value }) => {
      const dayKey = date.toISOString().slice(0, 10); // YYYY-MM-DD
      if (!groups[dayKey]) groups[dayKey] = [];
      groups[dayKey].push(value);
    });
    // Візьмемо останні 7 днів
    const days = Object.keys(groups).sort().slice(-7);
    const labels = days.map(day => day.slice(5)); // MM-DD
    const values = days.map(day => {
      const vals = groups[day];
      return vals.reduce((a, b) => a + b, 0) / vals.length;
    });
    return { labels, values };
  }

  if (period === 'month') {
  // 6 періодів по 5 днів (30 днів в місяці)
  const groups: Record<string, number[]> = {};
  parsedData.forEach(({ date, value }) => {
    const dayOfMonth = date.getDate();
    const periodIndex = Math.floor((dayOfMonth - 1) / 5); // 0..5 (6 періодів)
    const key = `${date.getFullYear()}-${date.getMonth()}-${periodIndex}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(value);
  });
  // Візьмемо останні 6 періодів
  const periods = Object.keys(groups).sort().slice(-6);
  const labels = periods.map(key => {
    const parts = key.split('-');
    const year = Number(parts[0]);
    const month = Number(parts[1]);
    const periodIdx = Number(parts[2]);
    const startDay = periodIdx * 5 + 1;
    const endDay = startDay + 4;
    return `${(month + 1).toString().padStart(2, '0')}/${startDay}-${endDay}`;
  });
  const values = periods.map(key => {
    const vals = groups[key];
    return vals.reduce((a, b) => a + b, 0) / vals.length;
  });
  return { labels, values };
}


  return { labels: [], values: [] };
};

const ReportChart: FC<{
  endpoint: string;
  title: string;
  period: ReportKey;
}> = ({ endpoint, title, period }) => {
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
  setLoading(true);
  try {
    const res = await fetch(`${BASE_URL}/${endpoint}/all`);
    const json = await res.json();

    if (Array.isArray(json)) {
      const transformed = json.map(item => {
        let value = 0;
        if (endpoint === 'heart-rate') value = item.pulse;
        else if (endpoint === 'blood-oxygen') value = item.oxygen_level;
        return {
          timestamp: item.recorded_at,
          value: value ?? 0,
        };
      });
      setDataPoints(transformed);
    } else {
      setDataPoints([]);
      console.warn('API did not return an array:', json);
    }
  } catch (err) {
    console.error('Fetch error:', err);
    setDataPoints([]);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // Оновлення кожні 5 сек
    return () => clearInterval(interval);
  }, [endpoint]);

  const { labels, values } = aggregateData(dataPoints, period);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      {loading && <Text style={{ color: 'white' }}>Loading...</Text>}
      {values.length > 0 ? (
        <LineChart
          data={{ labels, datasets: [{ data: values }] }}
          width={screenWidth * 0.9}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      ) : (
        !loading && <Text style={{ color: 'white' }}>No data</Text>
      )}
    </View>
  );
};

const HealthStatsScreen: FC<{ navigation: any }> = ({ navigation }) => {
  const [period, setPeriod] = useState<ReportKey>('day');

  return (
    <ScrollView style={styles.container}>
      {/* Back button */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      <Text style={styles.header}>Health Stats</Text>

      <View style={styles.buttonRow}>
        {(['day', 'week', 'month'] as ReportKey[]).map(key => (
          <TouchableOpacity
            key={key}
            style={[styles.periodButton, period === key && styles.periodButtonActive]}
            onPress={() => setPeriod(key)}
          >
            <Text style={[styles.periodText, period === key && styles.periodTextActive]}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ReportChart endpoint="heart-rate" title="Pulse" period={period} />
      <ReportChart endpoint="blood-oxygen" title="Saturation" period={period} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0e1013', paddingTop: 30 },
  headerContainer: { position: 'absolute', top: 30, left: 20, zIndex: 10 },
  header: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  periodButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 12,
  },
  periodButtonActive: {
    backgroundColor: '#FFA500',
  },
  periodText: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 16,
  },
  periodTextActive: {
    color: '#fff',
  },
  card: {
    marginHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#1a1d24',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
  },
  title: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  chart: { borderRadius: 16 },
});

export default HealthStatsScreen;
