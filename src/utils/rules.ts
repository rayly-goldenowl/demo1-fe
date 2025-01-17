export const rules = {
	first_name: {
		required: {
			value: true,
			message: "Do not leave first name blank",
		},
	},

	last_name: {
		required: {
			value: true,
			message: "Do not leave last name blank",
		},
	},

	email: {
		required: {
			value: true,
			message: "Do not leave email blank",
		},
		pattern: {
			value: /^\S+@\S+\.\S+$/,
			message: "Email is not in correct format",
		},
	},

	password: {
		required: {
			value: true,
			message: "Do not leave password blank",
		},
		minLength: {
			value: 8,
			message: "Password is too short (minimum is 8 characters)",
		},
		maxLength: {
			value: 128,
			message: "Password is too long (maximum is 128 characters)",
		},
	},

	confirm_password: {
		required: {
			value: true,
			message: "Do not leave confirm password blank",
		},
		minLength: {
			value: 8,
			message: "Password is too short (minimum is 8 characters)",
		},
		maxLength: {
			value: 128,
			message: "Password is too long (maximum is 128 characters)",
		},
	},
};
