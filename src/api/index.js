import axios from 'axios';
const url = 'https://covid19.mathdro.id/api';
export const fetchData = async (country, state) => {
    let changeableUrl = url
    if (country) {
        changeableUrl = `${url}/countries/${country}`
    }
    if (state) {
        let confirmedUrl = `${url}/countries/${country}/confirmed`;
        try {
            const { data } = await axios.get(confirmedUrl)
            const { confirmed, recovered, deaths, lastUpdate } = data.filter(dt => dt.provinceState === state ? dt : null)[0]
            return { confirmed, recovered, deaths, lastUpdate }
        } catch (error) {
            console.log(error)
        }

    }
    try {
        const { data: { confirmed, countryDetail, deaths, recovered, lastUpdate } } = await axios.get(changeableUrl)
        return { confirmed, countryDetail, deaths, recovered, lastUpdate }
    } catch (error) {
        console.log(error)
    }
}

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`)
        const modifiedData = data.map((dailyData) => (
            {
                confirmed: dailyData.confirmed.total,
                deaths: dailyData.deaths.total,
                date: dailyData.reportDate,
            }
        ));
        return modifiedData
    } catch (err) {
        console.log(err)
    }
}

export const fetchCountries = async () => {
    try {
        const { data: { countries } } = await axios.get(`${url}/countries`)
        return countries.map((country) => country.name)
    } catch (error) {
        console.log(error)
    }
}

export const fetchStates = async (country) => {
    try {
        console.log(country)
        const { data } = await axios.get(`${url}/countries/${country}/confirmed`)
        const states = data.map((da => da.provinceState))
        return states
    } catch (error) {
        console.log(error)
    }
}