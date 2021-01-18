import {app} from '../src/server/index.js'
const request = require('supertest');

describe('test the submit form handler' ,()=>{ 
test('chek input form handler  fuction',()=>{
    // const input =  handleSubmit('mm');
  let res=  request(app).get("/route").set('Aceppt','application/json')
     .expect(200).then((res)=>{
      expect(res.body.messag).toBe('Hello webpack')



     })
   })}) 
