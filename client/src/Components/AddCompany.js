import React, { useState, useContext, useEffect} from 'react'
import { Form, InputGroup, Button, Card, Image } from 'react-bootstrap'
import user from './../assets/user.png'
import { useHistory } from 'react-router-dom'
import Axios from 'axios'
import { UserContext, UserTypeContext } from '../Helper/Context';
import './Profile.css';
import { Checkbox, Row as RowAntd, Col  as ColAntd} from 'antd';

function AddCompany() {

    const history = useHistory();

    const {userId, setUserId} = useContext(UserContext);
    const {type, isUserType} = useContext(UserTypeContext);

    const [companyName, setCompanyName] = useState("");
    const [companyEmail, setCompanyEmail] = useState("");
    const [companyContact, setCompanyContact] = useState("");
    // const [companyPref, setCompanyPref] = useState("");
    const [companyCategory, setCompanyCategory] = useState("");
    const [companySector, setCompanySector] = useState("");

    const [pref, setPref] = useState([]);

    function onChange(checkedValues) {
        // console.log('checked = ', checkedValues);
        setPref(checkedValues);
    }


    const addNewCompany = (e) => {

        e.preventDefault();

        // console.log(companyName, companyEmail, companyContact, companyCategory, companySector, pref);

        Axios.post("http://localhost:3001/addnewcompany",{
            companyName: companyName,
            companyEmail: companyEmail,
            companyContact: companyContact,
            companyCategory: companyCategory,
            companySector: companySector,
            companyPref: pref,
        })
        .then((res) => {


            if(res){
                window.alert("Successfully added new company!");
                // history.push(`/lecturer/${userId}/viewproject/${projectId}`)
                history.push(`/admin/${userId}/companylist`);
            }
            else{
                window.alert("Try again!");
            }
        })};

        const backToCompany = (e) => {
            history.push(`/admin/${userId}/companylist`)
        }

  return (
    <div>
        <div className="d-flex justify-content-center">
            <Card style={{ width: '70%' }}>
            <Form onSubmit = {addNewCompany} className = "m-3 p-5" >
            <h3>Add Company</h3>

            <hr/>
            
            <Form.Group className="mb-3" controlId="companyName">
            <Form.Label>Company Name</Form.Label>
              <Form.Control type="text" placeholder="Enter company name here"  
                  onChange = {(event) => {
                    setCompanyName(event.target.value);
                  }}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="companyName">
            <Form.Label>Company Email</Form.Label>
              <Form.Control type="email" placeholder="Enter company email here"  
                  onChange = {(event) => {
                    setCompanyEmail(event.target.value);
                  }}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="companyContact">
            <Form.Label>Company Contact</Form.Label>
              <Form.Control type="text" placeholder="Enter company contact here"  
                  onChange = {(event) => {
                    setCompanyContact(event.target.value);
                  }}
                />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="companyCategory">
                    <Form.Label>Company Category</Form.Label>
                    <Form.Control as="select" 
                    onChange = {(event) => {
                        setCompanyCategory(event.target.value);
                    }}
                >
                   
                    <option className = "text-muted">Select company category here...</option>
                    <option value="CAT001">Multinational Corporation (MNC)</option>
                    <option value="CAT002">Small and medium-sized enterprise (SME)</option>
                    <option value="CAT003">Non-governmental Organization (NGO)</option>
                    <option value="CAT004">Government Linked Companies (GLC)</option>
                    <option value="CAT005">Startup</option>
                </Form.Control>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="projectField">
                    <Form.Label>Company Sector</Form.Label>
                    <Form.Control as="select" 
                    onChange = {(event) => {
                        setCompanySector(event.target.value);
                    }}
                >
                    <option className = "text-muted">Select company sector here...</option>
                    <option value="SEC001">Construction</option>
                    <option value="SEC002">Energy</option>
                    <option value="SEC003">Financial Services</option>
                    <option value="SEC004">Industrial Products and Services</option>
                    <option value="SEC005">Information Technology</option>
                    <option value="SEC006">Telecommunications and Media</option>
                    <option value="SEC007">Transportation and Logistics</option>
                    <option value="SEC008">Others</option>
                </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="userPreferences">
                    <Form.Label className="fw-bold">Preferences (Tick any below)</Form.Label>

            <Checkbox.Group onChange={onChange}>
            <div style={{display: 'block', paddingRight: '0', marginBottom:'5px'}}>
                                        <Checkbox style={{marginRight: '15px'}} value="Artificial Intelligence">Artificial Intelligence</Checkbox>
                                    
                                        <Checkbox style={{marginRight: '15px'}} value="Machine Learning">Machine Learning</Checkbox>
                                    
                                        <Checkbox style={{marginRight: '15px'}} value="Data Mining">Data Mining</Checkbox>
                                        </div>
                                        <div style={{display: 'block', paddingRight: '0', marginBottom:'5px'}}>
                                   
                                        <Checkbox style={{marginRight: '15px'}} value="Multimedia System">Multimedia System</Checkbox>
                                    
                                        <Checkbox style={{marginRight: '15px'}} value="Computer Graphics">Computer Graphics</Checkbox>
                                    
                                        <Checkbox style={{marginRight: '15px'}} value="Visual Processing">Visual Processing</Checkbox>
                                        </div>
                                        <div style={{display: 'block', paddingRight: '0', marginBottom:'5px'}}>
                                        <Checkbox style={{marginRight: '15px'}} value="Networking">Networking</Checkbox>
                                   
                                        <Checkbox style={{marginRight: '15px'}} value="Cloud Computing">Cloud Computing</Checkbox>
                                   
                                        <Checkbox style={{marginRight: '15px'}} value="Internet of Things">Internet of Things</Checkbox>
                                        </div>
                                        <div style={{display: 'block', paddingRight: '0', marginBottom:'5px'}}>
                                        <Checkbox style={{marginRight: '15px'}} value="Cybersecurity">Cybersecurity</Checkbox>
                                    
                                        <Checkbox style={{marginRight: '15px'}} value="Forensics">Forensics</Checkbox>
                                    
                                        <Checkbox style={{marginRight: '15px'}} value="Cryptography">Cryptography</Checkbox>
                                        </div>
                                        <div style={{display: 'block', paddingRight: '0', marginBottom:'5px'}}>
                                        <Checkbox style={{marginRight: '15px'}} value="Database">Database</Checkbox>
                                   
                                        <Checkbox style={{marginRight: '15px'}} value="Enterprise Architecture">Enterprise Architecture</Checkbox>
                                   
                                        <Checkbox style={{marginRight: '15px'}} value="Information Systems">Information Systems</Checkbox>
                                        </div>
                                        <div style={{display: 'block', paddingRight: '0', marginBottom:'5px'}}>
                                        <Checkbox style={{marginRight: '15px'}} value="Software Development">Software Development</Checkbox>
                                    
                                        <Checkbox style={{marginRight: '15px'}} value="Web Development">Web Development</Checkbox>
                                    
                                        <Checkbox style={{marginRight: '15px'}} value="Mobile and Game Development">Mobile and Game Development</Checkbox>
                                        </div>
                                   
                            </Checkbox.Group>
            </Form.Group>


            <div className = "d-flex flex-end  justify-content-end align-items-end mt-3">
            <Button style={{color:'white', backgroundColor:'#104271'}} className = "d-flex flex-end justify-content-end align-items-end mx-3" type="submit" onClick = {backToCompany}>Cancel</Button>
            <Button style={{color:'white', backgroundColor:'#104271'}} className = "d-flex flex-end justify-content-end align-items-end" variant="primary" type="submit">
                Add
            </Button>
            
          </div>

          </Form>
          </Card>
        </div>
    </div>
  )
}

export default AddCompany