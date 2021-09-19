const express = require('express');
const route = express.Router();
const {register,getAll,logIn,studentUpdate,recycleBin,reStore,passwordUpdate,
gteAndLes,sectionAandClass5,StudentDelete} = require('../controller/student');

route.get('/all-student',getAll);
route.post('/student/register',register);
route.post('/student/login',logIn);
route.put('/student/update/:id',studentUpdate);
route.put('/student/tempDelete/:id',recycleBin);
route.put('/student/restore/:id',reStore);
route.delete('/student/delete/:id',StudentDelete);
route.put('/student/passwordUpdate/:id',passwordUpdate);
route.get('/student/passination/:id1/:id2',gteAndLes);
route.get('/student/find-sec-class/:sec1/:class',sectionAandClass5);








module.exports=route