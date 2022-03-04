import { Link } from 'react-router-dom';
import { Formik, ErrorMessage } from "formik";
import './Teams.css';
import { Form } from 'react-bootstrap'
import FormAddTeam from './FormAddTeam';

const AddTeam = ({ submitForm }) => {
    const { initialValues, validationSchema, onSubmit } = FormAddTeam(submitForm)

    return (
        <div className="createTeamPage">
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {({ values, errors, handleBlur, handleChange, handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="formContainer" md="4">
                            <Form.Label>Team Name:</Form.Label>
                            <ErrorMessage name="team_name" component="span" />
                            <Form.Control
                                type="text"
                                autocomplete="off"
                                id="inputCreateTeam"
                                name="team_name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.team_name}
                                isInvalid={!!errors.team_name}
                            />
                            <button type="submit">Create Team</button>
                            <Link to={'/teams'} className='edit'>Cancel</Link>
                        </Form.Group>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default AddTeam