import React from 'react';
import { graphql } from 'gatsby';
import CommentForm from '../components/comment-form';
import CommentList from '../components/comment-list';

// Basic component to render posts.
class PostTemplate extends React.Component {
	render() {
		const post = this.props.data.wpgraphql.post;

		return (
			<article>
				<h1 dangerouslySetInnerHTML={{ __html: post.title }}></h1>
				<div dangerouslySetInnerHTML={{ __html: post.content }}></div>
				<CommentForm postId={post.postId} />
				<CommentList postId={post.postId} />
			</article>
		);
	}
}

export default PostTemplate;

export const pageQuery = graphql`
	query($id: ID!) {
		wpgraphql {
			post(id: $id) {
				id
				postId
				title
				content
			}
		}
	}
`;
