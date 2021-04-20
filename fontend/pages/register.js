
import { useState } from 'react'
import Head from 'next/head'
import Layout from '../components/layout'
import styles from '../styles/register.module.css'
import Navbar from '../components/navbar'
import axios from 'axios'
import config from '../config/config'

export default function Register({ token }) {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState('')

    const profileUser = async () => {
        console.log('token: ', token)
        const users = await axios.get(`${config.URL}/profile`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        console.log('user: ', users.data)
    }

    const register = async (req, res) => {
        try {
            let result = await axios.post(`${config.URL}/register`,
                { username, email, password })
            console.log('result: ', result)
            console.log('result.data:  ', result.data)
            console.log('token:  ', token)
            setStatus(result.data.message)
        }
        catch (e) {
            console.log(e)
        }

    }

    const registerForm = () => (
        <div>
            <div className={styles.txt_field}>
                <input type="text"
                    name="username"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <span></span>
                <label>Username</label>                
            </div>
            <div className={styles.txt_field}>
                <input type="email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)} 
                    />
                    <span></span>
                    <label>Email</label>
            </div>
            <div className={styles.txt_field}>
                <input type="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)} 
                    />
                    <span></span>
                    <label>Email</label>
            </div>

        </div>
    )


    return (
        <Layout>
            <Head>
                <title>Register to Admin Web</title>
            </Head> 
            <Navbar />
            <div className={styles.containers}>
                <div className={styles.center}>
                    <h1>Register to Admin Web!</h1>
                    <form>
                    <div className={styles.pass}>
                    <br />
                        Status:  {status}
                    <br />
                    </div>
                        <div>
                            {registerForm()}
                        </div>
                        <div>
                        <br />
                            <button onClick={register} className={styles.submit}>Register</button>
                        <br />
                        </div>
                        <br /><br />
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}
