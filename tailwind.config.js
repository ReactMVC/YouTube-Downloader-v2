/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./**/*.{html,js,php}"],
    theme: {
        extend: {
            margin: {
                '20': '5.5rem'
            },
        },
    },
    plugins: [],
}

// npx tailwindcss -i css/core.css -o css/tailwind.css --minify