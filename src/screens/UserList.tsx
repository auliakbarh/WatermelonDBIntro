/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {Button, TextInput} from '@/components';
import {UsersService} from '@/services';
import {UsersType} from '@/schemes';
import {useNavigation} from '@react-navigation/native';

interface Props {}

const UserListContainer: React.FC<Props> = ({}) => {
  const navigation = useNavigation();
  const usersService = new UsersService();

  const deleteAll = async () => {
    // await usersService.deleteAllData();
  };

  useEffect(() => {
    navigation.setOptions({
      title: 'User List',
      headerRight: () => (
        <TouchableOpacity style={styles.deleteAllContainer} onPress={deleteAll}>
          <Text>Delete All</Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  const [disabledButton, setDisabledButton] = useState({
    setData: false,
  });
  const handlerDisabledButton = (key: string, value: boolean) => {
    setDisabledButton(prevState => ({...prevState, [key]: value}));
  };
  const [action, setAction] = useState<'insert' | 'update' | 'delete'>(
    'insert',
  );
  const [sortBy, setSortBy] = useState<'asc' | 'desc'>('asc');
  const [firstName, setFirstName] = useState<string>('');

  const [data, setData] = useState<UsersType[]>([]);
  const getUserObject = () => {
    const result = usersService.loadAllData();
    console.log(JSON.stringify(result, null, 2));
    if (!result.error) {
      setData(result.data);
    }
  };

  useEffect(() => {
    getUserObject();
  }, []);

  const setDataUsers = async () => {
    handlerDisabledButton('setData', true);
    await usersService
      .setDataUsers()
      .then(() => handlerDisabledButton('setData', false));
  };

  const [selectedList, setSelectedList] = useState<number | undefined>(
    undefined,
  );

  const renderItem = ({item}: {item: UsersType}) => {
    return (
      <TouchableOpacity
        style={[
          styles.userList,
          selectedList === item.id && styles.selectedUserList,
        ]}
        onPress={() => setSelectedList(item.id)}>
        <Text style={styles.label}>{`${item.first_name} ${
          item.last_name ? item.last_name : ''
        }`}</Text>
      </TouchableOpacity>
    );
  };

  const insert = () => {
    if (firstName.length > 0) {
      // usersService.insert(firstName);
    }
  };

  const deleteItem = () => {
    if (selectedList !== undefined) {
      // usersService.deleteById(selectedList);
    }
  };

  const update = () => {
    if (selectedList !== undefined && firstName.length > 0) {
      // usersService.update(selectedList, firstName);
    }
  };

  const sort = () => {
    switch (sortBy) {
      case 'desc':
      // return usersService.sortByFirstName('DESC');
      case 'asc':
      default:
        // return usersService.sortByFirstName('ASC');
        return null;
    }
  };

  const handleSort = () => {
    const result = sort();
    // @ts-ignore
    setData(result);
  };

  useEffect(() => {
    handleSort();
  }, [sortBy]);

  const run = () => {
    switch (action) {
      case 'insert':
        insert();
        break;
      case 'update':
        update();
        break;
      case 'delete':
        deleteItem();
        break;
      default:
        break;
    }
    setSelectedList(undefined);
    setFirstName('');
  };

  return (
    <SafeAreaView style={[StyleSheet.absoluteFill, styles.screen]}>
      <Button
        label={'Set Data'}
        style={styles.marginB16}
        onPress={setDataUsers}
        disabled={disabledButton.setData}
      />
      <View>
        <Text style={styles.marginB16}>Sort By:</Text>
        <View style={[styles.rowSpaceEven, styles.marginB16]}>
          <Button
            label={'Ascending'}
            disabled={sortBy === 'asc'}
            useDisabledStyle={false}
            style={[
              styles.actionButton,
              sortBy === 'asc' && styles.actionButtonActive,
            ]}
            onPress={() => setSortBy('asc')}
          />
          <View style={styles.separatorHorizontal} />
          <Button
            label={'Descending'}
            disabled={sortBy === 'desc'}
            useDisabledStyle={false}
            style={[
              styles.actionButton,
              sortBy === 'desc' && styles.actionButtonActive,
            ]}
            onPress={() => setSortBy('desc')}
          />
        </View>
        <Text style={styles.marginB16}>Modify:</Text>
        <View style={[styles.rowSpaceEven, styles.marginB16]}>
          <Button
            label={'Insert'}
            style={[
              styles.actionButton,
              action === 'insert' && styles.actionButtonActive,
            ]}
            onPress={() => setAction('insert')}
          />
          <View style={styles.separatorHorizontal} />
          <Button
            label={'Update'}
            style={[
              styles.actionButton,
              action === 'update' && styles.actionButtonActive,
            ]}
            onPress={() => setAction('update')}
          />
          <View style={styles.separatorHorizontal} />
          <Button
            label={'Delete'}
            style={[
              styles.actionButton,
              action === 'delete' && styles.actionButtonActive,
            ]}
            onPress={() => setAction('delete')}
          />
        </View>
        <View style={[styles.row, styles.marginB16]}>
          <TextInput
            style={styles.textInput}
            onChangeText={setFirstName}
            value={firstName}
          />
          <View style={styles.separatorHorizontal} />
          <Button label={'Run'} style={styles.buttonRun} onPress={run} />
        </View>
      </View>
      <Text style={styles.marginB16}>
        Total: {data?.length ? data?.length : 0}
      </Text>
      <FlatList
        data={data}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        initialNumToRender={10}
        windowSize={5}
        maxToRenderPerBatch={5}
        updateCellsBatchingPeriod={30}
        removeClippedSubviews={false}
        onEndReachedThreshold={0.1}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#e7e7e7',
    padding: 16,
  },
  marginB16: {
    marginBottom: 16,
  },
  userList: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
  },
  selectedUserList: {
    backgroundColor: '#f87c4b',
    borderRadius: 8,
    padding: 16,
    borderColor: '#9a2400',
    borderWidth: 1,
  },
  label: {
    color: '#2f2f2f',
    fontWeight: 'bold',
  },
  separator: {
    height: 8,
  },
  deleteAllContainer: {
    marginHorizontal: 16,
  },
  rowSpaceEven: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#8ec1af',
  },
  actionButtonActive: {
    backgroundColor: '#4fad19',
  },
  separatorHorizontal: {
    width: 8,
  },
  textInput: {
    flex: 5,
  },
  buttonRun: {
    flex: 1,
  },
});

export default UserListContainer;
