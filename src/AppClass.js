import {Component} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';

class Slider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            autoplay: false,
            slide: 0
        }
    }

// цих два хука було замінено на useEffect в функцінальному компоненті
    componentDidMount () {
        document.title = `Slide: ${this.state.slide}`;
    }
    componentDidUpdate () {
        document.title = `Slide: ${this.state.slide}`;
    }


    changeSlide = (i) => {
        this.setState(({slide}) => ({
            slide: slide + i
        }))
    }

    toggleAutoplay = () => {
        this.setState(({autoplay}) => ({
            autoplay: !autoplay
        }))
    }

    render() {
        return (
            <Container className='App'>
                <div className="slider w-50 m-auto border mb-5">
                    <div className='innerText'> Створений на класових компонентах</div>
                    <img className="d-block w-100 innerText" src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" alt="slide" />
                    <div className="text-center mt-3">Active slide {this.state.slide} <br/> {this.state.autoplay ? 'auto' : null}</div>
                    <div className="buttons mt-2">
                        <button 
                            className="btn btn-primary me-2"
                            onClick={() => this.changeSlide(-1)}>-1</button>
                        <button 
                            className="btn btn-primary me-2"
                            onClick={() => this.changeSlide(1)}>+1</button>
                        <button 
                            className="btn btn-primary me-2"
                            onClick={this.toggleAutoplay}>toggle autoplay</button>
                    </div>
                </div>
            </Container>
        )
    }
}

function AppClass() {
return (
    <Slider/>
);
}

export default AppClass;
