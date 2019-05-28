import * as mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema({
  title: String,
  description: String,
  details: String,
});

const exerciseModel = mongoose.model<mongoose.Document>('exercises', exerciseSchema);

export default exerciseModel;
