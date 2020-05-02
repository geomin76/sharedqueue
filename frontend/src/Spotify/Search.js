import React, {Component} from 'react'
import axios from "axios"

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
            console.log(res.data);
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
				this.searchResults(query );
			} );
		}
	};

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
                    <i className="fa fa-search search-icon" aria-hidden="true"/>
                </label>
            </div>
        )
    }
}

export default Search;