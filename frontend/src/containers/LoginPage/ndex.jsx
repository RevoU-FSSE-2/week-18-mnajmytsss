/* eslint-disable react/no-unescaped-entities */
import './index.css'
import trello from '../../assets/trello.webp'
// import NavBar from '../../components/navbar'
import LoginForm from '../../components/LoginForm'

const LoginPage = () => {
    return (
        <>
            <section className="home">
                <div className="content">
                    <LoginForm />
                </div>
                <img className='trelloImage' src={trello} alt="" />
            </section>
        </>
    )
}

export default LoginPage