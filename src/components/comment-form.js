import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

// Create a GraphQL mutation for comment submissions.
const commentSubmitQuery = gql`
	mutation($author: String, $commentOn: Int, $content: String, $authorEmail: String) {
		createComment(
			input: {
				clientMutationId: "CreateComment"
				author: $author
				commentOn: $commentOn
				content: $content
				authorEmail: $authorEmail
			}
		) {
			success
		}
	}
`;

// Our main component class.
class CommentForm extends React.Component {
	constructor(props) {
		super(props);
		// Set the initial state.
		this.state = {
			commentStatus: false,
			post: props.postId,
			comment: '',
			author: '',
			email: '',
			url: '',
		};

		// Bind input changes.
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	// Handles input change events.
	handleInputChange(event) {
		const target = event.target;
		const value = event.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		// Sets the state of the input field.
		this.setState({
			[name]: value,
		});
	}

	// Renders the comment form elements.
	renderCommentForm() {
		return (
			// Wrap it in our mutation.
			<Mutation
				mutation={commentSubmitQuery}
				// Set completion state.
				onCompleted={() => {
					this.setState({ commentStatus: 'success' });
				}}
				// Set error state.
				onError={() => {
					this.setState({ commentStatus: 'error' });
				}}
			>
				{(addComment) => (
					// Render the form.
					<form
						onSubmit={(event) => {
							// Prevent default form submit behavior.
							event.preventDefault();
							// Set initial loading state on submission.
							this.setState({ commentStatus: 'loading' });
							// Run the mutation.
							addComment({
								variables: {
									author: this.state.author,
									commentOn: this.state.post,
									content: this.state.comment,
									authorEmail: this.state.email,
								},
							});
						}}
					>
						<label htmlFor="author">Author</label>
						<input name="author" value={this.state.author} onChange={this.handleInputChange} />
						<label htmlFor="email">Email</label>
						<input name="email" value={this.state.email} onChange={this.handleInputChange} />
						<label htmlFor="author">Website</label>
						<input name="url" value={this.state.url} onChange={this.handleInputChange} />
						<label htmlFor="comment">Comment</label>
						<textarea name="comment" value={this.state.comment} onChange={this.handleInputChange} />
						<input name="submit" type="submit" value="Post Comment" />
					</form>
				)}
			</Mutation>
		);
	}

	// Render the comment form.
	render() {
		// Check comment status from component state and display messages or form.
		switch (this.state.commentStatus) {
			case 'success':
				return 'Your comment has been successfully submitted.';
			case 'loading':
				return 'Please wait. Your comment is being submitted.';
			case 'error':
				return 'There was an error in your submission. Please try again later.';
			default:
				return this.renderCommentForm();
		}
	}
}

export default CommentForm;
