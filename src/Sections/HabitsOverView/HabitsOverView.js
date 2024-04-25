import "./HabitsOverView.css"
import { CurrentDay } from "../../Components/index"
const HabitsOverView = () => {


  return (
    <div className="HabitsOverView">
        <div className="Title">
             <div className="CheckMarkLogo"></div>
             <h2>Habits Overview</h2>
        </div>

        <div className="CurrentDays">
            <CurrentDay text={"All"} />
            <CurrentDay text={"Today"} />
            <CurrentDay text={"This Week"} />
            <CurrentDay text={"This Month"} />
        </div>

    </div>
  )
}

export default HabitsOverView