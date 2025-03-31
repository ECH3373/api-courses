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

    quantity: {
      type: Number,
      trim: true,
      required: [true, 'quantity is required'],
      min: [1, 'quantity must be greater than or equal to 1'],
      validate: { validator: Number.isInteger, message: 'quantity must be an integer' },
    },

    lesson_id: {
      type: mongoose.Schema.Types.ObjectId,
      trim: true,
      required: [true, 'lesson_id is required'],
    },
  },
  { versionKey: false },
);

export const model = mongoose.model('Resource', schema);
