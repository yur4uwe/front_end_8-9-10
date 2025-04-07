import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/high/Header';
import Footer from './components/high/Footer';
import Home from './components/pages/Home';
import Booking from "./components/pages/Booking"; // Adjust the import path as necessary
import {SourceProvider} from './context/SourceContext'; // Import the context provider
import './App.css'; // Import global styles

const App = () => {
    return (
        <SourceProvider> 
        <Router>
            <Header />
            <main style={{ padding: '20px' }}>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/booking/:movieId" component={Booking} />
                </Switch>
            </main>
            <Footer />
        </Router>
        </SourceProvider>
    );
};


export default App;
