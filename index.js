const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors =require('cors');
app.use(bodyParser.json());
app.use(express.json());
const{ PrismaClient}= require ("@prisma/client");
const { response } = require('express');
const prisma = new PrismaClient();
const port = 3000
app.use(cors());
app.get('/',async (req,res) =>{
    const allNotes = await prisma.note.findMany();
    res.status(200).json({
        allNotes
    });
    console.log(allNotes);
    return;
    })
app.get('/get',async(req,res)=>{
    const {id} = req.body.Note;
    if(!id == null){
        const note = await prisma.note.findUnique(
        {where:{
            
            id:parseInt(id),
            }
        })
        res.status(200).json({
            note
        });
        console.log(note);
    }
    else
    {
        const allNotes = await prisma.note.findMany();
        res.status(200).json({
            allNotes
        });
        console.log(allNotes);
        return;
    }
})
app.post('/add', async (req, res) => {
    console.log(req.body);
  const{title,body,date} = req.body.Note;
  if(!title||!body||!date)
    {
        res.status(200).json('All fields must be filled');
        console.log('Error: Missing field')
        return;
    }
    new_Note(title,body,date);
  const allNotes = await prisma.note.findMany();
    res.status(200).json({
        allNotes
    });
    console.log(allNotes);
})
app.delete('/clear',async(req,res) => {
    const del = await prisma.note.deleteMany();
    res.status(200).json({
        del
    });
})
app.delete('/delete',async(req,res) =>{
   const{ id } = req.body.Note;
    const del = await prisma.note.delete({
        where: {id:parseInt(id)}
    })
    res.status(200).json({
        del
    });
    console.log(del);
})
app.patch('/update', async(req,res)=>{
const{id,title,body,date} = req.body.Note;
if(!id)
    {
        res.status(200).json('ID must be filled');
        console.log('Error: Missing ID')
        return;
    }
const edit = await prisma.note.update({
    where:{
        id : parseInt(id),
    },
    data:{
        title: title,
        body:body,
        date:date,
    }
})
res.status(200).json({
    edit
})
})
async function new_Note(title, body,date){
    try {
        const newNote = await prisma.note.create({
            data: {
                title: title,
                body: body,
                date: date,
            }
        });
        return;
    }
    catch(error){
        console.error('Error adding note',error);
        res.send('Error adding note');
    }    
}


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
