const express = require('express');
const mongoose = require('mongoose');

const Review = mongoose.model('Review');

const router = express.Router();

export default router;