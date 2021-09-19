const Student = require('../models/student');
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken')
const mongoose= require('mongoose')

const secretkey = process.env.secretkey;


const getAll= async(req,res)=>{
    try{
        const data  = await Student.find({isDelete:false});
        if(data.length){
            return res.status(201).json({
                data
            })
        }else{
            return res.json({
                mgs: 'database empty!'
            })
        }

    }
    catch(err){
        return res.json({
            err
        })
    }

    
}

const register = async(req,res)=>{
    try{
        const {password} = req.body;
        const hashedPassword = await bcrypt.hash(password,10);
        req.body.password = hashedPassword;
        
        const student = new Student(req.body);
        const data = await student.save();
        
        return res.status(201).json({
            mgs: 'Registation successfully!',
            data
        })
    }
    catch(err){
        return res.json({
            mgs:'registation unsuccessful' 
        })
    }
}

const logIn= async(req,res)=>{
    try{
        const {email,password}=req.body;
        const student = await Student.findOne({email});
        if(student){
            const isValid = await bcrypt.compare(password,student.password);
            if(isValid){
                const data={
                    firstName: student.firstName,
                    lastName: student.lastName
                }
                const token = jwt.sign(data,secretkey, {expiresIn: "1h"});
                return res.json({
                    mgs: 'Welcome loggin Successfully',
                    token
                })

            }
            else{
                return res.json({
                    mgs: "password is not matched"
                })
            }


    }
        else{
            return res.json({
                mgs: 'email is not matched!'
            })
        }
    }

    catch(err){
        return res.json({
            err
        })
    }
}

const studentUpdate= async(req,res)=>{
    try{
        const id= req.params.id;
        await Student.findOneAndUpdate(
            {_id: id},
            {
                $set:req.body
            },
            {
                multi:true
            }
        )
        return res.json({
            mgs: 'student updata successfully!',
            data: req.body
        })
    }
    catch(err){
        return res.json({
            err
        })
    }
}

const recycleBin =async(req,res)=>{
    try{
        const id=req.params.id;
        await Student.findOneAndUpdate(
            {_id: id},
            {
                $set: {isDelete: true}
            },
            {
                multi:true
            }
        )
        return res.json({
            mgs: 'student deleted successfully'
        })
    }
    catch(err){
        return res.json({
            err
        })
    }
} 

const reStore= async(req,res)=>{
    try{
        const id= req.params.id;
        await Student.findOneAndUpdate(
            {_id:id},
            {
                $set: {isDelete:false}
            },
            {
                multi:true
            }
        )
        return res.json({
            mgs: "student re_store succeessfully"
        })
    }
    catch(err){
        return res.json({
            err
        })
    }
}

const StudentDelete= async(req,res)=>{
    try{
        const id= req.params.id;
        await Student.findOneAndDelete(
            {_id:id}
        )
        return res.json({
            mgs: 'Student delete successfully!'
        })
    }
    catch(err){
        return res.json({
            err
        })
    }
}


const passwordUpdate = async(req,res)=>{
    const id=req.params.id;
    const {password}=req.body;
    const hashedPassword = await bcrypt.hash(password,10);
    await Student.findOneAndUpdate(
        {_id:id},
        {
            $set: {password:hashedPassword}
        },
        {
            multi: true
        }
    )
    return res.json({
        mgs: 'passsword update successfully!'
    })
}

const gteAndLes=async(req,res)=>{
    try{
        const id1= +req.params.id1;
        const id2= +req.params.id2;
        
        const data= await Student.find(
                {age: {
                    $gte: id1,
                    $lte:id2
                }
            
            })
        res.send(data)
    }
    catch(err){
        return res.json({
            err
        })
    }
}

const sectionAandClass5=async(req,res)=>{
    try{
        const sec1= req.params.sec1;
        const cls= req.params.class;
        const data= await Student.find({Section:sec1, class:cls});
        return res.json({
            data
        })
    }
    catch(err){
        return res.json({
            err
        })
    }
}




module.exports={
    register,
    getAll,
    logIn,
    studentUpdate,
    recycleBin,
    reStore,
    StudentDelete,
    passwordUpdate,
    gteAndLes,
    sectionAandClass5
}