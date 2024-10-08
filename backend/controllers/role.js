const roleModel = require("../models/roleSchema");
const CreatRole = (req, res) => {
  const { role, permissions } = req.body;
  const newrole = new roleModel({
    role,
    permissions,
  });
  newrole
    .save()
    .then((resp) => {
      res.status(201).json({
        message: "Role Created Successfully",
        role: resp,
      });
    })
    .catch((err) => {
      res.status(500).json({
        err: err,
      });
    });
};
module.exports = { CreatRole };
