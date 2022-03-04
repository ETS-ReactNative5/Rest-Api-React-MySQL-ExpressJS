let host_id = [1,1,3,5,10]
let guest_id = [3,10,1,3,1]
let home_goals = [2,0,3,2,1]
let away_goals = [1,2,3,4,0]

const teamId =[1,3, 5, 10]
let maxNum = Math.max(...teamId)
let wins = 0;
let draws = 0;
let lost = 0;

for (let n = 0; n < maxNum; n++) {
    for (let i = 0; i < home_goals.length; i++) {
        if (teamId[n] === host_id[i]) {
            if (home_goals[i] > away_goals[i]) {
                wins += 1;
            }
            else if (home_goals[i] < away_goals[i]) {
                lost += 1;
            }
            else if (home_goals[i] === away_goals[i]) {
                draws += 1;
            }
        }
        else if (teamId[n] === guest_id[i]) {
            if (home_goals[i] > away_goals[i]) {
                lost += 1;
            }
            else if (home_goals[i] < away_goals[i]) {
                wins += 1;
            }
            else if (home_goals[i] === away_goals[i]) {
                draws += 1;
            }
        }
        console.log(home_goals[i], teamId[n], teamId.length)
    }
}
