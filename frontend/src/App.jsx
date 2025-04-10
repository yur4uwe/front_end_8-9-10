import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/high/Header';
import Footer from './components/high/Footer';
import Home from './components/pages/Home';
import Booking from "./components/pages/Booking"; // Adjust the import path as necessary
import MovieDetails from './components/pages/MovieDetails';
import { SourceProvider } from './context/SourceContext'; // Import the context provider
import './App.css'; // Import global styles

const App = () => {
    return (
        <SourceProvider>
            <Router>
                <Header />
                <main className='main-content'>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="moovie/:id/book/" component={Booking} />
                        <Route path="/movie/:id" component={MovieDetails} /> {/* Adjust the path as necessary */}
                    </Switch>
                </main>
                <Footer />
            </Router>
        </SourceProvider>
    );
};


export default App;
