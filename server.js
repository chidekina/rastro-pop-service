require("./src/moduleAlias");
const express = require("express");
const routes = require("@/routes");

const app = express();
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

app.listen(PORT, HOST, () => {
    console.log(`Servidor escutando em http://${HOST}:${PORT}`);
});
