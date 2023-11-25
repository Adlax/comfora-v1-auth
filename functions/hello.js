// domain/.netlify/functions/hello
exports.handler = async (evt, context) => {
	return {
		statusCode: 200,
		body: "Hello World!",
	};
};
