import React, { Component } from 'react';
import { useHistory , Link } from 'react-router-dom';
import validator from 'validator';
import axios from 'axios';

class Blog extends Component {
		
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
	
	handleValidation(callback) {
        let { fields } = this.state;
        let errors = {};
        let formIsValid = true;
		
		if(validator.isEmpty(fields.title)) {
            formIsValid = false;
            errors["title"] = "plz , enter title";
        } 
		

    }
    handleChange(event) {
        let fields = this.state.fields;
        let target = event.target;
        fields[target.name] = target.value;
        this.setState({fields});
    }
	
	 handleRequest() {
		
		
		
        const { title , content , surl , meta , created } = this.state.fields;
		const is = 0 ;
		axios.get(`http://farmaniehdrycleaning.com/api_rest/rest/product/blog.php?title=${title}&content=${content}&surl=${surl}&meta=${meta}&created=${created}&is=${is}`)
		.then(response => {
			console.log(response);
				this.setState({
					articles: response.data.records
				})
		})
		.catch(error => {
			console.log(error)
		})	
		
    }
	
	handleSubmit(event) {
        event.preventDefault();

        //this.handleValidation((valid) => {
           // if(valid) 
				this.handleRequest()
       // })
    }
	
	  render() {

		 const {title , content , surl , meta , created } = this.state.fields;
        const { errors } = this.state;
			
        return (
            <div>
                <h2>Blog Form</h2>
                <form onSubmit={this.handleSubmit.bind(this)} className="col-lg-5" style={{ marginTop : 20}}>
					<div className="form-group">
                        <label>Title : </label>
                        <input
                            type="text"
                            className={["form-control" , errors["title"] ? 'is-invalid' : ''].join(' ')}
                            name="title"
                            value={title}
                            onChange={this.handleChange.bind(this)}
                            placeholder="Please enter your title"/>
                        <span className="invalid-feedback rtl" style={{ display : errors["title"] ? 'block' : 'none'}}>{errors["title"]}</span>
                    </div>
					
					<div className="form-group">
                        <label>Content : </label>
						<textarea
						    className={["form-control" , errors["content"] ? 'is-invalid' : ''].join(' ')}
							name="content"
							value={content}
							onChange={this.handleChange.bind(this)}
							placeholder="Please enter your content"
						></textarea>
                        <span className="invalid-feedback rtl" style={{ display : errors["content"] ? 'block' : 'none'}}>{errors["content"]}</span>
                    </div>
					
					
					<div className="form-group">
                        <label>URL Slug : </label>
                        <input
                            type="text"
                            className={["form-control" , errors["surl"] ? 'is-invalid' : ''].join(' ')}
                            name="surl"
                            value={surl}
                            onChange={this.handleChange.bind(this)}
                            placeholder="Please enter your url"/>
                        <span className="invalid-feedback rtl" style={{ display : errors["surl"] ? 'block' : 'none'}}>{errors["surl"]}</span>
                    </div>
					
					
					<div className="form-group">
                        <label>Meta Description : </label>
                        <input
                            type="text"
                            className={["form-control" , errors["meta"] ? 'is-invalid' : ''].join(' ')}
                            name="meta"
                            value={meta}
                            onChange={this.handleChange.bind(this)}
                            placeholder="Please enter your meta"/>
                        <span className="invalid-feedback rtl" style={{ display : errors["meta"] ? 'block' : 'none'}}>{errors["meta"]}</span>
                    </div>
					
					
					<div className="form-group">
                        <label>Created : </label>
                        <input
                            type="text"
                            className={["form-control" , errors["created"] ? 'is-invalid' : ''].join(' ')}
                            name="created"
                            value={created}
                            onChange={this.handleChange.bind(this)}
                            placeholder="Please enter your created"/>
                        <span className="invalid-feedback rtl" style={{ display : errors["created"] ? 'block' : 'none'}}>{errors["created"]}</span>
                    </div>
					
                    <div className="form-group">
                        <button className="btn btn-danger" type="submit">Submit</button>
                    </div>
                </form>
				
				
            
			<div className="container">
			         
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
			
			</div>
        );
	  }
}

export default Blog;
