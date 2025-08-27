const moduleAlias = require("module-alias");
const path = require("path");

moduleAlias.addAlias("@", path.join(__dirname, "."));

module.exports = moduleAlias;
