import React, {Component} from 'react';
import axios from 'axios';
import url from '../url';
import {Link} from 'react-router-dom';
import SingleJob from './SingleJob';
import {Button, ButtonToolbar} from 'react-bootstrap';

class Jobs extends Component{
	constructor(){
		super();
		this.state={
			completedJobs: [""],
			uncompletedJobs: [""],
			user:"",
			token: localStorage.getItem('token'),
			showJobs: false
		}
		this.handleJob = this.handleJob.bind(this);
		this.handleClearForm = this.handleClearForm.bind(this);
		this.showComplete = this.showComplete.bind(this);
		this.showUncomplete = this.showUncomplete.bind(this);
	}

	componentDidMount(){
		const getToken = axios({
			method: "POST",
			url: url.url + "jobs",
			data:{
				token: this.state.token
			}
		});
		getToken.then((jobData)=>{
		// console.log(jobData.data.completed[0].user);
			// console.log(jobData)
			 // console.log("are there jobss",jobData.data);
			 // console.log(jobData.data[0].customer.id)
			this.setState({
				completedJobs: jobData.data.completed,
				uncompletedJobs: jobData.data.uncompleted,
				user : jobData.data.completed[0].user
			})
		})
	}

	formatTime(time){
		// console.log(time)
		let date = new Date(time);
		let dateTime = (date.toString().split(" GMT")[0].slice(0, -3))
		return(
			<div>
			{dateTime}
			</div>
		)
	}

	handleJob(event){
		event.preventDefault();
		const first_name = document.getElementById("fname").value;
		const last_name = document.getElementById("lname").value;
		const address = document.getElementById("address").value;
		const phone = document.getElementById("phone").value;
		const email = document.getElementById("email").value;
		const time = document.getElementById("date").value.toString();
		const description = document.getElementById("description").value;
// 		console.log("git hererere")
// 		console.log(first_name);
// 		console.log(last_name);
		const jobRequest = axios({
			method:"POST",
			url:url.url + "create/customer",
			data:{
				first_name,
				last_name,
				email,
				phone,
				address
			}
		})

		jobRequest.then((newJobData)=>{
			// console.log("custommmeerrr",newJobData);
			const customer = newJobData.data;
			const completed = false;
			// console.log(newJobData.data.id);

			const createdJobs =axios({
				method:"POST",
				url: url.url + "create/job",
				data:{
					customer,
					user: this.state.user,
					time,
					description,
					completed
				}
			})
			createdJobs.then((jobData)=>{
				console.log(jobData)
				this.setState({
					jobs: jobData.data
				})
				document.getElementById(`exampleModal`).click()
				
			})		
		})
	}

	handleClearForm(event){
		document.getElementById("jobForm").reset();
	}

	showUncomplete(){
		this.setState({
			showJobs: false
		})
	}

	showComplete(){
		console.log("YO")
		this.setState({
			showJobs: true
		})
	}



	render(){
		// col-lg-2 col-md-2 col-xl-12 col-sm-4 

		const Ujobs = this.state.uncompletedJobs.map((data, index)=>{
			if(data != undefined){
				const customer = data.customer
				// console.log(customer.id)
				return(
					<li className="col-md-3">
						<Link to={`/job/${data.id}`}  >
							<div id="jumboJob" className="jumbotron">
								<h3 className="jumboTitle"> Job# {data.id} </h3>
								<hr />
								{customer != undefined
									?
									<span className="jumboText">
										<h5>Customer: {customer.last_name}, {customer.first_name}</h5>
										<h5>Address: {customer.address}</h5>
										<h5>Phone: {customer.phone}</h5>
										<h5>Email: {customer.email}</h5>
										<h5>{this.formatTime(data.time)} </h5>
										<h5> Description: {data.description} </h5>
									</span>
									:
									<span></span>
								}
							</div>
						</Link>
					</li>
				)
			}
		})

		const Cjobs = this.state.completedJobs.map((data, index)=>{
			if(data != undefined){
				const customer = data.customer
				// console.log(customer.id)
				return(
					<li className="col-md-3">
						<Link to={`/complete/${data.id}`}  >
							<div id="jumboJob" className="jumbotron">
								<h3 className="jumboTitle"> Job# {data.id} </h3>
								<hr />
								{customer != undefined
									?
									<span className="jumboText">
										<h5>Customer: {customer.last_name}, {customer.first_name}</h5>
										<h5>Address: {customer.address}</h5>
										<h5>Phone: {customer.phone}</h5>
										<h5>Email: {customer.email}</h5>
										<h5>{this.formatTime(data.time)} </h5>
										<h5> Description: {data.description} </h5>
									</span>
									:
									<span></span>
								}
							</div>
						</Link>
					</li>
				)
			}
		})
		
		return(
			<div className="container2 main-jobs">
				<ButtonToolbar>
			  		<Button bsStyle="primary" bsSize="large" onClick={this.showUncomplete}>Assigned Jobs</Button>
			  		<Button bsStyle="success" bsSize="large" onClick={this.showComplete}>Completed Jobs</Button>	
					<Button id="add-job" onClick={this.handleClearForm} bsStyle="primary" data-toggle="modal" data-target="#exampleModal">
				 		Add a Job
					</Button>
				</ButtonToolbar>
				<div className="jobs-list">
					<ul className="row">
						{this.state.showJobs
							?
							Cjobs
							:
							Ujobs
						}
					</ul>
				</div>
				

				<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
				  <div class="modal-dialog" role="document">
				    <div class="modal-content">
				      <div class="modal-header">
				        <h5 class="modal-title" id="exampleModalLabel">New Job</h5>
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
				          <span aria-hidden="true">&times;</span>
				        </button>
				      </div>
				      <div class="modal-body">
				        			<form id="jobForm" onSubmit={this.handleJob}>
				                      <div class="form-group">
				                        <label for="first_name">Customer First Name:</label>
				                        <input type="text" class="form-control" id="fname"/>
				                      </div>
				                      <div class="form-group">
				                        <label for="last_name">Customer Last Name:</label>
				                        <input type="text" class="form-control" id="lname"/>
				                      </div>
				                       <div class="form-group">
				                        <label for="email">Customer Email:</label>
				                        <input type="email" class="form-control" id="email"/>
				                      </div>
				                       <div class="form-group">
				                        <label for="address">Address:</label>
				                        <input type="text" class="form-control" id="address"/>
				                      </div>
				                      <div class="form-group">
				                        <label for="phone">Phone:</label>
				                        <input type="text" class="form-control" id="phone"/>
				                      </div>
				                      <div class="form-group">
				                        <label for="description">Description:</label>
				                        <input type="text" class="form-control" id="description"/>
				                      </div>
				                      <div class="form-group">
				                        <label for="date">Date:</label>
				                        <input type="datetime-local" class="form-control" id="date"/>
				                      </div>
				                      
				                      <button type="submit" class="btn btn-default">Submit</button>
				                </form>
				      		</div>
				    	</div>
				  	</div>
				</div>
			</div>
		)
	}
} 

export default Jobs;