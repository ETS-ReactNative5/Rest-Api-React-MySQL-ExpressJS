import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';

const useFormAddResult = () => {
    const BASE_URL = process.env.REACT_APP_URL

    const [teamHost, setTeamHost] = useState([]);
    const [teamGuest, setTeamGuest] = useState([]);
    const [teams, setTeams] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate();

    useEffect(async () => {
        try {
            const response = await fetch(`${BASE_URL}/teams`)
            return response.json()
                .then(data => {
                    setTeams(data)
                    const teams = data.map(team => team.team_name).flat();
                    setTeamHost(teams)
                    setTeamGuest(teams)
                    setError(null)
                    setIsLoading(false)
                })
        } catch (error) {
            setError(error)
            setIsLoading(false)
        }
    }, [BASE_URL]);

    const initialValues = {
        host_name: "",
        guest_name: "",
        home_goals: "",
        away_goals: "",
        date: "",
        venue: "",
    };

    const validationSchema = Yup.object().shape({
        host_name: Yup.string().required("Host field is required!").oneOf(teamHost, 'No such host!'),
        guest_name: Yup.string().required("Guest field is required!").oneOf(teamGuest, 'No such guest!')
            .when('host_name', (host_name, schema) => {
                return schema.test({
                    test: guest_name => guest_name !== host_name,
                    message: 'One team cannot play against each other!'
                })
            }),
        home_goals: Yup.number("Goals is a number value!").required("Home Goals are required!").min(0, "Result cannot be negative!").max(50, "Invalid result!"),
        away_goals: Yup.number("Goals is a number value!").required("Away Goals are required!").min(0, "Result cannot be negative!").max(50, "Invalid result!"),
        date: Yup.date().required("Date is required!"),
        venue: Yup.string().required("Venue is required!").min(3, "Venue must be atlease 3 characters!").max(20, "Venue name too long!"),
    });

    const onSubmit = (data) => {
        data.host_id = teams.find(team => team.team_name === data.host_name).id
        data.guest_id = teams.find(team => team.team_name === data.guest_name).id
        fetch(`${BASE_URL}/results`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then(() => {
            navigate('/results')
        })
    }
    return { initialValues, teamHost, teamGuest, error, isLoading, validationSchema, onSubmit }
}

export default useFormAddResult