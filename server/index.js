const bodyParser = require("body-parser");
const express = require("express")
const app = express()
const mysql = require('mysql')
const cors = require("cors")
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');
const http = require("http");
const { Server } = require("socket.io");
const cloudinary = require('cloudinary').v2;
// const { runInNewContext } = require("vm");
// const { Console } = require("console");


const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "universitypartnership",
    multipleStatements:true,
});

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

cloudinary.config({ 
    cloud_name: 'farhana19', 
    api_key: '561157664878161',
    api_secret: 'aWglNWfqdR_c1mxCc9TOI1uBg_M'
  });

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("./public"));

var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/images/')
    },
    filename: (req,file,callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({
    storage: storage
});

//sign up
app.post("/signup", async(req, res) => {

    let checkUser = false;

    const userEmail = req.body.userEmail;
    const userPassword = req.body.userPassword;
    const userFullName = req.body.userFullName;
    const userContact = req.body.userContact;
    const userType = req.body.userType;
    const userStatus = req.body.userStatus;



    try{

        if(userType === 'lecturer'){
            const findUser = "SELECT lecturer_id FROM lecturer WHERE (lecturer_email = ? OR lecturer_password = ?);"

            db.query(findUser, [userEmail, userPassword], (err, result) => {
                if(result.length > 0){
                    res.json({
                        checkUser: false,
                    })
                }
                else{
                    var sqlInsert = "INSERT INTO lecturer (lecturer_email, lecturer_password, lecturer_name, lecturer_contactNo, lecturer_status) VALUES (?,?,?,?,?)";

                    db.query(sqlInsert, [userEmail, userPassword, userFullName, userContact, userStatus], (err1, result1) => {

                        res.json({
                            checkUser: true,
                        })
                    })
                }
            }
        )
        }
        else if(userType === 'representative'){
            const findUser = "SELECT representative_id FROM company_representative WHERE (representative_email = ? OR representative_password = ?);"

            db.query(findUser, [userEmail, userPassword], (err, result) => {
                if(result.length > 0){
                    res.json({
                        checkUser: false,
                    })
                }
                else{
                    var sqlInsert = "INSERT INTO company_representative (representative_email, representative_password, representative_name, representative_contactNo, representative_status) VALUES (?,?,?,?,?)";

                    db.query(sqlInsert, [userEmail, userPassword, userFullName, userContact, userStatus], (err1, result1) => {

                        res.json({
                            checkUser: true,
                        })
                    })
                }
            }
        )
        }
        
    }
    catch(err){
        console.log(err);
    }
    
})

//sign in
app.post("/signin", function(req,res) {

    const email = req.body.userEmail;
    const password = req.body.userPassword;
    const status = "Active";
    let isAuthorized = false;
    let id = 0;

    try{
        const signIn = "SELECT admin_id, admin_status FROM admin WHERE (admin_email = ? AND admin_password = ?);"

        db.query(signIn, [email, password], (err, result) => {

            if(result.length < 1){
                const signIn1 = "SELECT lecturer_id, lecturer_name, lecturer_email, lecturer_password, lecturer_status FROM lecturer WHERE (lecturer_email = ? AND lecturer_password = ?);"
                db.query(signIn1, [email, password], (err1, result1) => {
                    if(result1.length < 1){
                        const signIn2 = "SELECT representative_id, representative_name, representative_email, representative_password, representative_status FROM company_representative WHERE (representative_email = ? AND representative_password = ?);"

                        db.query(signIn2, [email, password], (err2, result2) => {

                        if(result2.length < 1){

                            // console.log(err);
                            res.json({
                                isAuthorized: false,
                            })
                        }
                        else{

                            // console.log(err2);
                            res.json({
                                isAuthorized: true,
                                id: result2[0].representative_id,
                                name: result2[0].representative_name,
                                email: result2[0].representative_email,
                                password: result2[0].representative_password,
                                status: result2[0].representative_status,
                                type: "Representative",
                            })
                        }
                        })
                    }
                    else{
                        res.json({
                            isAuthorized: true,
                            id: result1[0].lecturer_id,
                            name: result1[0].lecturer_name,
                            email: result1[0].lecturer_email,
                            password: result1[0].lecturer_password,
                            status: result1[0].lecturer_status,
                            type: "Lecturer",
                        })
                    }

                })
            }
            else{
                res.json({
                    isAuthorized: true,
                    id: result[0].admin_id,
                    status: result[0].admin_status,
                    type: "Admin",
                })
            }
            
        })

    }
    catch(err){
        console.log(err);
    }
})

app.get("/lectureractive", function(req, res){

    const status = "Active";

    try{
        const lectList = "SELECT lecturer_id, lecturer_name, lecturer_email, lecturer_status FROM lecturer WHERE lecturer_status=? ORDER BY lecturer_id DESC;"

        db.query(lectList, status, (err, result) => {
            res.send(result);
        }
        )
    }
    catch(err){
        console.log(err);
    }
})

app.get("/lecturerinactive", function(req, res){

    const status = "Inactive";

    try{
        const lectList = "SELECT lecturer_id, lecturer_name, lecturer_email, lecturer_status FROM lecturer WHERE lecturer_status=? ORDER BY lecturer_id DESC;"

        db.query(lectList, status, (err, result) => {
            res.send(result);
        }
        )
    }
    catch(err){
        console.log(err);
    }
})

app.get("/representativeactive", function(req, res){

    const status = "Active";

    try{
        const repList = "SELECT representative_id, representative_name, representative_email, representative_status FROM company_representative WHERE representative_status=? ORDER BY representative_id DESC;"

        db.query(repList, status, (err, result) => {
            res.send(result);
        }
        )
    }
    catch(err){
        console.log(err);
    }
})

app.get("/representativeinactive", function(req, res){

    const status = "Inactive";

    try{
        const repList = "SELECT representative_id, representative_name, representative_email, representative_status FROM company_representative WHERE representative_status=? ORDER BY representative_id DESC;"

        db.query(repList, status, (err, result) => {
            res.send(result);
        }
        )
    }
    catch(err){
        console.log(err);
    }
})

app.get("/lecturerrecord", function(req, res){

    // const status = "Active";

    try{
        const lecList = "SELECT * FROM lecturer ORDER BY lecturer_id DESC;"

        db.query(lecList, (err, result) => {
            res.send(result);
        }
        )
    }
    catch(err){
        console.log(err);
    }
})

app.get("/reprecord", function(req, res){

    try{
        const reprList = "SELECT * FROM company_representative LEFT JOIN company ON company_representative.company_id=company.company_id ORDER BY representative_id DESC;"

        db.query(reprList, (err, result) => {
            res.send(result);
        }
        )
    }
    catch(err){
        console.log(err);
    }
})

app.get("/lectprofile/:id", function(req, res){

    const id = req.params.id;

    try{
        const findLecturer = "SELECT lecturer_id, lecturer_email, lecturer_name, lecturer_contactNo, lecturer_preferences, lecturer_image FROM lecturer WHERE lecturer_id = ?";

        db.query(findLecturer, id, (err, result) => {
            res.send({
                id: result[0].lecturer_id,
                email: result[0].lecturer_email,
                name: result[0].lecturer_name,
                contactNo: result[0].lecturer_contactNo,
                preferences: result[0].lecturer_preferences,
                image: result[0].lecturer_image,
            })
        }
        )
    }
    catch(err){
        console.log(err);
    }
});

app.get("/repprofile/:id", function(req, res){

    const id = req.params.id;

    try{
        const findRep = "SELECT company_representative.representative_id, company_representative.representative_email, company_representative.representative_name, company_representative.representative_contactNo, representative_type.representative_type_id, representative_type.representative_type_label, company.company_id, company.company_name, company.company_email, company.company_contactNo, company.company_preferences, company.company_image, company_category.category_label, company_sector.sector_label FROM company_representative LEFT JOIN company ON company_representative.company_id=company.company_id LEFT JOIN company_category ON company.category_id=company_category.category_id LEFT JOIN company_sector ON company.sector_id=company_sector.sector_id LEFT JOIN representative_type ON company_representative.representative_type_id=representative_type.representative_type_id WHERE company_representative.representative_id = ?";

        db.query(findRep, id, (err, result) => {
            
            res.send({
                email: result[0].representative_email,
                name: result[0].representative_name,
                contactNo: result[0].representative_contactNo,
                ttype: result[0]. representative_type_id,
                tttype: result[0]. representative_type_label,
                com_id: result[0].company_id,
                com_name: result[0].company_name,
                com_email: result[0].company_email,
                com_contactNo: result[0].company_contactNo,
                com_category: result[0].category_label,
                com_sector: result[0].sector_label,
                preferences: result[0].company_preferences,
                image: result[0].company_image,
            })
        }
        )
    }
    catch(err){
        console.log(err);
    }
});

app.put("/updatelecturer/:id", (req,res) => {

        const id = req.body.userId;

        try{
            db.query("SELECT * FROM lecturer WHERE lecturer_id=?", id, (err1, result1) => {

                if(result1.length > 0){

                
                const lecturerEmail = req.body.lecturerEmail || result1[0].lecturer_email;
                const lecturerName = req.body.lecturerName || result1[0].lecturer_name;
                const lecturerContact = req.body.lecturerContact || result1[0].lecturer_contactNo;
                const lecturerPreferences = req.body.lecturerPref || result1[0].lecturer_preferences;
                const lecturerStatus = result1[0].lecturer_status;
                const lecturerImage = result1[0].lecturer_image;

                for(var prefs in lecturerPreferences){
                    prefs = JSON.stringify(lecturerPreferences).replace(/]|[[]|"/g, '', );
                }

                const updateLect = "UPDATE lecturer SET lecturer_email = ?, lecturer_name = ?, lecturer_contactNo = ?, lecturer_preferences = ?, lecturer_status = ?, lecturer_image = ? WHERE lecturer_id = ?;"

                db.query(updateLect, [lecturerEmail, lecturerName, lecturerContact, prefs, lecturerStatus, lecturerImage, id], (err, result) => {


                if(err){
                    console.log(err);           
                }
                else{

                    res.send(result);
                }
                
            })
                }
            })
            

        }
        catch(err){
            console.log(err);
        }
}
)

app.put("/updatelectstatus/:id", (req,res) => {

    const id = req.body.userId;

    try{
        db.query("SELECT * FROM lecturer WHERE lecturer_id=?", id, (err1, result1) => {

            if(result1.length > 0){

            const lecturerEmail = req.body.lecturerEmail || result1[0].lecturer_email;
            const lecturerName = req.body.lecturerName || result1[0].lecturer_name;
            const lecturerContact = req.body.lecturerContact || result1[0].lecturer_contactNo;
            const lecturerStatus = req.body.lecturer_status || result1[0].lecturer_status;
            const lecturerPreferences = req.body.lecturerPref || result1[0].lecturer_preferences;

            const updateLect = "UPDATE lecturer SET lecturer_email = ?, lecturer_name = ?, lecturer_contactNo = ?, lecturer_status = ?, lecturer_preferences =? WHERE lecturer_id = ?;"

            db.query(updateLect, [lecturerEmail, lecturerName, lecturerContact, lecturerStatus, lecturerPreferences, id], (err, result) => {


            if(err){
                console.log(err);           
            }
            else{

                res.send(result);
            }
            
        })
            }
        })
        

    }
    catch(err){
        console.log(err);
    }
}
)

app.put("/updaterepstatus/:id", (req,res) => {

    const id = req.body.userId;

    try{
        db.query("SELECT * FROM company_representative WHERE representative_id=?", id, (err1, result1) => {

            if(result1.length > 0){

            const representativeEmail = req.body.representativeEmail || result1[0].representative_email;
            const representativeName = req.body.representativeName || result1[0].representative_name;
            const representativeContact = req.body.representativeContact || result1[0].representative_contactNo;
            const representativeStatus = req.body.representative_status || result1[0].representative_status;
            const representativeType = req.body.representative_type_id || result1[0].representative_type_id;
            const representativeCompany = req.body.company_id || result1[0].company_id;

            const updateRep = "UPDATE company_representative SET representative_email = ?, representative_name = ?, representative_contactNo = ?, representative_status = ?, representative_type_id =?, company_id=? WHERE representative_id = ?;"

            db.query(updateRep, [representativeEmail, representativeName, representativeContact, representativeStatus, representativeType, representativeCompany, id], (err, result) => {

            // console.log(result);

            if(err){
                console.log(err);           
            }
            else{

                res.send(result);
            }
            
        })
            }
        })
        

    }
    catch(err){
        console.log(err);
    }
}
)

app.put("/updaterepresentative/:id", (req,res) => {

        const id = req.body.userId;


        try{
            db.query("SELECT * FROM company_representative WHERE representative_id=?", id, (err1, result1) => {

                if(result1.length > 0){

                    const repEmail = req.body.repEmail || result1[0].representative_email;
                    const repName = req.body.repName || result1[0].representative_name;
                    const repContact = req.body.repContact || result1[0].representative_contactNo;
                    const repType = req.body.repType || result1[0].representative_type_id;
                    const compName = req.body.companyName || result1[0].company_id;
                    

                    const updateRep = "UPDATE company_representative SET representative_email = ?, representative_name = ?, representative_contactNo = ?, representative_type_id = ?, company_id = ? WHERE company_representative.representative_id = ?;"

                    db.query(updateRep, [repEmail, repName, repContact, repType, compName, id], (err, result) => {


                        if(err){
                            console.log(err);
                        }
                        else{
        
                            res.send(result);
                        }
                        
                    })
                }
            })

        }
        catch(err){
            console.log(err);
        }
}
)

app.put("/lecteditproject/:projectid", (req,res) => {

        const projectId = req.body.projectId;
    

        let updateSuccess = false;


        try{

            db.query("SELECT * FROM project WHERE project_id=?", projectId, (err1, result1) => {

                if(result1.length > 0){

                    const projectTitle = req.body.projectTitle || result1[0].project_title;
                    const projectInformation = req.body.projectInformation || result1[0].project_information;
                    const projectStatus = req.body.projectStatus || result1[0].project_status;
                    const projectType = req.body.projectType || result1[0].project_type_id;
                    const projectField = req.body.projectField || result1[0].project_field_id;
                    const collaboratorId = req.body.collaboratorId || result1[0].representative_id;

                    const updateProject = "UPDATE project SET project_title = ?, project_information = ?, project_status = ?, project_type_id = ?, project_field_id = ?, representative_id = ? WHERE project_id = ?;"

                    db.query(updateProject, [projectTitle, projectInformation, projectStatus, projectType, projectField, collaboratorId, projectId], (err, result) => {


                        if(err){
                            console.log("Error: ", err);
                        }
                        else{
                            res.send(result);
                        }
                        
                    })

                        }
                        
                    }
                    )

        }
        catch(err){
            console.log(err);
        }
    
}
)

app.put("/repeditproject/:projectid", (req,res) => {

    const projectId = req.body.projectId;
    

    let updateSuccess = false;


    try{

        db.query("SELECT * FROM project WHERE project_id=?", projectId, (err1, result1) => {

            if(result1.length > 0){

                const projectTitle = req.body.projectTitle || result1[0].project_title;
                const projectInformation = req.body.projectInformation || result1[0].project_information;
                const projectStatus = req.body.projectStatus || result1[0].project_status;
                const projectType = req.body.projectType || result1[0].project_type_id;
                const projectField = req.body.projectField || result1[0].project_field_id;
                const collaboratorId = req.body.collaboratorId || result1[0].lecturer_id;

                const updateProject = "UPDATE project SET project_title = ?, project_information = ?, project_status = ?, project_type_id = ?, project_field_id = ?, lecturer_id = ? WHERE project_id = ?;"

                db.query(updateProject, [projectTitle, projectInformation, projectStatus, projectType, projectField, collaboratorId, projectId], (err, result) => {


                    if(err){
                        console.log("Error: ", err);
                    }
                    else{
                        res.send(result);
                    }
                    
                })

                    }
                    
                }
                )

    }
    catch(err){
        console.log(err);
    }

}
)

app.get("/type", function(req, res){
    const type = "SELECT * FROM project_type;"

    db.query(type, (err, result) => {
        res.send(result);
    }
    )
});

app.get("/field", function(req, res){
    const field = "SELECT * FROM project_fieldelective;"

    db.query(field, (err, result) => {
        res.send(result);
    }
    )
});

app.post("/addnewprojectl", function(req,res) {

    const id = req.body.userId;
    const title = req.body.projectTitle;
    const information = req.body.projectInformation;
    const status = req.body.projectStatus;
    const type = req.body.projectType;
    const field = req.body.projectField;
    const owner = req.body.projectOwner;
    const date = req.body.projectDate;
    const time = req.body.projectTime;
    const day = req.body.projectDay;
    let addSuccess = false;


    try{
        const addProjectLect = "INSERT INTO project(project_title, project_information, project_status, project_type_id, project_field_id, lecturer_id, project_owner, project_date, project_time, project_day) VALUES (?,?,?,?,?,?,?,?,?,?);"

        db.query(addProjectLect, [title, information, status, type, field, id, owner, date, time, day], (err, result) => {

            res.send(result);
            
        })

    }
    catch(err){
        console.log(err);
    }
})

app.post("/addnewprojectr", function(req,res) {

    const id = req.body.userId;
    const title = req.body.projectTitle;
    const information = req.body.projectInformation;
    const status = req.body.projectStatus;
    const type = req.body.projectType;
    const field = req.body.projectField;
    const owner = req.body.projectOwner;
    const date = req.body.projectDate;
    const time = req.body.projectTime;
    const day = req.body.projectDay;
    let addSuccess = false;


    try{
        const addProjectRep = "INSERT INTO project(project_title, project_information, project_status, project_type_id, project_field_id, representative_id, project_owner, project_date, project_time, project_day) VALUES (?,?,?,?,?,?,?,?,?,?);"

        db.query(addProjectRep, [title, information, status, type, field, id, owner, date, time, day], (err, result) => {


            if(err){
                res.json({
                    addSuccess: false,
                })            }
            else{
                res.json({
                    addSuccess: true,
                })
            }
            
        })

    }
    catch(err){
        console.log(err);
    }
})

app.get("/findlectproject/:id", function(req, res){

    const id = req.params.id;

    try{
        const findLectProject = "SELECT lecturer.lecturer_id, lecturer.lecturer_name, project.project_id, project.project_title, project.project_information, project_type.project_type_label, project_fieldelective.project_field_label FROM lecturer INNER JOIN project ON lecturer.lecturer_id = project.lecturer_id INNER JOIN project_type ON project.project_type_id = project_type.project_type_id INNER JOIN project_fieldelective ON project.project_field_id = project_fieldelective.project_field_id WHERE lecturer.lecturer_id = ? ORDER BY project_id desc LIMIT 3;";

        db.query(findLectProject, id, (err, result) => {
            res.send(result);
        }
        )
    }
    catch(err){
        console.log(err);
    }
});

app.get("/lecturerproject/:id", function(req, res){

    const id = req.params.id;

    try{
        const findLectProject = "SELECT lecturer.lecturer_id, lecturer.lecturer_name, project.project_id, project.project_title, project.project_information, project_type.project_type_label, project_fieldelective.project_field_label FROM lecturer INNER JOIN project ON lecturer.lecturer_id = project.lecturer_id INNER JOIN project_type ON project.project_type_id = project_type.project_type_id INNER JOIN project_fieldelective ON project.project_field_id = project_fieldelective.project_field_id WHERE lecturer.lecturer_id = ?;";

        db.query(findLectProject, id, (err, result) => {
            res.send(result);
        }
        )
    }
    catch(err){
        console.log(err);
    }
});

app.get("/repproject/:id", function(req, res){

    const id = req.params.id;

    try{
        const findRepProject = "SELECT company_representative.representative_id, company_representative.representative_name, project.project_id, project.project_title, project.project_information, project_type.project_type_label, project_fieldelective.project_field_label FROM company_representative INNER JOIN project ON company_representative.representative_id = project.representative_id INNER JOIN project_type ON project.project_type_id = project_type.project_type_id INNER JOIN project_fieldelective ON project.project_field_id = project_fieldelective.project_field_id WHERE company_representative.representative_id = ?;";

        db.query(findRepProject, id, (err, result) => {
            res.send(result);
        }
        )
    }
    catch(err){
        console.log(err);
    }
});

app.get("/findrepproject/:id", function(req, res){

    const id = req.params.id;

    try{
        const findRepProject = "SELECT company_representative.representative_id, company_representative.representative_name, project.project_id, project.project_title, project.project_information, project_type.project_type_label, project_fieldelective.project_field_label FROM company_representative INNER JOIN project ON company_representative.representative_id = project.representative_id INNER JOIN project_type ON project.project_type_id = project_type.project_type_id INNER JOIN project_fieldelective ON project.project_field_id = project_fieldelective.project_field_id WHERE company_representative.representative_id = ? ORDER BY project_id desc LIMIT 3;";

        db.query(findRepProject, id, (err, result) => {
            res.send(result);
        }
        )
    }
    catch(err){
        console.log(err);
    }
});

app.get("/lectactivity/:id", function(req, res){

    const id = req.params.id;

    try{
        const findLectActivity = "SELECT project_activity.project_activity_title, project.project_id FROM project INNER JOIN project_activity ON project.project_id=project_activity.project_id WHERE project.lecturer_id=? ORDER BY project_activity.project_activity_id DESC LIMIT 3;";

        db.query(findLectActivity, id, (err, result) => {
            res.send(result);
        }
        )
    }
    catch(err){
        console.log(err);
    }
});

app.get("/repactivity/:id", function(req, res){

    const id = req.params.id;

    try{
        const findRepActivity = "SELECT project_activity.project_activity_title, project.project_id FROM project INNER JOIN project_activity ON project.project_id=project_activity.project_id WHERE project.representative_id=? ORDER BY project_activity.project_activity_id DESC LIMIT 3;";

        db.query(findRepActivity, id, (err, result) => {
            res.send(result);
        }
        )
    }
    catch(err){
        console.log(err);
    }
});

app.get("/lecturer/:userId/viewproject/:projectId", function(req, res){

    const projectId = req.params.projectId;

    try{
        const findProject = "SELECT * FROM project INNER JOIN project_type ON project.project_type_id=project_type.project_type_id INNER JOIN project_fieldelective ON project.project_field_id=project_fieldelective.project_field_id LEFT JOIN lecturer ON project.lecturer_id=lecturer.lecturer_id LEFT JOIN company_representative ON project.representative_id=company_representative.representative_id WHERE project.project_id = ?";

        db.query(findProject, projectId, (err, result) => {

            res.send({
                projectId: result[0].project_id,
                projectTitle: result[0].project_title,
                projectInformation: result[0].project_information,
                projectStatus: result[0].project_status,
                projectTypeId: result[0].project_type_id,
                projectType: result[0].project_type_label,
                projectFieldId: result[0].project_field_id,
                projectField: result[0].project_field_label,
                projectOwner: result[0].project_owner,
                lecturerId: result[0].lecturer_id,
                lecturerName: result[0].lecturer_name,
                representativeId: result[0].representative_id,
                representativeName: result[0].representative_name,
                projectDate: result[0].project_date,
                projectTime: result[0].project_time,
                projectDay: result[0].project_day,
            });
        }
        )
    }
    catch(err){
        console.log(err);
    }
});


app.get("/representative/:userId/viewproject/:projectId", function(req, res){

    const projectId = req.params.projectId;

    try{
        const findProject = "SELECT * FROM project INNER JOIN project_type ON project.project_type_id=project_type.project_type_id INNER JOIN project_fieldelective ON project.project_field_id=project_fieldelective.project_field_id LEFT JOIN lecturer ON project.lecturer_id=lecturer.lecturer_id LEFT JOIN company_representative ON project.representative_id=company_representative.representative_id WHERE project.project_id = ?";

        db.query(findProject, projectId, (err, result) => {

            res.send({
                projectId: result[0].project_id,
                projectTitle: result[0].project_title,
                projectInformation: result[0].project_information,
                projectStatus: result[0].project_status,
                projectTypeId: result[0].project_type_id,
                projectType: result[0].project_type_label,
                projectFieldId: result[0].project_field_id,
                projectField: result[0].project_field_label,
                projectOwner: result[0].project_owner,
                lecturerId: result[0].lecturer_id,
                lecturerName: result[0].lecturer_name,
                representativeId: result[0].representative_id,
                representativeName: result[0].representative_name,
                projectDate: result[0].project_date,
                projectTime: result[0].project_time,
                projectDay: result[0].project_day,
            });
        }
        )
    }
    catch(err){
        console.log(err);
    }
});

app.post("/addnewact", function(req,res) {

    const title = req.body.activityTitle;
    const information = req.body.activityInformation;
    const projectId = req.body.projectId;
    const status = req.body.activityStatus;
    let addSuccess = false;


    try{
        const addActivity = "INSERT INTO project_activity (project_activity_title, project_activity_information, project_id, project_activity_status) VALUES (?,?,?,?);"

        db.query(addActivity, [title, information, projectId, status], (err, result) => {


            if(err){
                res.json({
                    addSuccess: false,
                })            }
            else{
                res.json({
                    addSuccess: true,
                })
            }
            
        })

    }
    catch(err){
        console.log(err);
    }
})

app.put("/updateactivity/:activityId", function(req,res) {

    const activityId = req.params.activityId;

    try{

        const findActivity = "SELECT project_activity.project_activity_title, project_activity.project_activity_information, project_activity.project_id, project_activity.project_activity_status FROM project_activity INNER JOIN project ON project_activity.project_id=project.project_id WHERE project_activity.project_activity_id = ?;";

        db.query(findActivity, activityId, (err, result) => {

            if(result.length > 0){

                const title = req.body.activityTitle || result[0].project_activity_title;
                const information = req.body.activityInformation || result[0].project_activity_information;
                const status = req.body.activityStatus || result[0].project_activity_status;
                const projectId = req.body.projectId || result[0].project_id;

                const editActivity = "UPDATE project_activity SET project_activity_title = ?, project_activity_information = ?,  project_id = ?, project_activity_status = ? WHERE project_activity_id=?;"

                db.query(editActivity, [title, information, projectId, status, activityId], (err1, result1) => {

                    res.send(result1);
                    
                })
            }            
        })

    }
    catch(err){
        console.log(err);
    }
})

app.post("/uplatt", upload.single('file'), (req,res) => {


    let successfulAdd = false;

    if(!req.file){
        console.log("No file upload");
    }
    else{
        var imgsrc = 'http://127.0.0.1:3001/images/' + req.file.filename;
        var projectId = req.body.projectId;
        var insertData = "INSERT INTO project_attachment(project_attachment_url, project_id) VALUES (?, ?)"
        db.query(insertData, [imgsrc, projectId], (err, result) => {
            if (err) throw err
            
            res.json({
                successfulAdd: true
            })
            
        })
    }
})

app.put("/userimage/:id", (req,res) => {

    const userId = req.params.userId;
    const url = req.body.imageUrl;
    const userType = req.body.type;

    if(userType === lecturer){
            try{

            db.query("SELECT * FROM lecturer WHERE lecturer_id=?", id, (err1, result1) => {

                if(result1.length > 0){
                
                const lecturerEmail = result1[0].lecturer_email;
                const lecturerName = result1[0].lecturer_name;
                const lecturerContact = result1[0].lecturer_contactNo;
                const lecturerPreferences = result1[0].lecturer_preferences;
                const lecturerStatus = result1[0].lecturer_status;
                const lecturerImage = url || result1[0].lecturer_image;
    
                for(var prefs in lecturerPreferences){
                    prefs = JSON.stringify(lecturerPreferences).replace(/]|[[]|"/g, '', );
                }
    
                const updateLect = "UPDATE lecturer SET lecturer_email = ?, lecturer_name = ?, lecturer_contactNo = ?, lecturer_preferences = ?, lecturer_status=?, lecturer_image = ? WHERE lecturer_id = ?;"
    
                db.query(updateLect, [lecturerEmail, lecturerName, lecturerContact, prefs, lecturerStatus, lecturerImage, userId], (err, result) => {
    
                // console.log(result);
    
                if(err){
                    console.log(err);           
                }
                else{
    
                    res.send(result);
                }
                
            })
                }
            })
            
    
        }
        catch(err){
            console.log(err);
        }
    }
})

app.get("/:projectId/activity", function(req, res){

    const projectId = req.params.projectId;
    // console.log(projectId);

    try{
        const findProjectActivity = "SELECT project_activity.project_activity_id, project_activity.project_activity_title, project_activity.project_activity_information, project_activity.project_activity_status FROM project_activity INNER JOIN project ON project_activity.project_id=project.project_id WHERE project_activity.project_id = ?;";

        db.query(findProjectActivity, projectId, (err, result) => {

            res.send(result);
        }
        )
    }
    catch(err){
        console.log(err);
    }
});

app.get("/:projectId/getactivity/:activityId", function(req, res){

    const activityId = req.params.activityId;
    

    try{
        const findActivity = "SELECT project_activity.project_activity_id, project_activity.project_activity_title, project_activity.project_activity_information, project_activity.project_activity_status FROM project_activity INNER JOIN project ON project_activity.project_id=project.project_id WHERE project_activity.project_activity_id = ?;";

        db.query(findActivity, activityId, (err, result) => {

            

            if(result.length > 0){
                res.send({
                    id: result[0].project_activity_id,
                    title: result[0].project_activity_title,
                    information: result[0].project_activity_information,
                    status: result[0].project_activity_status,
                    projectCode: result[0].project_id,
                })
            }
        }
        )
    }
    catch(err){
        console.log(err);
    }
});

app.delete("/delactivity/:activityKey", function(req, res){

    const activityId = req.params.activityKey;

    try{
        const deleteActivity = "DELETE FROM project_activity WHERE project_activity_id = ?";

        db.query(deleteActivity, activityId, (err, result) => {

            res.send(result);
        }
        )
    }catch(err){
        console.log(err);
    }
})

app.delete("/delattachment/:attachmentId", function(req, res){

    const attachmentId = req.params.attachmentId;

    try{
        const deleteAttachment = "DELETE FROM project_attachment WHERE project_attachment_id = ?";

        db.query(deleteAttachment, attachmentId, (err, result) => {

            res.send(result);
        }
        )
    }catch(err){
        console.log(err);
    }
})

app.get("/:projectId/attachment", function(req, res){

    const projectId = req.params.projectId;

    try{
        const findProjectAttachment = "SELECT project_attachment.project_attachment_id, project_attachment.project_attachment_url, project_attachment.project_id FROM project_attachment INNER JOIN project ON project_attachment.project_id=project.project_id WHERE project_attachment.project_id = ?;";

        db.query(findProjectAttachment, projectId, (err, result) => {

                res.send(result);
            }
        )
    }
    catch(err){
        console.log(err);
    }
});

app.post("/addcomment", function(req,res) {

    const comment = req.body.comment;
    const userId = req.body.userId;
    const userType = req.body.userType;
    const projectId = req.body.projectId;
    const date = req.body.date;
    const time = req.body.time;
    const day = req.body.day;


    try{

        if(userType === "Lecturer"){
            var addComment = "INSERT INTO project_comment(project_comment_info, project_id, lecturer_id, project_comment_date, project_comment_time, project_comment_day) VALUES (?,?,?,?,?,?);"
        }
        else if(userType === "Representative"){
            var addComment = "INSERT INTO project_comment(project_comment_info, project_id, representative_id, project_comment_date, project_comment_time, project_comment_day) VALUES (?,?,?,?,?,?);"
        }

        db.query(addComment, [comment, projectId, userId, date, time, day], (err, result) => {

            res.send(result);
        })

    }
    catch(err){
        console.log(err);
    }
})

app.get("/:projectId/discussion", function(req, res){

    const projectId = req.params.projectId;

    try{
        const findProjectDiscussion = "SELECT * FROM project_comment LEFT JOIN lecturer ON project_comment.lecturer_id=lecturer.lecturer_id LEFT JOIN company_representative ON project_comment.representative_id=company_representative.representative_id WHERE project_comment.project_id = ? ORDER BY project_comment_id DESC;"

        db.query(findProjectDiscussion, projectId, (err, result) => {

            res.send(result);
        }
        )
    }
    catch(err){
        console.log(err);
    }
});

app.get("/lecturer/:id/representativelist", (req, res) => {

    try{
        const findRepList = "SELECT company_representative.representative_id, company_representative.representative_name, company.company_id, company.company_name FROM company_representative INNER JOIN company ON company_representative.company_id=company.company_id ORDER BY company_name;";

        db.query(findRepList, (err, result) => {

            res.send(result);
        }
        )
    }
    catch(err){
        console.log(err);
    }
});

app.get("/lecturer/:id/companylist", function(req, res){


    try{
        const findCompanyList = "SELECT company.company_id, company.company_name, company.company_email, company.company_contactNo, company.company_preferences, company_category.category_label, company_sector.sector_label FROM company LEFT JOIN company_category ON company.category_id=company_category.category_id LEFT JOIN company_sector ON company.sector_id=company_sector.sector_id ORDER BY company_name;";

        db.query(findCompanyList, (err, result) => {

            res.send(result);
        }
        )
    }
    catch(err){
        console.log(err);
    }
});

app.get("/lecturer/:id/company/:companyId", function(req, res){

    const companyId = req.params.companyId;


    try{
        const findCompany = "SELECT company.company_id, company.company_name, company.company_email, company.company_contactNo, company.company_preferences, company_category.category_label, company_sector.sector_label FROM company LEFT JOIN company_category ON company.category_id=company_category.category_id LEFT JOIN company_sector ON company.sector_id=company_sector.sector_id WHERE company.company_id=?;";

        db.query(findCompany, companyId, (err, result) => {

            res.send({
                companyId: result[0].company_id,
                companyName: result[0].company_name,
                companyEmail: result[0].company_email,
                companyContact: result[0].company_contactNo,
                companyPreferences: result[0].company_preferences,
                companyCategory: result[0].category_label,
                companySector: result[0].sector_label,
            });;
        }
        )
    }
    catch(err){
        console.log(err);
    }
});

app.get("/representative/:id/lecturerlist", function(req, res){


    try{
        const findLecturerList = "SELECT lecturer.lecturer_id, lecturer.lecturer_name, lecturer.lecturer_email, lecturer.lecturer_contactNo, lecturer.lecturer_preferences FROM lecturer WHERE lecturer_status='Active' ORDER BY lecturer_name;"

        db.query(findLecturerList, (err, result) => {

            res.send(result);
        }
        )
    }
    catch(err){
        console.log(err);
    }
});

app.get("/representative/:id/lecturer/:lecturerId", function(req, res){

    const lecturerId = req.params.lecturerId;


    try{
        const findLecturer = "SELECT lecturer.lecturer_id, lecturer.lecturer_name, lecturer.lecturer_email, lecturer.lecturer_contactNo, lecturer.lecturer_preferences FROM lecturer WHERE lecturer_id=?;"

        db.query(findLecturer, lecturerId, (err, result) => {

            res.send({
                lecturerId: result[0].lecturer_id,
                lecturerName: result[0].lecturer_name,
                lecturerEmail: result[0].lecturer_email,
                lecturerContact: result[0].lecturer_contactNo,
                lecturerPreferences: result[0].lecturer_preferences,
            });
        }
        )
    }
    catch(err){
        console.log(err);
    }
});

app.get("/lecturer/:id/companyprojectlist", function(req, res){

    const status = "Available";
    const owner = "Representative";

    try{
        const findCompanyProjectList = "SELECT project.project_id, project.project_title, project.project_information, project_type.project_type_label,project_fieldelective.project_field_label, project.representative_id, company_representative.representative_name FROM project INNER JOIN company_representative ON project.representative_id=company_representative.representative_id INNER JOIN project_type ON project.project_type_id=project_type.project_type_id INNER JOIN project_fieldelective ON project.project_field_id=project_fieldelective.project_field_id WHERE project.project_owner=?";


        db.query(findCompanyProjectList, [owner], (err, result) => {

            res.send(result);
        }
        )
    }
    catch(err){
        console.log(err);
    }
});

app.get("/lecturer/:id/compproject/:id", function(req, res){

    const com_id = req.params.companyId;

    try{
        const findCompProjectList = "SELECT project.project_id, project.project_title, project.project_information, project_type.project_type_label,project_fieldelective.project_field_label, project.representative_id, company_representative.representative_name FROM project INNER JOIN company_representative ON project.representative_id=company_representative.representative_id INNER JOIN project_type ON project.project_type_id=project_type.project_type_id INNER JOIN project_fieldelective ON project.project_field_id=project_fieldelective.project_field_id WHERE project.company_id=?";


        db.query(findCompProjectList, [com_id], (err, result) => {

            res.send(result);
        }
        )
    }
    catch(err){
        console.log(err);
    }
});

app.get("/representative/:id/lecturerprojectlist", function(req, res){

    const status = "Available";
    const owner = "Lecturer";

    try{
        const findLecturerProjectList = "SELECT project.project_id, project.project_title, project.project_information, project_type.project_type_label,project_fieldelective.project_field_label, project.lecturer_id, lecturer.lecturer_name FROM project INNER JOIN lecturer ON project.lecturer_id=lecturer.lecturer_id INNER JOIN project_type ON project.project_type_id=project_type.project_type_id INNER JOIN project_fieldelective ON project.project_field_id=project_fieldelective.project_field_id WHERE project.project_status=? AND project.project_owner=?";


        db.query(findLecturerProjectList, [status, owner], (err, result) => {

            res.send(result);
        }
        )
    }
    catch(err){
        console.log(err);
    }
});

app.post("/addpost", (req,res) => {

    const post = req.body.post;
    const userId = req.body.userId;
    const userType = req.body.userType;
    const date = req.body.date;
    const time = req.body.time;
    const day = req.body.day;

    

    try{

        if(userType === "Lecturer"){
            var addPost = "INSERT INTO news(news_title, date, time, day, lecturer_id) VALUES (?,?,?,?,?);"
        }
        else if(userType === "Representative"){
            var addPost = "INSERT INTO news(news_title, date, time, day, representative_id) VALUES (?,?,?,?,?);"
        }

        db.query(addPost, [post, date, time, day, userId], (err, result) => {

            res.send(result);

        })

    }
    catch(err){
        console.log(err);
    }
})

app.post("/addnewcompany", (req,res) => {

    const name = req.body.companyName;
    const email = req.body.companyEmail;
    const contact = req.body.companyContact;
    const category = req.body.companyCategory;
    const sector = req.body.companySector;
    const pref = req.body.companyPref;


    try{

        const addCompany = "INSERT INTO company(company_name, company_email, company_contactNo, category_id, sector_id, company_preferences) VALUES (?,?,?,?,?,?);"

        for(var prefs in pref){
            prefs = JSON.stringify(pref).replace(/]|[[]|"/g, '', );
        }


        db.query(addCompany, [name, email, contact, category, sector, prefs], (err, result) => {


            res.send(result);

        })

    }
    catch(err){
        console.log(err);
    }
})


app.post("/addpostcomment", (req,res) => {

    const post = req.body.post;
    const userId = req.body.userId;
    const userType = req.body.userType;
    const date = req.body.date;
    const time = req.body.time;
    const day = req.body.day;
    const reply_of = req.body.reply_of;

    try{

        if(userType === "Lecturer"){
            var addPost = "INSERT INTO news(news_title, date, time, day, reply_of, lecturer_id) VALUES (?,?,?,?,?,?);"
        }
        else if(userType === "Representative"){
            var addPost = "INSERT INTO news(news_title, date, time, day, reply_of, representative_id) VALUES (?,?,?,?,?,?);"
        }

        db.query(addPost, [post, date, time, day, reply_of, userId], (err, result) => {

            // console.log(err);
            res.send(result);

        })

    }
    catch(err){
        console.log(err);
    }
})

app.put("/editpostcomment", (req,res) => {

    const post_id = req.body.news_id;
    const userType = req.body.userType;

    try{
        db.query("SELECT * FROM news WHERE news_id=?", post_id, (err, result) => {

            if(result.length > 0){

                if(userType === 'Lecturer'){
                    const newsTitle = req.body.post_title || result[0].news_title;
                    const userId = result[0].lecturer_id;
                    const date = result[0].date;
                    const day = result[0].day;
                    const time = result[0].time;
                    const reply_of = result[0].reply_of;  
                    
                    const updateComment = "UPDATE news SET news_title = ?, lecturer_id = ?, date = ?, day = ?, time = ?, reply_of = ? WHERE news_id = ?;"

                    db.query(updateComment, [newsTitle, userId, date, day, time, reply_of, post_id], (err1, result1) => {


                        if(err1){
                            console.log(err1);           
                        }
                        else{
        
                            res.send(result1);
                        }
                    })

                }
                else{
                    const newsTitle = req.body.post_title;
                    const userId = result[0].representative_id;
                    const date = result[0].date;
                    const day = result[0].day;
                    const time = result[0].time;
                    const reply_of = result[0].reply_of;  
                    
                    const updateComment = "UPDATE news SET news_title = ?, representative_id = ?, date = ?, day = ?, time = ?, reply_of = ? WHERE news_id = ?;"

                    db.query(updateComment, [newsTitle, userId, date, day, time, reply_of, post_id], (err1, result1) => {


                        if(err1){
                            console.log(err1);           
                        }
                        else{
        
                            res.send(result1);
                        }
                    })
                }

            }
                
        })

    }
    catch(err){
        console.log(err);
    }
})


app.post("/adddiscussioncomment", (req,res) => {

    const post = req.body.post;
    const userId = req.body.userId;
    const userType = req.body.userType;
    const date = req.body.date;
    const time = req.body.time;
    const day = req.body.day;
    const reply_of = req.body.reply_of;
    const project_id = req.body.project_id;


    try{

        if(userType === "Lecturer"){
            var addDisComment = "INSERT INTO project_comment(project_comment_info, project_comment_date, project_comment_time, project_comment_day, project_comment_replyof, lecturer_id, project_id) VALUES (?,?,?,?,?,?,?);"
        }
        else if(userType === "Representative"){
            var addDisComment = "INSERT INTO project_comment(project_comment_info, project_comment_date, project_comment_time, project_comment_day, project_comment_replyof, representative_id,project_id) VALUES (?,?,?,?,?,?,?);"
        }

        db.query(addDisComment, [post, date, time, day, reply_of, userId, project_id], (err, result) => {

            // console.log(err);
            res.send(result);

        })

    }
    catch(err){
        console.log(err);
    }
})

app.put("/editprojectcomment", (req,res) => {

    const post_id = req.body.project_comment_id;
    const userType = req.body.userType;

    try{
        db.query("SELECT * FROM project_comment WHERE project_comment_id=?", post_id, (err, result) => {

            if(result.length > 0){

                if(userType === 'Lecturer'){
                    const commentTitle = req.body.comment_title || result[0].project_comment_info;
                    const userId = result[0].lecturer_id;
                    const date = result[0].project_comment_date;
                    const day = result[0].project_comment_day;
                    const time = result[0].project_comment_time;
                    const reply_of = result[0].project_comment_replyof; 
                    const project_id = result[0].project_id; 
                    
                    const updateComment = "UPDATE project_comment SET project_comment_info = ?, lecturer_id = ?, project_comment_date = ?, project_comment_day = ?, project_comment_time = ?, project_comment_replyof = ?, project_id = ? WHERE project_comment_id = ?;"

                    db.query(updateComment, [commentTitle, userId, date, day, time, reply_of, project_id, post_id], (err1, result1) => {


                        if(err1){
                            console.log(err1);           
                        }
                        else{
        
                            res.send(result1);
                        }
                    })

                }
                else{
                    const commentTitle = req.body.comment_title || result[0].project_comment_info;
                    const userId = result[0].representative_id;
                    const date = result[0].project_comment_date;
                    const day = result[0].project_comment_day;
                    const time = result[0].project_comment_time;
                    const reply_of = result[0].project_comment_replyof; 
                    const project_id = result[0].project_id; 
                    
                    const updateComment = "UPDATE project_comment SET project_comment_info = ?, representative_id = ?, project_comment_date = ?, project_comment_day = ?, project_comment_time = ?, project_comment_replyof = ?, project_id = ? WHERE project_comment_id = ?;"

                    db.query(updateComment, [commentTitle, userId, date, day, time, reply_of, project_id, post_id], (err1, result1) => {


                        if(err1){
                            console.log(err1);           
                        }
                        else{
        
                            res.send(result1);
                        }
                    })
                }

            }
                
        })

    }
    catch(err){
        console.log(err);
    }
})

app.get("/news", function(req, res){


    try{
        const findNewsList = "SELECT news.news_id, news.news_title, news.date, news.time, news.day, news.reply_of, lecturer.lecturer_id, lecturer.lecturer_name, company_representative.representative_id, company_representative.representative_name FROM news LEFT JOIN lecturer ON news.lecturer_id=lecturer.lecturer_id LEFT JOIN company_representative ON news.representative_id=company_representative.representative_id ORDER BY news_id DESC;"

        db.query(findNewsList, (err, result) => {

            // console.log(err);

            res.send(result);
        }
        )
    }
    catch(err){
        console.log(err);
    }
});

app.get("/recprojectl", function(req, res){

    const owner = "Representative";
    const status = "Available";

    try{
        const findRecProjectList = "SELECT project.project_id, project.project_title, project.project_information, project.project_status FROM project WHERE project.project_status = ? AND project.project_owner = ?;"

        db.query(findRecProjectList, [status, owner], (err, result) => {


            res.send(result);
        }
        )
    }
    catch(err){
        console.log(err);
    }
});

app.get("/recprojectr", function(req, res){

    const owner = "Lecturer";
    const status = "Available";

    try{
        const findRecProjectList = "SELECT project.project_id, project.project_title, project.project_information, project.project_status FROM project WHERE project.project_status = ? AND project.project_owner = ?;"

        db.query(findRecProjectList, [status, owner], (err, result) => {


            res.send(result);
        }
        )
    }
    catch(err){
        console.log(err);
    }
});

app.get("/projecttotal", function(req, res){

    try{
        const findTot = "SELECT COUNT(project_id) AS project_total FROM project;";

        db.query(findTot, (err, result) => {
            res.send({
                projectTotal: result[0].project_total,
            });
        })
    }
    catch(err){
        console.log(err);
    }
});

app.get("/lecttotal", function(req, res){

    const status = 'Active';

    try{
        const findLectNum = "SELECT COUNT(lecturer_id) AS lecturer_total FROM lecturer WHERE lecturer_status=?;";

        db.query(findLectNum, status, (err, result) => {
            res.send({
                lectTotal: result[0].lecturer_total,
            });
        })
    }
    catch(err){
        console.log(err);
    }
});

app.get("/reptotal", function(req, res){

    const status = 'Active';

    try{
        const findRepNum = "SELECT COUNT(representative_id) AS representative_total FROM company_representative WHERE representative_status=?;";

        db.query(findRepNum, status, (err, result) => {
            res.send({
                repTotal: result[0].representative_total,
            });
        })
    }
    catch(err){
        console.log(err);
    }
});

app.get("/comptotal", function(req, res){

    try{
        const findCompNum = "SELECT COUNT(company_id) AS company_total FROM company;";

        db.query(findCompNum, (err, result) => {
            res.send({
                compTotal: result[0].company_total,
            });
        })
    }
    catch(err){
        console.log(err);
    }
});

app.get("/:id/totalproject1", function(req, res){

    const id = req.params.id;


    try{
        const findTot = "SELECT project_id, COUNT(project_id) AS project_total FROM project WHERE lecturer_id = ?;";

        db.query(findTot, id, (err, result) => {

            res.send({
                projectTotal: result[0].project_total
            });
        })
    }
    catch(err){
        console.log(err);
    }
});

app.get("/:id/totalproject2", function(req, res){

    const id = req.params.id;


    try{
        const findTot = "SELECT project_id, COUNT(project_id) AS project_total FROM project WHERE representative_id = ?;";

        db.query(findTot, id, (err, result) => {

            res.send({
                projectTotal: result[0].project_total
            });
        })
    }
    catch(err){
        console.log(err);
    }
});

app.get("/:id/totalrndlect", function(req, res){

    const id = req.params.id;
    const type = 'RND';


    try{
        const findRnd = "SELECT project_type_id, COUNT(project_type_id) AS rnd_total FROM project WHERE lecturer_id = ? AND project_type_id = ?;"

        db.query(findRnd, [id, type], (err, result) => {

            res.send({
                rndTotal: result[0].rnd_total
            });
        })
    }
    catch(err){
        console.log(err);
    }
});

app.get("/:id/totalrndrep", function(req, res){

    const id = req.params.id;
    const type = 'RND';


    try{
        const findRnd = "SELECT project_type_id, COUNT(project_type_id) AS rnd_total FROM project WHERE representative_id = ? AND project_type_id = ?;"

        db.query(findRnd, [id, type], (err, result) => {

            res.send({
                rndTotal: result[0].rnd_total
            });
        })
    }
    catch(err){
        console.log(err);
    }
});

app.get("/:id/totaltnllect", function(req, res){

    const id = req.params.id;
    const type = 'TNL';


    try{
        const findTnl = "SELECT project_type_id, COUNT(project_type_id) AS tnl_total FROM project WHERE lecturer_id = ? AND project_type_id = ?;"

        db.query(findTnl, [id, type], (err, result) => {

            res.send({
                tnlTotal: result[0].tnl_total
            });
        })
    }
    catch(err){
        console.log(err);
    }
});

app.get("/:id/totaltnlrep", function(req, res){

    const id = req.params.id;
    const type = 'TNL';


    try{
        const findTnl = "SELECT project_type_id, COUNT(project_type_id) AS tnl_total FROM project WHERE representative_id = ? AND project_type_id = ?;"

        db.query(findTnl, [id, type], (err, result) => {

            res.send({
                tnlTotal: result[0].tnl_total
            });
        })
    }
    catch(err){
        console.log(err);
    }
});


app.get("/totalchart1", function(req, res){

    try{
        const findTotChart1 = "SELECT project_type_id, COUNT(project_type_id) AS project_type FROM project GROUP BY project_type_id;";

        db.query(findTotChart1, (err, result) => {
            res.send({
                rndTotal: result[0].project_type,
                tnlTotal: result[1].project_type,

            });
        })
    }
    catch(err){
        console.log(err);
    }
});

app.get("/totalchart2", function(req, res){

    try{
        const findTotChart2 = "SELECT category_id, COUNT(category_id) AS com_category FROM company GROUP BY category_id;";

        db.query(findTotChart2, (err, result) => {
            res.send({
                mncTotal: result[0].com_category,
                smeTotal: result[1].com_category,
                ngoTotal: result[2].com_category,
                glcTotal: result[3].com_category,
                startupTotal: result[4].com_category,
            });
        })
    }
    catch(err){
        console.log(err);
    }
});

//for chat
app.get("/lecturerlist", function(req, res){


    try{
        const findLect = "SELECT lecturer_id, lecturer_name FROM lecturer";

        db.query(findLect, (err, result) => {
            res.send(result);
        })
    }
    catch(err){
        console.log(err);
    }
});

//for chat
app.get("/representativelist", function(req, res){


    try{
        const findRep = "SELECT company_representative.representative_id, company_representative.representative_name, company.company_name FROM company_representative INNER JOIN company ON company_representative.company_id=company.company_id";

        db.query(findRep, (err, result) => {
            res.send(result);
        })
    }
    catch(err){
        console.log(err);
    }
});

app.get("/:id/pendinglect", function(req, res){

    const id = req.params.id;
    const status = "In Progress";

    try{
        const findPending = "SELECT project_activity_id, COUNT(project_activity_id) AS pending_total FROM project_activity INNER JOIN project ON project_activity.project_id=project.project_id WHERE lecturer_id = ? AND project_activity_status = ?;"

        db.query(findPending, [id, status], (err, result) => {

            res.send({
                pendingTotal: result[0].pending_total
            });
        })
    }
    catch(err){
        console.log(err);
    }
});

app.get("/:id/pendingrep", function(req, res){

    const id = req.params.id;
    const status = "In Progress";

    try{
        const findPending = "SELECT project_activity_id, COUNT(project_activity_id) AS pending_total FROM project_activity INNER JOIN project ON project_activity.project_id=project.project_id WHERE representative_id = ? AND project_activity_status = ?;"

        db.query(findPending, [id, status], (err, result) => {

            res.send({
                pendingTotal: result[0].pending_total
            });
        })
    }
    catch(err){
        console.log(err);
    }
});

server.listen(3001, () => {
    console.log("running on port 3001");
})