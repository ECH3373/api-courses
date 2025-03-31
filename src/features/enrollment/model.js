import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    employee_id: {
      type: mongoose.Schema.Types.ObjectId,
      trim: true,
      required: [true, ' employee_id is required'],
    },

    course_id: {
      type: mongoose.Schema.Types.ObjectId,
      trim: true,
      required: [true, ' course_id is required'],
    },
  },
  { versionKey: false },
);

export const model = mongoose.model('Enrollment', schema);
