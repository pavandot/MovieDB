const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#032541",
				secondary: "#2DBBD0",
				dark: "#202529",
			},
			fontFamily: {
				Poppins: ["Poppins", ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [require("@tailwindcss/line-clamp")],
};
