module.exports = {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#032541",
				secondary: "#2DBBD0",
				dark: "#202529",
			},
		},
	},
	plugins: [require("@tailwindcss/line-clamp")],
};
