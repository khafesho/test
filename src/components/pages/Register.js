import React, { Component } from 'react';
import validator from 'validator';
import axios from 'axios';
import { useHistory , Link } from 'react-router-dom';



class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields : {
                email : '',
                password : '',
				fullname : '' ,
				birthday : '' ,
				gender : 'male'
            },
            errors : {}
        }
    }
		
		
	
    handleValidation(callback) {
        let { fields } = this.state;
        let errors = {};
        let formIsValid = true;
		
		
		// Email
        if(validator.isEmpty(fields.birthday)) {
			formIsValid = false;
            errors["birthday"] = "plz , enter birthday";
		}
		
        // Email
        if(validator.isEmpty(fields.email)) {
            formIsValid = false;
            errors["email"] = "plz , enter email";
        } else if(! validator.isEmail(fields.email)) {
            formIsValid = false;
            errors["email"] = "email is not Valid ! ";
        }

        // Email
        if(validator.isEmpty(fields.password)) {
            formIsValid = false;
            errors["password"] = "plz , enter password AND Minimum 6 Characters";
        } else if(! validator.isLength(fields.password , { min : 6 , max : undefined})) {
            formIsValid = false;
            errors["password"] = "password is not Valid ! AND Minimum 6 Characters ";
        }

        this.setState({ errors },() => {
            return callback(formIsValid)
        });

    }
    handleChange(event) {
        let fields = this.state.fields;
        let target = event.target;
        fields[target.name] = target.value;
        this.setState({fields});
    }
	

    handleRequest() {
		
		
		
        const { email , password , gender , fullname , birthday } = this.state.fields;

        let data = new FormData();
        data.append('email' , email);
        data.append('password' , password);
		data.append('gender' , gender);
		data.append('fullname' , fullname);
		data.append('birthday' , birthday);

        axios.post('http://farmaniehdrycleaning.com/api_rest/rest/product/register.php' , data)
		
            .then(response => {
                localStorage.setItem('api_token' , response.data.api_token);
				
					window.location = '/blog' ;
				 
				//console.log(response.data.api_token);
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleSubmit(event) {
        event.preventDefault();

        this.handleValidation((valid) => {
            if(valid) this.handleRequest()
        })
    }
    render() {
        const {email , password , fullname , birthday , gender } = this.state.fields;
        const { errors } = this.state;
        return (
            <div>
                <h2>Register Form</h2>
                <form onSubmit={this.handleSubmit.bind(this)} className="col-lg-5" style={{ marginTop : 20}}>
					<div className="form-group">
                        <label>Fullname : </label>
                        <input
                            type="text"
                            className={["form-control" , errors["fullname"] ? 'is-invalid' : ''].join(' ')}
                            name="fullname"
                            value={fullname}
                            onChange={this.handleChange.bind(this)}
                            placeholder="Please enter your fullname"/>
                        <span className="invalid-feedback rtl" style={{ display : errors["fullname"] ? 'block' : 'none'}}>{errors["fullname"]}</span>
                    </div>
					<div className="form-group">
						<div className="col-sm-6">
							<label for="input-type">Gender :</label>
							<div id="input-type" className="row">
								<div className="col-sm-6">
									<label className="radio-inline">
										<input name="gender" id="input-type-student" value="male" type="radio" onChange={this.handleChange.bind(this)} checked /> Male
									</label>
								</div>
								<div className="col-sm-6">
									<label className="radio-inline">
										<input name="gender" id="input-type-tutor" value="female" type="radio" onChange={this.handleChange.bind(this)} /> FeMale
									</label>
								</div>
							</div>
						</div>
					</div>

					<div className="form-group">
                        <label> Birthday : </label>
                        <input
                            type="text"
                            className={["form-control" , errors["birthday"] ? 'is-invalid' : ''].join(' ')}
                            name="birthday"
                            value={birthday}
                            onChange={this.handleChange.bind(this)}
                            placeholder="Please enter your Birthday"/>
                        <span className="invalid-feedback rtl" style={{ display : errors["birthday"] ? 'block' : 'none'}}>{errors["birthday"]}</span>
                    </div>
                    <div className="form-group">
                        <label>Email : </label>
                        <input
                            type="text"
                            className={["form-control" , errors["email"] ? 'is-invalid' : ''].join(' ')}
                            name="email"
                            value={email}
                            onChange={this.handleChange.bind(this)}
                            placeholder="Please enter your email"/>
                        <span className="invalid-feedback rtl" style={{ display : errors["email"] ? 'block' : 'none'}}>{errors["email"]}</span>
                    </div>
                    <div className="form-group">
                        <label>Password : </label>
                        <input
                            type="password"
                            className={["form-control" , errors["password"] ? 'is-invalid' : ''].join(' ')}
                            name="password"
                            value={password}
                            onChange={this.handleChange.bind(this)}
                            placeholder="Please enter your password"/>
                        <span className="invalid-feedback rtl" style={{ display : errors["password"] ? 'block' : 'none'}}>{errors["password"]}</span>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-danger" type="submit">Sign Up</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Register;
