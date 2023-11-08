const app = require("./app");
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`application is running at http://localhost:${PORT}`);
})