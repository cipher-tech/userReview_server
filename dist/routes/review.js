"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var mongoose = require('mongoose');
var Review = mongoose.model('Review');
var router = express.Router();
exports.default = router;
