const bodyParser = require("body-parser");
const express = require("express")
const app = express()
const mysql = require('mysql')
const cors = require("cors")
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');


const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "universitypartnership",
    multipleStatements:true,
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname));

var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null,  path.join(__dirname, './../client/public/images'))
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

    // const hashedPassword = await bcrypt.hash(userPassword, 10);

    if(userType === "lecturer"){
        var sqlInsert = "INSERT INTO lecturer (lecturer_email, lecturer_password, lecturer_name, lecturer_contactNo, lecturer_status) VALUES (?,?,?,?,?)";
    }
    else{
        var sqlInsert = "INSERT INTO company_representative (representative_email, representative_password, representative_name, representative_contactNo, representative_status) VALUES (?,?,?,?,?)";
    }

    db.query(sqlInsert, [userEmail, userPassword, userFullName, userContact, userStatus], (err, result) => {

        // console.log(result);
        res.json({
            checkUser: true,
        })
    })
})

//sign in
app.post("/signin", function(req,res) {

    const email = req.body.userEmail;
    const password = req.body.userPassword;
    const status = "Active";
    let isAuthorized = false;
    let id = 0;

    try{
        const signIn = "SELECT admin_id FROM admin WHERE (admin_email = ? AND admin_password = ?);"

        // const signIn = "(SELECT admin_id, user_type FROM admin WHERE (admin_email = ? AND admin_password = ?)) UNION ALL (SELECT lecturer_id, user_type FROM lecturer WHERE (lecturer_email = ? AND lecturer_password = ?)) UNION ALL (SELECT representative_id, user_type FROM company_representative WHERE (representative_email = ? AND representative_password = ?))";

        db.query(signIn, [email, password], (err, result) => {

            if(result.length < 1){
                const signIn1 = "SELECT lecturer_id FROM lecturer WHERE (lecturer_email = ? AND lecturer_password = ?);"
                db.query(signIn1, [email, password], (err1, result1) => {
                    if(result1.length < 1){
                        const signIn2 = "SELECT representative_id FROM company_representative WHERE (representative_email = ? AND representative_password = ?);"

                        db.query(signIn2, [email, password], (err2, result2) => {

                        if(result2.length < 1){
                            res.json({
                                isAuthorized: false,
                            })
                        }
                        else{
                            res.json({
                                isAuthorized: true,
                                id: result2[0].representative_id,
                                type: "Representative",
                            })
                        }
                        })
                    }
                    else{
                        res.json({
                            isAuthorized: true,
                            id: result1[0].lecturer_id,
                            type: "Lecturer",
                        })
                    }

                })
            }
            else{
                res.json({
                    isAuthorized: true,
                    id: result[0].admin_id,
                    type: "Admin",
                })
            }
            
        })

    }
    catch(err){
        console.log(err);
    }
})

app.get("/lectprofile/:id", function(req, res){

    const id = req.params.id;

    try{
        const findLecturer = "SELECT lecturer_id, lecturer_email, lecturer_name FROM lecturer WHERE lecturer_id = ?";

        db.query(findLecturer, id, (err, result) => {
            res.send({
                id: result[0].lecturer_id,
                email: result[0].lecturer_email,
                name: result[0].lecturer_name,
            })
        }
        )
    }
    catch(err){
        console.log(err);
    }
});

app.get("/type", function(req, res){
    const type = "SELECT * FROM project_type;"

    db.query(type, (err, result) => {
        res.send(result);
    }
    )


})

app.post("/addnewprojectl", function(req,res) {

    const id = req.body.userId;
    const title = req.body.projectTitle;
    const information = req.body.projectInformation;
    const status = req.body.projectStatus;
    const type = req.body.projectType;
    const field = req.body.projectField;
    const owner = req.body.projectOwner;
    let addSuccess = false;


    try{
        const addProjectLect = "INSERT INTO project(project_title, project_information, project_status, project_type_id, project_field_id, lecturer_id, project_owner) VALUES (?,?,?,?,?,?,?);"

        db.query(addProjectLect, [title, information, status, type, field, id, owner], (err, result) => {

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

app.get("/lectproject/:id", function(req, res){

    const id = req.params.id;

    try{
        const findLectProject = "SELECT lecturer.lecturer_id, lecturer.lecturer_name, project.project_id, project.project_title, project.project_information, project_type.project_type_label, project_fieldelective.project_field_label FROM lecturer INNER JOIN project ON lecturer.lecturer_id = project.lecturer_id INNER JOIN project_type ON project.project_type_id = project_type.project_type_id INNER JOIN project_fieldelective ON project.project_field_id = project_fieldelective.project_field_id WHERE lecturer.lecturer_id = ? LIMIT 3;";

        db.query(findLectProject, id, (err, result) => {
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
        const findLectActivity = "SELECT project_activity.project_activity_title, project.project_id FROM project INNER JOIN project_activity ON project.project_id=project_activity.project_id WHERE project.lecturer_id=? ORDER BY project_activity_id DESC LIMIT 3;;";

        db.query(findLectActivity, id, (err, result) => {
            res.send(result);
        }
        )
    }
    catch(err){
        console.log(err);
    }
});

app.get("/lecturer/:userId/viewproject/:projectId", function(req, res){

    // const userId = req.params.userId;
    const projectId = req.params.projectId;

    try{
        const findProject = "SELECT * FROM project INNER JOIN project_type ON project.project_type_id=project_type.project_type_id INNER JOIN project_fieldelective ON project.project_field_id=project_fieldelective.project_field_id LEFT JOIN lecturer ON project.lecturer_id=lecturer.lecturer_id LEFT JOIN company_representative ON project.representative_id=company_representative.representative_id WHERE project.project_id = ?";

        db.query(findProject, projectId, (err, result) => {
            // console.log(result[0].lecturer_name);
            res.send({
                projectId: result[0].project_id,
                projectTitle: result[0].project_title,
                projectInformation: result[0].project_information,
                projectStatus: result[0].project_status,
                projectType: result[0].project_type_label,
                projectField: result[0].project_field_label,
                projectOwner: result[0].project_owner,
                lecturerId: result[0].lecturer_id,
                lecturerName: result[0].lecturer_name,
                representativeId: result[0].representative_id,
                representativeName: result[0].representative_name,
            });
        }
        )
    }
    catch(err){
        console.log(err);
    }
});

app.post("/addactivityl", function(req,res) {

    const title = req.body.activityTitle;
    const information = req.body.activityInformation;
    const startDate = req.body.activityStartDate;
    const endDate = req.body.activityEndDate;
    const projectId = req.body.projectId;

    try{
        const addActivityLect = "INSERT INTO project_activity (project_activity_title, project_activity_information, project_activity_startdate, project_activity_enddate, project_id) VALUES (?,?,?,?,?);"

        db.query(addActivityLect, [title, information, startDate, endDate, projectId], (err, result) => {

            res.send(result);
            
        })

    }
    catch(err){
        console.log(err);
    }
})

app.post("/addattachmentl", upload.single('image'), (req,res) => {

    if(!req.file){
        console.log("No file upload");
    }
    else{
        // console.log(req.file.filename);
        var imgsrc = 'htpp://127.0.0.1:3000/images/' + req.file.filename;
        var id = req.body.projectId;
        var insertImage = "INSERT INTO project_attachment(project_attachment_url, project_id) VALUES (?, ?);"

        db.query(insertImage, [imgsrc, id], (err, result) => {
            if(err) throw err
            res.send(result);
            // console.log("File uploaded");
        })
    }
})

app.get("/:projectId/activity", function(req, res){

    const projectId = req.params.projectId;
    // console.log(projectId);

    try{
        const findProjectActivity = "SELECT project_activity.project_activity_title, project_activity.project_activity_information, project_activity.project_activity_startdate, project_activity.project_activity_enddate FROM project_activity INNER JOIN project ON project_activity.project_id=project.project_id WHERE project_activity.project_id = ?;";

        db.query(findProjectActivity, projectId, (err, result) => {

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

    // console.log(userType);

    try{

        if(userType === "Lecturer"){
            var addComment = "INSERT INTO project_comment(project_comment_info, project_id, lecturer_id) VALUES (?,?,?);"
        }
        else if(userType === "Representative"){
            var addComment = "INSERT INTO project_comment(project_comment_info, project_id, representative_id) VALUES (?,?,?);"
        }

        db.query(addComment, [comment, projectId, userId], (err, result) => {

            // console.log(result);
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
        const findProjectDiscussion = "SELECT project_comment.project_comment_id, project_comment.project_comment_info, project_comment.project_id, lecturer.lecturer_name, company_representative.representative_name FROM project_comment INNER JOIN project ON project_comment.project_id=project.project_id LEFT JOIN lecturer ON project.lecturer_id=lecturer.lecturer_id LEFT JOIN company_representative ON project.representative_id=company_representative.representative_id WHERE project_comment.project_id = ?;";

        db.query(findProjectDiscussion, projectId, (err, result) => {

            res.send(result);
        }
        )
    }
    catch(err){
        console.log(err);
    }
});

app.get("/lecturer/:id/companylist", function(req, res){

    // const id = req.params.id;
    // console.log(projectId);

    try{
        const findCompanyList = "SELECT company.company_id, company.company_name, company.company_email, company.company_contactNo, company.company_preferences, company_category.category_label, company_sector.sector_label FROM company LEFT JOIN company_category ON company.category_id=company_category.category_id LEFT JOIN company_sector ON company.sector_id=company_sector.sector_id;";

        db.query(findCompanyList, (err, result) => {

            res.send(result);
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
        const findCompanyProjectList = "SELECT project.project_id, project.project_title, project.project_information, project_type.project_type_label,project_fieldelective.project_field_label, project.representative_id, company_representative.representative_name FROM project INNER JOIN company_representative ON project.representative_id=company_representative.representative_id INNER JOIN project_type ON project.project_type_id=project_type.project_type_id INNER JOIN project_fieldelective ON project.project_field_id=project_fieldelective.project_field_id WHERE project.project_status=? AND project.project_owner=?";

        // const findCompanyProjectList = "SELECT lecturer.lecturer_id, lecturer.lecturer_name, project.project_id, project.project_title, project.project_information, project_type.project_type_label,project_fieldelective.project_field_label FROM project INNER JOIN lecturer ON project.lecturer_id=lecturer.lecturer_id INNER JOIN project_type ON project.project_type_id=project_type.project_type_id INNER JOIN project_fieldelective ON project.project_field_id=project_fieldelective.project_field_id WHERE project.project_status=? AND project.project_owner=?";

        db.query(findCompanyProjectList, [status, owner], (err, result) => {

            res.send(result);
        }
        )
    }
    catch(err){
        console.log(err);
    }
});

app.listen(3001, () => {
    console.log("running on port 3001");
})