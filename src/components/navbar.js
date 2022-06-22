import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './style/navbar.css';
import Home from './home';
 import Albums from './albums';
 import Artists from './artists';
 import Categories from './categories.js';
 import Search from './search.js';
import img from '../img/iconSpotify.png'


function Navbar() {
    let component = <Router>


 
        <ul id="menu">
         <li><img id="icon" src={img} alt="" /></li>

            <li>
                <i className="fas fa-atom"></i>
                <Link to="/?page=1&limit=60&offset=0">Accueil</Link>
            </li>
            <li>
                <i className="fas fa-atom"></i>
                <Link to="/albums?page=1&limit=60&offset=0">Albums</Link>
            </li>
            <li>
                <i className="fas fa-atom"></i>
                <Link to="/genres">Genres</Link>
            </li>
            <li>
                <i className="fas fa-atom"></i>
                <Link to="/artistes?page=1&limit=60&offset=0">Artistes</Link>
            </li>
            <li>
                <i className="fas fa-atom"></i>
                <Link to="/search">Search</Link>
            </li>
        </ul>
        <Switch>
            <Route path="/albums">
            <Albums/>
            </Route>
            <Route path="/genres">
            <Categories/>
            </Route>
            <Route path="/artistes">
            <Artists/>
            </Route>
            <Route path="/search">
            <Search/>
            </Route>
            <Route path="/">
       <Home/>
            </Route>
        </Switch>
    </Router>;

    return component;
};

export default Navbar;