/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');

var MOCKED_MOVIES_DATA = [
  {title: 'Title', year: '2015', posters: {thumbnail: 'http://gb.cri.cn/mmsource/images/2012/12/28/92/1495856044531409092.jpg'}}
];

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
} = React;

var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

var MyApp = React.createClass({
  componentDidMount: function() {
    this.fetchData();
  },

  getInitialState: function() {
    return {
      movies: null,
    };
  },
  fetchData: function() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          movies: responseData.movies,
        });
      })
      .done();
  },

  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  },

  renderMovie: function(movie) {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: movie.posters.thumbnail}}
          style={styles.thumbnail} />

        <View style={styles.rightContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.year}>{movie.year}</Text>
        </View>
      </View>
    );
  },

  render: function() {

    if (!this.state.movies) {
      return this.renderLoadingView();
    }

    var movie = this.state.movies[0];
    return this.renderMovie(movie);
  }

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  rightContainer: {
    flex: 1
  },
  thumbnail: {
    width: 53,
    height: 81,
  }
});

AppRegistry.registerComponent('MyApp', () => MyApp);
