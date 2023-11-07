const express = require("express")
const { studentlists } = require("./model/index")

const app = express()
app.set('view engine', 'ejs')
app.use(express.static("public/"))
require("./model/index")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//rendering the pages 
app.get("/", async(req, res) => {
    const allstudentlists = await studentlists.findAll()
    res.render("index",{studentcount:allstudentlists.length })
})
app.get("/createStudent", async (req, res) => {
    res.render("form")
})
//read the data
app.get("/viewStudent", async (req, res) => {
    const allstudentlists = await studentlists.findAll() //find the data from sql and display in front end
    // console.log(allstudentlists)
    res.render("table", { studentlists: allstudentlists})// creating variable studentlists which store all the data found from database and pssing to to frontend
})
//create  to database 
app.post("/createStudent", async (req, res) => {
    const name = req.body.name
    const address = req.body.address
    const contact = req.body.contact
    const bloodGroup = req.body.bloodgroup
    // console.log(req.body)
    // console.log(name,address,contact,bloodGroup)

    await studentlists.create({
        name: name,
        address: address,
        contact: contact,
        bloodgroup: bloodGroup
    })
    res.redirect("/viewStudent")
})
//delete api
app.get("/delete/:id", async (req, res) => {
    const id = req.params.id
    // console.log(id)
    await studentlists.destroy({
        where: {
            id: id
        }
    })
    res.redirect("/viewStudent")
})
//edit 
app.get("/editdata/:id", async (req, res) => {
    const id = req.params.id
    const editstudentlists = await studentlists.findAll(
        {
            where: {
                id: id
            }
        }
    )
    // console.log("id is ", req.params.id)
    res.render("edit", { value: editstudentlists })
})
//edit api
app.post("/editdata/:id", async(req, res) => {
    const id = req.params.id
    // console.log(req.body)
    const { name, address, contact, bloodgroup } = req.body;
    await studentlists.update({
        name: name,
        address: address,
        contact: contact,
        bloodgroup: bloodgroup,

    }, {
        where: {
            id: id
        }
    })
    res.redirect("/viewStudent")
})


app.listen(3000, () => {
    console.log("Server is running on 3000 port")
})