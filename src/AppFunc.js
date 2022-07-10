import {useState, useEffect} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';

const calcValue = () => {
    return Math.round(Math.random() * (50 - 1) + 1);
}

const Slider = (props) => {
    const [slide, setSlide] = useState(calcValue);
    const [autoPlay, setAutoplay] = useState(false);

    function logging() {
        console.log('log!')
    }

    useEffect(() => {
        console.log('effect');
        document.title = `Slide: ${slide}`;

        window.addEventListener('click', logging);

        return () => {
            window.removeEventListener('click', logging);
        }

    }, [slide]);  // топто оновлюється тільки те що змінилось в slide або залишити скобки пустими - тоді ефект спрацює тільки 1 раз

    useEffect(() => {
        console.log('autoplay');
    }, [autoPlay])
    // це працює, але тут не врахована асинхронність
    // function changeSlide(i) {
    //     setSlide(slide + i);
    // }
    // function toggleAutoplay(i) {
    //     setAutoplay(!autoPlay);
    // }

    //тут все норм, але складно і треба <div className="text-center mt-5">Active slide {state.slide} <br/>{state.autoplay ? 'auto' : null}</div>
    // const [state, setState] = useState({slide:0, autoPlay: false});
    // function changeSlide(i) {
    //     setState(state => ({...state, slide: state.slide + i}));
    // }
    // function toggleAutoplay() {
    //     setState(state => ({...state, autoplay: !state.autoplay}));
    

    function changeSlide(i) {
        setSlide(slide => slide + i);
    }

    function toggleAutoplay(i) {
        setAutoplay(autoPlay => !autoPlay);
    }

    return (
        <Container className='App'>
            <div className="slider w-50 m-auto border mb-5">
            <div className='innerText'> Створений на функціональних компонентах</div>
                <img className="d-block w-100 innerText" src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" alt="slide" />
                <div className="text-center mt-3">Active slide {slide} <br/>{autoPlay ? 'auto' : null}</div>
                <div className="buttons mt-3">
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(-1)}>-1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(1)}>+1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={toggleAutoplay}>toggle autoplay</button>
                </div>
            </div>
        </Container>
    )
}

function AppFunc() {
    const [slider, setSlider] = useState(true);
    
    return (
        <>
            <button onClick={() => setSlider(false)}>hide</button>
            {slider ? <Slider/> : null}
        </>
        
    );
}

export default AppFunc;
