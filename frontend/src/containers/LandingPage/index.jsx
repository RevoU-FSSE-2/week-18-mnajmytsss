/* eslint-disable react/no-unescaped-entities */
import './index.css'
import trello from '../../assets/trello.webp'

const LandingPage = () => {
    return (
        <>
            <section className="home">
                <div className="content">
                    <h3>ToDoin' brings all your tasks, and tools together</h3>
                    <p>Keep everything in the same place—even if your team isn’t.</p>
                </div>
                <img className='trelloImage' src={trello} alt="" />
            </section>
        </>
    )
}

export default LandingPage