module.exports = {
	plugins: [
		{
			resolve: `gatsby-source-graphql`,
			options: {
				typeName: `WPGraphQL`,
				fieldName: `wpgraphql`,
				// Change this to your GraphQL endpoint.
				url: 'http://wordpressheadless.localhost/graphql',
			},
		},
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
	],
};
