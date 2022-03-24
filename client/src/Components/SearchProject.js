import React, {useState} from 'react'
import {Form, Button, Row, Col} from 'react-bootstrap'
import './SearchProject.css'

function SearchProject(props) {

    const [companyProjectList, setCompanyProjectList] = useState([]);
    const [projectName, setProjectName] = useState("");

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setProjectName(searchWord);
        const newFilter = (props.projectList).filter((value) => {
          return (value.project_title).toLowerCase().includes(searchWord.toLowerCase());
        });

        // console.log(newFilter);
    
        if (searchWord === "") {
          setCompanyProjectList([]);
          props.filteredList(companyProjectList);

        } else {
          setCompanyProjectList(newFilter);
          props.filteredList(companyProjectList);
        }
      };

      


  return (
    <div className = "search mb-5">
        <div className = "searchInput">
        <Form>
            <Row>
                <Col>
                <Form.Group className="mb-3" controlId="projectTitle">
                    <Form.Control type="text" placeholder="Enter project title here..."  
                        value={projectName}
                        onChange={handleFilter}
                    />
                </Form.Group>
                </Col>
                <Col>
                {/* <div className = "d-flex">
                    <Button type="submit">Search</Button>
                </div> */}
                </Col>
            </Row>
            </Form>
        </div>
    </div>
  )
}

export default SearchProject