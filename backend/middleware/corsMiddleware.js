const cors = require('cors')

const origin = [
  "https://najmy.web.app/", 
  "https://web.postman.co/documentation/29017989-ce05e23a-90fa-4313-b0b7-227a5fe4258a/publish?workspaceId=012bbf21-0be2-4c2d-80eb-b6faf908eba4",
  "https://us-central1-revou-batch-june.cloudfunctions.net/project_milestone_mnajmytsss"
];

const corsOptionsDelegate = (req, callback) => {
    const clientOrigin = origin.includes(req.header("Origin"));
    const clientPartnerOrigin = partnerOrigin.includes(req.header("Origin"))

    if (clientOrigin) {
        callback(null, {
          origin: true,
          methods: "GET, POST, DELETE, PUT, OPTIONS, HEAD",
        });
      } else if (clientPartnerOrigin) {
        callback(null, {
          origin: true,
          methods: "GET, POST",
        });
      } else {
        callback(new Error("Blocked by CORS"));
      }
};

const corsMiddleware = (app) => {
    app.use(cors());
};

module.exports = corsMiddleware;