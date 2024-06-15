
    const { Schema, model } = require("mongoose");

    const userSchema = new Schema(
      {
        
        username: {
          type: String,
          trim: true,
        },
        lastName: {
          type: String,
          trim: true,
        },
        email: {
          type: String,
          required: [true, "Email es obligatorio"],
          unique: true,
          lowercase: true,
          trim: true,
        },
        password: {
          type: String,
          required: [true, "Password es obligatorio"],
        },
        role: {
          type: String,
          enum: ['consumer', 'admin'],
          default: 'consumer', // Por defecto, el usuario será de tipo "consumer"
        },
        tickets: [{type: Schema.Types.ObjectId, ref: "ticket"}],
      },
      {
        timestamps: true,
      }
    );
    
    const User = model("User", userSchema);
    
    module.exports = User; 