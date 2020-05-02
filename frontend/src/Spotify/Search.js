import React, {Component} from 'react'
import axios from "axios"
import Songs from '../Object/Songs.js';

class Search extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            query: null,
            results: {},
            loading: false,
            message: ""
        }
        this.cancel = '';
    }


    searchResults(query) { 
        const searchUrl = 'https://api.spotify.com/v1/search?q=' + encodeURI(query) + '&type=track'
        if (this.cancel) {
            this.cancel.cancel();
        }
        this.cancel = axios.CancelToken.source();

        axios.get(searchUrl, {
            cancelToken: this.cancel.token,
            mode: 'cors',
            headers: {
                'Authorization': 'Bearer ' + this.props.token,
                'Content-Type': 'application/json',
                "Accept": "application/json",
            }
        })
        .then(res => {
            // const query = res.data.tracks.items;
            // console.log(Array.from(res.data.tracks.items));
            const query = Array.from(res.data.tracks.items);
            
            this.setState({query, loading: false})
            console.log(this.state.query);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    handleOnInputChange = ( event ) => {
		const query = event.target.value;
		if ( ! query ) {
			this.setState( { query, results: {}, message: '' } );
		} else {
			this.setState( { query, loading: true, message: '' }, () => {
                this.searchResults(query);
			} );
		}
    };
    

    //figure out song obj to store in a list view, with a little option that can add to queue
    
    get renderSongs() {
        let songs = <p>There are no tracks</p>
        if (this.state.query) {
            songs = <Songs list={this.state.query}/>
            // songs = <p>Something is here!</p>
        }
        return songs
    }

    render() {
        return (
            <div>
                <label className="search-label" htmlFor="search-input">
                    <input
                        type="text"
                        name="query"
                        // value={ query }
                        id="search-input"
                        placeholder="Search..."
                        onChange={this.handleOnInputChange}
                    />
                    <br></br>
                    <br></br>
                    {this.renderSongs}
                    <i className="fa fa-search search-icon" aria-hidden="true"/>
                </label>
            </div>
        )
    }
}

export default Search;