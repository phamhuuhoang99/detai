const usersRoute = require("./user.route");
const missionsRoute = require("./mission.route");
const plansRoute = require("./plan.route");
const schemesRoute = require("./scheme.route");
const victimsRoute = require("./victim.route.js");
const materialsRoute = require("./material.route.js");
const symbolRoute = require("./symbol.route.js");
const unitRoute = require("./unit.route.js");
const PersonRoute = require("./personnel.route.js");

function route(app) {
  app.use("/users", usersRoute);
  app.use("/missions", missionsRoute);
  app.use("/plans", plansRoute);
  app.use("/schemes", schemesRoute);
  app.use("/victims", victimsRoute);
  app.use("/materials", materialsRoute);
  app.use("/symbols", symbolRoute);
  app.use("/units", unitRoute);
  app.use("/personnel", PersonRoute);
  app.use("/error", (req, res, next) => {
    return res.status(401).json({ message: "Unauthorized" });
  });
}

module.exports = route;
