import { useState, useEffect } from 'react';
import { NativeSelect, FormControl, InputLabel } from '@material-ui/core'
import styles from './CountryPicker.module.css'
import { fetchCountries, fetchStates } from "../../api";
const Country = ({ handleCountryChange, handleStateChange }) => {
    const [countries, setCountries] = useState([])
    const [states, setStates] = useState([])
    const [check, setCheck] = useState(false)
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
        handleCountryChange(e.target.value);
        setCheck(true);
        fetchdata(e.target.value);
    }
    return (
        <div className={styles.picker}>
            <FormControl className={styles.formControl}>
                <InputLabel htmlFor="country">Country</InputLabel>
                <NativeSelect
                    inputProps={{
                        id: 'country'
                    }}
                    defaultValue="" onChange={controller}>
                    <option value=""></option>
                    {countries.map((country, i) => <option key={i} value={country}>{country}</option>)}
                </NativeSelect>
            </FormControl>
            {check ? (<FormControl className={styles.formControl}>
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