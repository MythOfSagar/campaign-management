const mongoose = require("mongoose");

const resourceSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    creator: { type: String, required: true },
    content: { type: Object, of: mongoose.Schema.Types.Mixed, required: false },
  },
  {
    timestamps: true,
  }
);

const ResourceModel = mongoose.model("resources", resourceSchema);

module.exports = { ResourceModel };
