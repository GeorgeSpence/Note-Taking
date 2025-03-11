const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(express.json());
const{ PrismaClient}= require ("@prisma/client");
const { response } = require('express');
const prisma = new PrismaClient();
const port = 3000
app.get('/notes/all',async (req,res) =>{
    const allNotes = await prisma.note.findMany();
    res.status(200).json({
        allNotes
    });
    console.log(allNotes);
    return;
    })
app.get('/notes',async(req,res)=>{
    const {id} = req.body.Note;
    
    const note = await prisma.note.findUnique(
    {where:{
        
        id:parseInt(id),
        }
    })
    res.status(200).json({
        note
    });
    console.log(note);
})
app.post('/notes', async (req, res) => {
    console.log(req.body);
  const{title,body,date} = req.body.Note;
  //const currentdate = new Date()
  //var title ='title';
  //var body = 'body';
  //var date = (currentdate.getDate())+'/'+(currentdate.getMonth()+1);
  new_Note(title,body,date);
  const allNotes = await prisma.note.findMany();
    res.status(200).json({
        allNotes
    });
    console.log(allNotes);
})
app.delete('/notes/clear',async(req,res) => {
    const del = await prisma.note.deleteMany();
    res.status(200).json({
        del
    });
})
app.delete('/notes',async(req,res) =>{
   const{ id } = req.body.Note;
    const del = await prisma.note.delete({
        where: {id:parseInt(id)}
    })
    res.status(200).json({
        del
    });
    console.log(del);
})
app.patch('/notes', async(req,res)=>{
const{id,title,body,date} = req.body.Note;
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
