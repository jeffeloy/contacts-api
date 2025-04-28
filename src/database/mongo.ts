import mongoose from "mongoose";

export const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
  } catch (error) {
    console.error(error);
  }
};

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cell_phone: { type: String, required: true },
  email: { type: String, required: false },
});

export const MongoContact = mongoose.model("MongoContact", contactSchema);
