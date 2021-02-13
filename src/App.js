import styles from './App.module.css';
import React from 'react';
import { Chart, Cards, CountryPicker } from './components';
import { fetchData } from "./api";
import image from './images/covid.png';

class App extends React.Component {
  state = {
    data: {},
    country: '',
    state: ''
  }
  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData })
  }
  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    this.setState({ data: fetchedData, country: country })
  }
  handleStateChange = async (state) => {
    const fetchedData = await fetchData(this.state.country, state);
    this.setState({ data: fetchedData, country: this.state.country, state: state })
  }
  render() {
    const { data, country, state } = this.state;
    return (
      <div className={styles.container}>
        <img className={styles.image} src={image} alt="COVID-19" />
        <Cards {...data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} handleStateChange={this.handleStateChange} country={country} state={state} />
        <Chart data={data} country={country} />
      </div>
    );
  }
}

export default App;
