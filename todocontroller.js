const asyncHandler = require("express-async-handler");
const { findById } = require("../model/todo");
const todoSchema = require("../model/todo");
const getAll = asyncHandler(async(req,res)=>{
    const all = await todoSchema.find();
    res.status(201).json(all);
})
const addNew = asyncHandler(async(req,res)=>{
    const {text} = req.body;
    const createtext = await todoSchema.create({text});
    res.json(createtext);
})

const deleteOne = asyncHandler(async(req,res)=>{
    const del = await todoSchema.findByIdAndDelete(req.params.id);
    res.send(`Deleted data in ${req.params.id}`);
    console.log(del);
})

const todocheck = asyncHandler(async(req,res)=>{
    const todo = await todoSchema.findById(req.params.id);
    todo.completed = !todo.completed
    const done = todo.completed;
    // const added = await todoSchema.create({done});
    todo.save();
    res.json(todo)
})
module.exports = {getAll,addNew,deleteOne,todocheck}