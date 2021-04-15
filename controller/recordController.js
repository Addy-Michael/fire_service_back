const catchAsync = require('../utils/catchAsync');
const AppError = require('./../utils/appError');
const Record = require('../models/recordModel');

// GET ALL RECORDS
exports.getRecords = catchAsync(async (req,res,next) => {
    const records = await Record.find({}).sort('reportID');

    res.status(200).json({
        status: "successful",
        results: records.lenght,
        records
    })
})

// GET NEW RECORDS
exports.getNewRecords = catchAsync(async (req,res,next) => {
    const records = await Record.find().skip(0).limit(4).sort('-createdAt');

    res.status(200).json({
        status: "successful",
        results: records.length,
        records
    })
})

// GET REPORT USING ID
exports.getReportById = catchAsync(async (req,res,next) => {
    const record = await Record.findOne({reportID: req.params.reportID});

    if(!record){
        return next(new AppError(`Record with ID number ${req.params.reportID} not found`,400));
    }

    res.status(200).json({
        status: "successful",
        record
    })
})

// GET REPORT USING MONTH
exports.getReportByMonth = catchAsync(async (req,res,next) => {
    const record = await Record.find({month: req.params.month}).sort('month');
    
    if(record.length === 0) return next(new AppError(`Records for ${req.params.month} not found`,400));

    res.status(200).json({
        status: "successful",
        total_monthly_records: record.length,
        record
    })
})

// GET REPORT USING YEAR
exports.getReportByYear = catchAsync(async (req,res,next) => {
    const record = await Record.find({year: Number(req.params.year)});
    
    if(record.length === 0) return next(new AppError(`Records for ${req.params.year} not found`,400));

    res.status(200).json({
        status: "successful",
        total_yearly_records: record.length,
        record
    })
})

// POST REPORT
exports.addRecord = catchAsync(async (req,res,next) => {
    const record = await Record.create(req.body);

    res.status(200).json({
        status: "Record added",
        record
    })
})

// EDIT RECORDS
exports.editRecord = catchAsync(async (req,res,next) => {
    const record = await Record.findOneAndUpdate({reportID: req.params.reportID}, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        status: "Record updated",
        record
    })
})

// DELETE RECORD
exports.deleteRecord = catchAsync(async (req,res,next) => {
    const record = await Record.findOneAndDelete({reportID: req.params.reportID});

    res.status(200).json({
        status: "Record deleted",
        record: null
    })
})