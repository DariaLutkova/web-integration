import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, StatusBar, Pressable, Button } from 'react-native';

export default class App extends React.Component {
  state = { data: null }

  async componentDidMount() {
    const data = await fetch('https://api.nytimes.com/svc/books/v3/lists.json?list=hardcover-fiction&api-key=')
        .then((response) => response.json())

    this.setState({ data: data.results })
  }

  renderItem = ({ item }) => {
      return (
          <Pressable style={styles.item} key={item.book_details[0].title} onPress={() => this.openItem(item)}>
              <Text style={styles.title}>"{item.book_details[0].title}" {item.book_details[0].contributor}</Text>
          </Pressable>
      )
  };

  openItem = (item) => {
      this.setState({
          openedItem: item,
      })
  }

  closeItem = () => {
      this.setState({
          openedItem: null,
      })
  }

  render() {
    return (
        <View style={styles.container}>
          <View style={styles.header}>
              <Text style={styles.text}>New York Times</Text>
          </View>
            {this.renderMain()}
        </View>
    );
  }


  renderMain = () => {
      const { state } = this;

      if (state.openedItem) return (
          <View style={styles.items}>
              <View style={styles.btn}><Button color="#4b2c20" onPress={this.closeItem} title="Back" /></View>
              <Text style={styles.title2}>
                  "{state.openedItem.book_details[0].title}" {state.openedItem.book_details[0].contributor}
              </Text>
              <Text style={styles.title2}>
                  Description: {state.openedItem.book_details[0].description}
              </Text>
              <Text style={styles.title2}>
                  Publish Date: {state.openedItem.published_date}
              </Text>
              <Text style={styles.title2}>
                  Publisher: {state.openedItem.book_details[0].publisher}
              </Text>
          </View>
      )

      return (
          <>
          <Text style={styles.title2}>Bestseller Hardcover Fiction Book List</Text>
          <SafeAreaView style={styles.items}>
              <FlatList
                  data={state.data}
                  renderItem={this.renderItem}
                  keyExtractor={item => item.id}
              />
          </SafeAreaView>
          </>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    marginTop: StatusBar.currentHeight || 0,
  },
  header: {
    backgroundColor: '#725b53',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  items: {
    flex: 10,
  },
  item: {
    backgroundColor: '#a1887f',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
  },
  text: {
    color: 'white',
    fontSize: 24,
  },
  title2: {
      fontSize: 22,
      margin: 15,
  },
  btn: {
      margin: 15,
      width: 150,
  }
});
