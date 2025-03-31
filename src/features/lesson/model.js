import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'name is required'],
    },

    description: {
      type: String,
      trim: true,
    },

    image: {
      type: String,
      trim: true,
    },

    file: {
      type: String,
      trim: true,
      required: [true, 'file is required'],
    },

    duration_seconds: {
      type: Number,
      trim: true,
      required: [true, 'duration_seconds is required'],
      min: [1, 'duration_seconds must be greater than or equal to 1'],
    },

    order: {
      type: Number,
      trim: true,
      required: [true, 'order is required'],
      min: [1, 'order must be greater than or equal to 1'],
      validate: { validator: Number.isInteger, message: 'order must be an integer' },
    },

    module_id: {
      type: mongoose.Schema.Types.ObjectId,
      trim: true,
      required: [true, 'module_id is required'],
    },
  },
  { versionKey: false },
);

export const model = mongoose.model('Lesson', schema);
