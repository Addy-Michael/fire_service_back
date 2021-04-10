const express = require('express');
const recordController = require('./../controller/recordController');
const authController = require('./../controller/authController');

const router = express.Router();

router.route('/')
    .get(recordController.getRecords)
    .post(authController.protect,recordController.addRecord);

router.route('/:reportID')
    .get(recordController.getReportById)
    .patch(authController.protect,authController.restrict('admin'),recordController.editRecord)
    .delete(authController.protect,authController.restrict('admin'),recordController.deleteRecord);

router.route('/month/:month').get(recordController.getReportByMonth);
router.route('/year/:year').get(recordController.getReportByYear);

module.exports = router;