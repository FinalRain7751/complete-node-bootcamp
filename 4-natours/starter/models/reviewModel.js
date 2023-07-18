const mongoose = require('mongoose');
const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const AppError = require('../utils/appError');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review cannot be empty'],
    },
    rating: {
      type: Number,
      // required: [true, 'Kindly provide a rating'],
      min: [1, 'Rating must be between 1 and 5'],
      max: [5, 'Rating must be between 1 and 5'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'A review must belong to a tour.'],
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: ['true', 'A review must have an author.'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

reviewSchema.pre('save', async function (next) {
  try {
    const [reviewWithSameTourIdAndUserId] = await Review.find({
      tour: this.tour,
      user: this.user,
    });
    // console.log(reviewWithSameTourIdAndUserId);
    if (reviewWithSameTourIdAndUserId) {
      next(new AppError('One user can give only one review about a tour', 400));
    }
    next();
  } catch (err) {
    next(new AppError('Error while saving review. Please try again.', 500));
  }
});

reviewSchema.pre(/^find/, async function (next) {
  //   this.populate({ path: 'user', select: 'name photo' }).populate({
  //     path: 'tour',
  //     select: 'name ratingsAverage',
  //   });
  this.populate({ path: 'user', select: 'name photo' });
  next();
});

reviewSchema.pre(/^find/, async function (next) {
  this.select('-__v');
  next();
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
