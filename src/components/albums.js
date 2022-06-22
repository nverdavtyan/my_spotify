
import React from 'react';
import './style/albums.css';
//import Pagination from "@material-ui/lab/Pagination";
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';

class Albums extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: [],
            tracks: [],
            max: 0,
            call: 0
        }
    }
    componentDidMount() {
        var queryString = window.location.search;
        var urlParams = new URLSearchParams(queryString);
        var limit = urlParams.get('limit');
        var offset = urlParams.get('offset');
        var albumId = urlParams.get('album');
        if(albumId != null) {
            fetch("http://localhost/W-WEB-090-PAR-1-1-spotify-andry.ramanana/API/spotify.php?get=album&album=" + albumId).then(res => res.json()).then((result) => {
                this.setState({
                    isLoaded: true,
                    data: result,
                    max: 1
                });
                fetch("http://localhost/W-WEB-090-PAR-1-1-spotify-andry.ramanana/API/spotify.php?get=tracks&album=" + albumId).then(res => res.json()).then((result) => {
                    this.setState({
                        isLoaded: true,
                        tracks: result
                    });
                });
            });
        } else {
            fetch("http://localhost/W-WEB-090-PAR-1-1-spotify-andry.ramanana/API/spotify.php?get=albums").then(res => res.json()).then((result) => {
                this.setState({
                    isLoaded: true,
                    data: result,
                    max: result.length
                });
                if(limit != null && offset != null) {
                    fetch("http://localhost/W-WEB-090-PAR-1-1-spotify-andry.ramanana/API/spotify.php?get=albums&limit=" + limit + "&offset=" + offset).then(res => res.json()).then((result) => {
                        this.setState({
                            isLoaded: true,
                            data: result
                        });
                    });
                };
            });
        }
    }
    render() {
        if(this.state.max > 1) {
            let div = <>
                <header>
                    <h1>Albums</h1>
                </header>
                <div className="albums">
                    <AlbumsList albums={this.state.data} max={this.state.max}/>
                </div>
            </>;
            return div;
        } else if(this.state.max === 1) {
            let div = <>
                <header>
                    <h1>Album : <span>{this.state.data.name}</span></h1>
                </header>
                <div className="album">
                    <Album album={this.state.data} tracks={this.state.tracks}/>
                </div>
            </>;
            return div;
        } else {
            return <div></div>;
        }
    }
};

function Album(props) {
    let tracks = [];
    props.tracks.forEach((element) => {
        var minutes = Math.floor(element.duration / 60);
        tracks.push(<div key={"track" + element.track_no} className="track">
                   <LibraryMusicIcon sx={{ fontSize: 60 }} />
            <div className="trackInfos">
                <div className="trackNameDuration">
                    <p>Track n°{element.track_no} : <span>{element.name}</span></p>
                    <p className="duration">Duration: {minutes} min</p>
                </div>
                <audio controls src={element.mp3}></audio>
            </div>
        </div>);
    });
    let timestamp = parseInt(props.album.release_date) * 1000;
    let date = new Date(timestamp);
    let year = date.getFullYear();
    let div = <>
        <div className="albumInfos">
            <div className="albumPhoto">
                <img src={props.album.cover} alt={"Cover de " + props.album.name}></img>
            </div>
            <div className="albumYear">
                <h5>Year</h5>
                <p>{year}</p>
            </div>
            <div className="albumPopularity">
                <h5>Popularity</h5>
                <p>{props.album.popularity}</p>
            </div>
            <div className="albumGenre">
                <h5>Genre</h5>
                <p>{getCategories(props.album.genres)}</p>
            </div>
            <div className="albumDescription">
                <h5>Description</h5>
                <p>{props.album.description}</p>
            </div>
        </div>
        <div className="albumDetails">
            <h2><i className="fas fa-atom"></i>Tracks (<span>&nbsp;{props.tracks.length}&nbsp;</span>)</h2>
            <div className="albumTracks">
                {tracks}
            </div>
        </div>
    </>;
    function getCategories(array) {
        let categories = [];
        array.forEach((element) => { categories.push(element.genre); });
        return categories.join(", ");
    };
    return div;
}

function AlbumsList(props) {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let limit = urlParams.get('limit');
    let max = props.max;
    let pages = Math.ceil(max / limit);
    let div = <>
        <Show albums={props.albums}/>
         <Pagination pages={pages}/> 


    </>;
    return div;
}

function Show(props) {
    let elements = [];
    props.albums.forEach((element) => {
        console.log(element)
        let timestamp = parseInt(element.release_date) * 1000;
        let date = new Date(timestamp);
        let year = date.getFullYear();
        elements.push(<a key={"album" + element.id} href={"/albums?get=album&album=" + element.id}>
            <img src={element.cover} alt={"Cover de l'album" + element.name}></img>
            <p className="year">{year}</p>
            <p className="popularity">Popularité : <span>{element.popularity}</span></p>
        </a>);
    });
    let div = <div className="list">
        {elements}
    </div>;
    return div;
};

function Pagination(props) {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let limit = urlParams.get('limit');
    let links = [];
    let i = 0;
    while(i < props.pages) {
        i++;
        let offset = (i * limit) - limit;
        links.push(<a href={"/albums?page=" + i + "&limit=50&offset=" + offset} key={"page" + i}>{i}</a>);
    };
    let div = <div className="pagination">
        {links}
    </div>;
    return div;
};

document.addEventListener('play', function(e){
    let audios = document.getElementsByTagName('audio');
    let length = audios.length;
    for(var i = 0; i < length; i++){
        if(audios[i] !== e.target){
            audios[i].pause();
        };
    };
}, true);

export default Albums;
















