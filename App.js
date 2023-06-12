import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View , RefreshControl, ScrollView, SafeAreaView, SectionList} from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

const App = () => {

  const [Items, setItems] = useState([
    { name: 'Item 1' },
    { name: 'Item 2' },
    { name: 'Item 3' },
    { name: 'Item 4' },
    { name: 'Item 5' },
    { name: 'Item 6' },
    { name: 'Item 7' },
    { name: 'Item 8' },
    { name: 'Item 9' },
    { name: 'Item 27' },
    { name: 'Item 78' },
  ]);
  const DATA = [
    {
      title: 'Title 1',
      data: ['Item 1-1', 'Item 1-2', 'Item 1-3'],
    },
    {
      title: 'Title 2',
      data: ['Item 2-1', 'Item 2-2', 'Item 2-3'],
    },
    {
      title: 'Title 3',
      data: ['Item 3-1'],
    },
    {
      title: 'Title 4',
      data: ['Item 4-1', 'Item 4-2'],
    },
  ]
  const [Refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setItems([...Items, { name: 'Item 69' }]);
    setRefreshing(false);
  }

  return (
    <SafeAreaView style={[styles.container]}>
      <SectionList style={styles.body}
        keyExtractor={(item, index) => index.toString()}
        sections={DATA}
        renderItem={({ item }) => (
          <Text style={styles.text}>{item}</Text>
        )}
        renderSectionHeader={({section})=>(
          <View style={styles.item}>
            <Text style={styles.h1}>{section.title}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'red'
  },
  body: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    paddingTop: 15,
    paddingBottom: 20,
  },
  item: {
    margin: 10,
    backgroundColor: '#d151f1',
  },
  text: {
    color: '#181818',
    fontSize: 18,
    margin: 10,
  },
  h1: {
    color: '#181818',
    fontSize: 25,
    margin: 10,
    fontWeight: 'bold',
  },
  button: {
    width: 200,
    height: 60,
  }
});

export default App;