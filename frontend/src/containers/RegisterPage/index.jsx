/* eslint-disable react/no-unescaped-entities */
import './index.css'
import trello from '../../assets/trello.webp'
// import NavBar from '../../components/navbar'
import RegisterForm from '../../components/RegisterForm'

const RegisterPage = () => {
    return (
        <>
            <section className="home">
                <div className="content">
                    <RegisterForm />
                </div>
                <img className='trelloImage' src={trello} alt="" />
            </section>
        </>
    )
}

export default RegisterPage