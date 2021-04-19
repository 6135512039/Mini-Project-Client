import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import styles from '../styles/std.module.css'
import axios from 'axios'
import carAuth from '../components/carAuth'
import config from '../config/config'


const URL = `${config.URL}/Cars`
const showCars = ({ token }) => {

    const [Cars, setCars] = useState( {
        list:
            [
                { id: "001", band: 'Tesla', model: '3', hp: 450, price: "3,090,000" },
            ]
    })

    useEffect(() => {
        getCars()
    }, [])

    const getCars = async () => {
        let Car = await axios.get(URL)
        setCars(Car.data)
    }
    const printCars = () => {
        console.log('Cars:', Cars)
        if (Cars.list && Cars.list.length)
            return (Cars.list.map((Car, index) =>
            (<li key={index} className={styles.listItem}>
               Band : {(Car) ? Car.band : '-'} <br></br>
               Model : {(Car) ? Car.model : '-'}  <br></br>
               HP : {(Car) ? Car.hp : '-'}  <br></br>
               Price : {(Car) ? Car.price : '-'}  <br></br> 
            </li>)
            ))
        else {
            return (<h2>No Cars</h2>)
        }
      }
    return (
        <Layout>
            <Head>
                <title>Cars</title>
            </Head>
            <div className={styles.container}>
                <Navbar />
                {JSON.stringify(Cars.Cars)}
                <br></br><br></br><br></br>
                <h1>Cars List</h1>
                <ul className={styles.list}>
                    {printCars()}
                </ul>
                
            </div>
        </Layout>
    )
}

export default carAuth(showCars)

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}
