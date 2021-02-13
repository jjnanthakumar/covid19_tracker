import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import CountUp from 'react-countup';
import styles from './Cards.module.css';
import cx from 'classnames';
const Cards = ({ confirmed, recovered, deaths, lastUpdate }) => {
    if (!confirmed) return 'Loading...'
    const obj = [
        {
            title: "Infected",
            value: confirmed.value || confirmed,
            upd_date: new Date(lastUpdate).toLocaleString(),
            message: "Number of active cases from COVID-19.",
            style: 'infected'
        },
        {
            title: "Recovered",
            value: recovered.value || recovered,
            upd_date: new Date(lastUpdate).toLocaleString(),
            message: "Number of recoveries from COVID-19.",
            style: 'recovered'
        },
        {
            title: "Deaths",
            value: deaths.value || deaths,
            upd_date: new Date(lastUpdate).toLocaleString(),
            message: "Number of deaths caused by COVID-19.",
            style: 'deaths'
        }
    ]
    return (
        <div className={styles.container}>
            <Grid container spacing={3} justify="center">
                {obj.map((ob) => (
                    <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles[ob.style])}>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>{ob.tite}</Typography>
                            <Typography variant="h5" component="h2">
                                <CountUp start={0} end={ob.value} duration={2.75} separator="," />
                            </Typography>
                            <Typography color="textSecondary" variant="body2" component="small">{ob.upd_date}</Typography>
                            <Typography variant="body2" component="p">{ob.message}</Typography>
                        </CardContent>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default Cards