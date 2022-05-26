/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {debounce} from 'lodash';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {Button, DataTable} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {data} from './data/data';
import {Header as HeaderRNE, HeaderProps, Icon} from '@rneui/themed';

Icon.loadFont();

interface IDataList {
  id: number;
  job_title: string;
  create_at: string;
  assignee: string;
  status: string;
}

const App = () => {
  const [listData, setListData] = useState<IDataList[]>([]);
  const [isSortASC, setIsSortASC] = useState<boolean>(true);
  const [textSearch, setTextSearch] = useState<string>('');

  useEffect(() => {
    if (data) return setListData(data);
  }, []);

  const handleSortByCreateDate = () => {
    let newData: IDataList[] = [];
    if (isSortASC) {
      newData = data.sort((a, b) => {
        return moment(a.create_at).diff(b.create_at);
      });
    } else {
      newData = data.sort((a, b) => {
        return moment(b.create_at).diff(a.create_at);
      });
    }
    setIsSortASC(!isSortASC);
    setListData(newData);
  };

  const handleSearchDate = debounce((text: string) => {
    if (!text || text.length === 0) return setListData(data);
    let newData: IDataList[] = [];
    newData = data.filter(value =>
      value.job_title.toString().toLowerCase().includes(text.toLowerCase()),
    );

    setListData(newData);
  }, 300);

  return (
    <>
      <View style={styles.headerPage}>
        <Text style={styles.textTitle}>Job Manager</Text>
        <Text style={styles.textTitle}>
          <View>
            <Icon
              style={styles.infoUser}
              name="bell-o"
              size={20}
              color="#000"
            />
          </View>
        </Text>
      </View>
      <View style={styles.sectionContainer}>
        <View style={styles.viewFilterData}>
          <View style={styles.searchSection}>
            <Icon
              style={styles.searchIcon}
              name="search"
              size={20}
              color="#000"
            />
            <TextInput
              style={styles.input}
              placeholder="Search Job"
              onChangeText={handleSearchDate}
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.buttonCreate}>
            <Button mode="outlined" onPress={() => console.log('Pressed')}>
              Create
            </Button>
          </View>
        </View>
        <DataTable style={styles.tableJob}>
          <DataTable.Header>
            <DataTable.Title>Job Title</DataTable.Title>
            <DataTable.Title onPress={handleSortByCreateDate} numeric>
              Create At
              <Icon name="sort" size={15} />
            </DataTable.Title>
            <DataTable.Title numeric>Assignee</DataTable.Title>
            <DataTable.Title numeric>Status</DataTable.Title>
          </DataTable.Header>
          <ScrollView style={styles.scrollView}>
            {listData.map(value => (
              <DataTable.Row key={value.id}>
                <DataTable.Cell>{value.job_title}</DataTable.Cell>
                <DataTable.Cell numeric>
                  {moment(value.create_at).format('DD/MM/YYYY')}
                </DataTable.Cell>
                <DataTable.Cell numeric>{value.assignee}</DataTable.Cell>
                <DataTable.Cell numeric>{value.status}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </ScrollView>
        </DataTable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerPage: {
    height: 52,
    marginTop: 20,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textTitle: {
    fontWeight: '700',
    fontSize: 20,
    letterSpacing: 1,
  },
  infoUser: {
    position: 'relative',
    right: -250,
  },
  sectionContainer: {
    flex: 1,
    backgroundColor: '#F3F6F9',
    paddingTop: 20,
    paddingHorizontal: 30,
  },
  scrollView: {
    marginHorizontal: 20,
    marginTop: -1,
  },
  viewFilterData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchSection: {
    width: '40%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 8,
  },
  buttonCreate: {},
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
  },
  tableJob: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    height: 900,
  },
});

export default App;
