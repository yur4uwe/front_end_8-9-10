import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/high/Header';
import Footer from './components/high/Footer';
import Home from './components/pages/Home';
import Booking from "./components/pages/Booking"; // Adjust the import path as necessary
import MovieDetails from './components/pages/MovieDetails';
import NotFound from './components/pages/NotFound'; // Import the NotFound component
import SeatArrangement from './components/pages/SeatArrangement'; // Adjust the import path as necessary
import MyBookings from './components/pages/MyBookings';
import { SourceProvider } from './context/SourceContext'; // Import the context provider
import { OverlayNoticeProvider } from './context/OverlayNoticeContext';
import Notice from './components/high/Notice'; // Import the Notice component
import './App.css'; // Import global styles
import MovieContextProvider from './context/MovieContext';

const RenderWithProviders = ({ children }) => {
    return (
        <SourceProvider>
            <OverlayNoticeProvider>
                <MovieContextProvider>
                    {children}
                </MovieContextProvider>
            </OverlayNoticeProvider>
        </SourceProvider>
    );
}

const App = () => {
    return (
        <RenderWithProviders>
            <Router>
                <Notice />
                <Header />
                <main className='main-content'>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/book/:id/" component={Booking} />
                        <Route path="/booking/:id/:time" component={SeatArrangement} />
                        <Route path="/my-bookings" component={MyBookings} />
                        <Route path="/movie/:id" component={MovieDetails} />
                        <Route path="*" component={NotFound} />
                    </Switch>
                </main>
                <Footer />
            </Router>
        </RenderWithProviders>
    );
};

export default App;
