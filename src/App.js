import React, { Component } from 'react'
import './App.css';

import axios from 'axios';

/*  Components */
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

/** Particles */
import Particles from 'react-particles-js';

/* The first element: Particles, is for the background. */
const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}




const initialState = {
  // what the user will input
  input: "",
  // should be displayed when we click on submit
  imageURL: "",
  // Will contain the values that we receive once we get response.
  box: {},
  // When app first starts, it will ask the user to sign in.
  route: 'signin',
  // Determine if user is signed in
  isSignedIn: false,
  user: {
    id: -1,
    name: "",
    email: "",
    entries: 0,
    joined: ""
  },
};
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      // what the user will input
      input: "",
      // should be displayed when we click on submit
      imageURL: "",
      // Will contain the values that we receive once we get response.
      box: {},
      // When app first starts, it will ask the user to sign in.
      route: 'signin',
      // Determine if user is signed in
      isSignedIn: false,
      user: {
        id: -1,
        name: "",
        email: "",
        entries: 0,
        joined: ""
      },
    };
  }

  componentDidMount() {
    
  }

  // Load user to state
  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }});
  }

  // Call this function based on the result that we get from Clarifai.
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      // This left column is the % of the width! So if we multiply the width that we computed for our input image, the face should be the % of it.
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      // The right column is on the right side... we want to get the number which is the total percentage of the image minus the width.
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  /** Fill the box state with face location values */
  displayFaceBox = (box) => {;
    this.setState({box: box});
  }

  /** Changes the state of the input */
  onInputChange = (event) => {
    this.setState( {input: event.target.value} )
  }

  onPictureSubmit = () => {
    this.setState( {imageURL: this.state.input} )

    /** Make a call to this API */
    // NOTE: We cannot use imageURL here because of the way set STATE works. The imageUrl parameter would have never worked in our example, 
    // because when we called Clarifai with our the predict function, React wasn't finished updating the state. 
    //* https://reactjs.org/docs/react-component.html#setstate */
    
    fetch('https://nameless-dusk-62223.herokuapp.com/imageurl', {
                method: "post",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({input:this.state.input})
              })
              .then(response => response.json())
              .then( response => {
                if (response) {
                  axios({
                    method: 'PUT',
                    url: 'https://nameless-dusk-62223.herokuapp.com/image',
                    data: {
                        id: this.state.user.id,
                    }
                  })
                  .then(response => {
                    this.setState({
                      user: {
                        ...this.state.user,
                        entries: response.data
                      }
                    })
                  })
                  .catch(error => console.log(error));
                }
                this.displayFaceBox(this.calculateFaceLocation(response));
                
              })
              .catch(error => console.log(error))
      
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const { isSignedIn, box, imageURL, route, user } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
        { route === 'home' ? 
          <>
            <Logo />
            <Rank name={user.name} entries={user.entries}/>
            <ImageLinkForm onInputChange={this.onInputChange} onPictureSubmit={this.onPictureSubmit}/>
            <FaceRecognition box={box} imageURL={imageURL} /> 
          </> 
          : ( route === 'signin' ?
              <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
              :
              <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
            )}
      </div>
    )
  }
}

/* 
Rank will give us our username and our rank compared to all other users that have submitted pictures!

If route === home -> display homepage
else 
    if route === signin -> display signin
    else route === register -> display register form

*/
