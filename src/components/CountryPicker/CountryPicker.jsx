import { useState, useEffect } from 'react';
import { NativeSelect, FormControl, InputLabel } from '@material-ui/core'
import styles from './CountryPicker.module.css'
import { fetchCountries, fetchStates } from "../../api";
const Country = ({ handleCountryChange, country, state, handleStateChange }) => {
    const [countries, setCountries] = useState([])
    const [states, setStates] = useState([])
    useEffect(() => {
        const fetchdata = async () => {
            setCountries(await fetchCountries())
        }
        fetchdata();
    }, [countries])
    const fetchdata = async (country) => {
        const data = await fetchStates(country)
        setStates(data)
    }
    const controller = (e) => {
        setStates([])
        handleCountryChange(e.target.value);
        fetchdata(e.target.value);
    }
    return (
        <div className={styles.picker}>
            <FormControl className={styles.formControl}>
                {/* <InputLabel htmlFor="country">Country</InputLabel> */}
                <NativeSelect
                    inputProps={{
                        id: 'country'
                    }}
                    defaultValue="" onChange={controller}>
                    <option value="">Global</option>
                    {countries.map((country, i) => <option key={i} value={country}>{country}</option>)}
                </NativeSelect>
            </FormControl>
            {country.length != 0 ? (<FormControl className={styles.formControl}>
                <InputLabel htmlFor="states">States</InputLabel>
                <NativeSelect
                    inputProps={{
                        id: 'states'
                    }}
                    defaultValue="" onChange={(e) => handleStateChange(e.target.value)}>
                    <option value=""></option>
                    {states.map((state, i) => <option key={i} value={state}>{state}</option>)}
                </NativeSelect>
            </FormControl>) : null}
        </div>
    )
}

export default Country