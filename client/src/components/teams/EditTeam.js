import { Link, } from "react-router-dom";
import { Formik, ErrorMessage } from "formik";
import { Form, Spinner } from 'react-bootstrap'
import useFormEditTeam from './useFormEditTeam';
import './Teams.css';

const EditTeam = (submitForm) => {
    const { initialValues, validationSchema, error, isLoading, onSubmit } = useFormEditTeam(submitForm)

    if (isLoading) {
        return (<Spinner animation="border" variant="primary" />)
    }
    if (error) {
        return <div>There was an error: {error}</div>
    }

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