const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: { type: String, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['consumer', 'admin'], default: 'consumer' },
  tickets: [{ type: Schema.Types.ObjectId, ref: "ticket" }],
}, { timestamps: true });

const User = model("User", userSchema);

module.exports = User;
