import React, { Component } from 'react';
import axios from 'axios';

class Home extends Component {
    constructor(props) {
		super(props);
		this.state = {
			articles : [] ,
			fields : {
				title : '',
				content : '',
				surl : '' ,
				meta : '' ,
				created : ''
			},
			errors : {}
		}
	}
	
	componentDidMount () {
		const { title , content , surl , meta , created } = this.state.fields;
		const is = 1 ;
        axios.get(`http://farmaniehdrycleaning.com/api_rest/rest/product/blog.php?title=${title}&content=${content}&surl=${surl}&meta=${meta}&created=${created}&is=${is}`)
            .then(response => {
				console.log(response.data)
                    this.setState({
						
                        articles: response.data.records
                    })
            })
            .catch(error => {
                console.log(error)
            })

    }

    render() {
        return (
            <div>
                <div className="jumbotron ">
                    <h1>Project</h1>
                    <p>    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
               
				<table className="table">
				<thead>
				  <tr>
					<th>title</th>
					<th>content</th>
					<th>meta</th>
					<th>url</th>
					<th>created</th>
				  </tr>
				</thead>
				<tbody>
				
				{
                    this.state.articles.map((product , index) => <tr key={index}><td>{product.title}</td><td>{product.content}</td><td>{product.meta}</td><td>{product.url}</td><td>{product.created}</td></tr>)
                 }
				
				  
				  
				</tbody>
			  </table>

            </div>
        );
    }
}

export default Home;
