import {useState, useEffect, useCallback, useMemo} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';

const Slider = (props) => {
    const calcValue = () => {
        // return Math.round(Math.random() * (50 - 1) + 1);
        return 0;
    }
    const [slide, setSlide] = useState(calcValue);
    const [autoPlay, setAutoplay] = useState(false);

    const getSomeImages = useCallback(() => {
        console.log('fetching');
        return [
            'https://st2.depositphotos.com/4018373/5853/i/600/depositphotos_58535491-stock-photo-ukraine-coat-of-arms-the.jpg',
            'https://www.volynnews.com/files/news/2015/08-23/163420/11880571_1661649837404715_2343688799508479473_n.jpg',
            'https://ua.news/wp-content/uploads/2021/07/Ukr.-flag-s-tryzubom-2.jpg',
        ]
    }, [slide]);

    function logging() {
        console.log('log!');
    }


    // useEffect - замінює зразу 3 хука, а саме: componentDidMount, componentDidUpdate, componentWillUnmount
    useEffect(() => {
        console.log('effect');
        document.title = `Slide: ${slide}`;

        window.addEventListener('click', logging);

        return () => {
            window.removeEventListener('click', logging);
        }  // аналог componentWillUnmount

    }, [slide]);  // топто відслідковується ТІЛЬКИ slide або якщо залишити скобки пустими - тоді ефект спрацює тільки 1 раз при рендері

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

    const countTotal = (num) => {
        console.log('counting...');
        return num + 10;
    }
    const total = useMemo(() => {
        return countTotal(slide);
    }, [slide]);

    const style = useMemo(() => ({
        color: slide > 4 ? 'red' : 'black'
    }), [slide])

    useEffect(() => {
        console.log('styled!');
    }, [style]);

    return (
        <Container className='App'>
            <div className="slider w-50 m-auto border mb-5">
            <div className='innerText'> Створений на функціональних компонентах</div>
                {/* <img className="d-block w-100 innerText" src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" alt="slide" /> */}
                {/* {
                    getSomeImages().map((url, i) => {
                        return (
                            <img key={i} className="d-block w-100 innerText" src={url} alt="slide" />
                        )
                    })
                } */}
                <Slide getSomeImages={getSomeImages}/>
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
                <div style={style} className="text-center mt-3">Total slides: {total}</div>
            </div>
        </Container>
    )
}

const Slide = ({getSomeImages}) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        setImages(getSomeImages())
    }, [getSomeImages])

    return (
        <>
            {images.map((url,i) => <img key={i} className="d-block w-100 innerText" src={url} alt="slide"/>)}
        </>
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
