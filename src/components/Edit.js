import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Edit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			key: '',
			title: '',
			description: '',
			author: ''
		};
	}

	componentDidMount() {
		const ref = firebase
			.firestore()
			.collection('boards')
			.doc(this.props.match.params.id);

		ref.get().then(doc => {
			if (doc.exists) {
				const board = doc.data();
				this.setState({
					key: doc.id,
					title: board.title,
					description: board.description,
					author: board.author
				});
			} else {
				console.log(`No such document`);
			}
		});
	}

	onChange = event => {
		const state = this.state;
		state[event.target.name] = event.target.value;
		this.setState({ board: state });
	};

	onSubmit = event => {
		event.preventDefault();

		const { title, description, author } = this.state;

		const updateReference = firebase
			.firestore()
			.collection('boards')
			.doc(this.state.key);
		updateReference
			.set({
				title,
				description,
				author
			})
			.then(documentReference => {
				this.setState({
					key: '',
					title: '',
					description: '',
					author: ''
				});
				this.props.history.push(`/show/${this.props.match.params.id}`);
			})
			.catch(error => {
				console.error(`Error updating document: ${error}`);
			});
	};

	render() {
		return (
			<div className='container'>
				<div className='panel panel-default'>
					<div className='panel-heading'>
						<h3 className='panel-title'>EDIT BOARD</h3>
					</div>
					<div className='panel-body'>
						<h4>
							<Link to={`/show/${this.state.key}`} className='btn btn-primary'>
								Board List
							</Link>
						</h4>
						<form onSubmit={this.onSubmit}>
							<div className='form-group'>
								<label for='title'>Title:</label>
								<input
									type='text'
									className='form-control'
									name='title'
									value={this.state.title}
									onChange={this.onChange}
									placeholder='Title'
								/>
							</div>
							<div class='form-group'>
								<label for='description'>Description:</label>
								<input
									type='text'
									class='form-control'
									name='description'
									value={this.state.description}
									onChange={this.onChange}
									placeholder='Description'
								/>
							</div>
							<div class='form-group'>
								<label for='author'>Author:</label>
								<input
									type='text'
									class='form-control'
									name='author'
									value={this.state.author}
									onChange={this.onChange}
									placeholder='Author'
								/>
							</div>
							<button type='submit' class='btn btn-success'>
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default Edit;
