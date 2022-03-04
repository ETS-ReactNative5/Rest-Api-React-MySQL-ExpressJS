import { Link, } from "react-router-dom";
import { Formik, ErrorMessage } from "formik";
import { Form } from 'react-bootstrap'
import FormEditTeam from './FormEditTeam';
import './Teams.css';

const EditTeam = ({ submitForm }) => {
    const { initialValues, validationSchema, onSubmit } = FormEditTeam(submitForm)

    return (
        <div className="createTeamPage">
            <Formik
                enableReinitialize
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
                                autocomplete="off"
                                id="inputCreateTeam"
                                name="team_name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.team_name}
                                isInvalid={!!errors.team_name}
                            />
                            <button type="submit">Edit</button>
                            <Link to={'/teams'} className='edit'>Cancel</Link>
                        </Form.Group>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default EditTeam