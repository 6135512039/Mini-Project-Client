import Head from 'next/head'
import Layout from '../components/layout'
import { useState } from 'react'
import Navbar from '../components/navbar'
import styles from '../styles/login.module.css'
import axios from 'axios'
import config from '../config/config'

export default function Login({ token }) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState('')
    const [rememberme, setRememberme] = useState('')

    const login = async (req, res) => {
        try {
            let result = await axios.post(`${config.URL}/login`,
                { username, password,rememberme },
                { withCredentials: true })
            console.log('result: ', result)
            console.log('result.data:  ', result.data)
            console.log('token:  ', token)
            setStatus(result.status + ': ' + result.data.user.username)
        }
        catch (e) {
            console.log('error: ', JSON.stringify(e.response))
            setStatus(JSON.stringify(e.response).substring(0, 80) + "...")
        }
    }

    const loginForm = () => (
        <div >
            <div className={styles.txt_field}>
                <input type="text"
                    name="username"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <span></span>
                <label>Username</label>
            </div>
            <div className={styles.txt_field}>
                <input type="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)} />
                <span></span>
                <label>Password</label>
            </div>
        </div>
    )

    const copyText = () => {
        navigator.clipboard.writeText(token)
    }

    return (
        <Layout>
            <Head>
                <title>Login</title>
            </Head>
            <Navbar />
              <div className={styles.containers}>          
                <div className={styles.center}>
                    <h1>Login</h1>
                    <form>
                    <div className={styles.pass}>
                    <br />
                        Status:  {status}
                    <br />
                    </div>
                        <div>
                            {loginForm()}
                        </div>
                        <div className={styles.pass}>
                            <input type="checkbox"
                            name="RememberMe"
                            onChange={ (e) => setRememberme(e.target.value)}
                            /> Remember me!
                        </div>
                        <div>
                            <button onClick={login} className={styles.submit}>Login</button>
                            <br /><br />
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}
