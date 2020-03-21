import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Show extends Component {
	constructor(props) {
		super(props);
		this.state = {
			boards: {},
			key: ''
		};
	}

	componentDidMount() {
		const ref = firebase
			.firestore()
			.collection('boards')
			.doc(this.props.match.params.id);

		ref.get().then(doc => {
			if (doc.exists) {
				this.setState({
					boards: doc.data(),
					key: doc.id,
					isLoading: false
				});
			} else {
				console.log('No such document.');
			}
		});
	}

	delete = id => {
		firebase
			.firestore()
			.collection('boards')
			.doc(id)
			.delete()
			.then(() => {
				console.log('Document successfully deleted.');
				this.props.history.push('/');
			})
			.catch(error => {
				console.log(`Error removing document: ${error}`);
			});
	};

	render() {
		return (
			<div className='container'>
				<div className='panel panel-default'>
					<div className='panel-heading'>
						<h4>
							<Link to='/'>Board List</Link>
						</h4>
						<h3 className='panel-title'>{this.state.boards.title}</h3>
					</div>
					<div className='panel-body'>
						<dl>
							<dt>Description:</dt>
							<dd>{this.state.boards.description}</dd>
							<dt>Author:</dt>
							<dd>{this.state.boards.author}</dd>
						</dl>
						<Link to={`/edit/${this.state.key}`} className='btn btn-success'>
							Edit
						</Link>
						&nbsp;
						<button
							onClick={() => this.delete(this.state.key)}
							className='btn btn-danger'
						>
							Delete
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default Show;
