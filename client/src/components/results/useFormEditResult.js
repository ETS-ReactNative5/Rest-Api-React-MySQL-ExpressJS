import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from 'yup';

const useFormEditResult = () => {
    const BASE_URL = process.env.REACT_APP_URL

    const [hostName, setHostName] = useState([]);
    const [guestName, setGuestName] = useState([]);
    const [teams, setTeams] = useState([]);

    const [host_id, setHost_id] = useState([]);
    const [guest_id, setGuest_id] = useState([]);
    const [home_goals, setHomeGoals] = useState([]);
    const [away_goals, setAwayGoals] = useState([]);
    const [date, setDate] = useState([]);
    const [venue, setVenue] = useState([])
    const { id } = useParams();
    const navigate = useNavigate();

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getTeams();
        getResultValues();
    }, [BASE_URL]);

    const getTeams = async () => {
        try {
            const response = await fetch(`${BASE_URL}/teams`)
            return response.json()
                .then(data => {
                    setTeams(data)
                    const teamName = data.map(team => team.team_name).flat();
                    setHostName(teamName)
                    setGuestName(teamName)
                    setError(null)
                    setIsLoading(false)
                })
        } catch (error) {
            setError(error)
            setIsLoading(false)
        }
    }

    const getResultValues = async () => {
        try {
            const response = await fetch(`${BASE_URL}/results/${id}`,)
            return response.json()
                .then(data => {
                    setHost_id(data.host_id)
                    setGuest_id(data.guest_id)
                    setHomeGoals(data.home_goals)
                    setAwayGoals(data.away_goals)
                    setDate(data.date)
                    setVenue(data.venue)
                    setError(null)
                    setIsLoading(false)
                })
        } catch (error) {
            setError(error)
        }
    }

    const host = teams.filter(team => team.id === host_id)
    const nameHost = host.map(team => team.team_name).toString()
    const guest = teams.filter(team => team.id === guest_id)
    const nameGuest = guest.map(team => team.team_name).toString()

    const initialValues = {
        host_name: nameHost,
        guest_name: nameGuest,
        home_goals: home_goals,
        away_goals: away_goals,
        date: date,
        venue: venue,
    };

    const validationSchema = Yup.object().shape({
        host_name: Yup.string().oneOf(hostName, 'No such host with this Id!'),
        guest_name: Yup.string().oneOf(guestName, 'No such guest with this Id!').notOneOf(["Select a Guest"])
            .when('host_name', (host_name, schema) => {
                return schema.test({
                    test: guest_name => guest_name !== host_name,
                    message: 'One team cannot play against each other!'
                })
            }),
        home_goals: Yup.number("Goals is a number value!").min(0, "Result cannot be negative!").max(50, "Invalid result!"),
        away_goals: Yup.number("Goals is a number value!").min(0, "Result cannot be negative!").max(50, "Invalid result!"),
        date: Yup.date().required("Date is required!"),
        venue: Yup.string().min(3, "Venue must be atlease 3 characters!").max(20, "Venue name too long!")
    });

    const onSubmit = (data) => {
        data.host_id = teams.find(team => team.team_name === data.host_name).id
        data.guest_id = teams.find(team => team.team_name === data.guest_name).id

        fetch(`${BASE_URL}/results/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then(() => {
            navigate('/results')
        })
    }
    return { initialValues, validationSchema, hostName, guestName, error, isLoading, onSubmit}
}

export default useFormEditResult