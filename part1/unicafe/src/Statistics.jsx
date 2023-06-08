import StatisticLine from "./StatisticLine"


export default ({good,bad,neutral}) => {
  const all = good + neutral + bad
  const average = all === 0 ? 0 : ((good - bad)/all).toFixed(2)
  const positive = all === 0 ? 0 : (good / all * 100).toFixed(2)

    return(
        <>
        {
        all === 0 ? 
        <p><strong>No feedback given</strong></p>
        :
        <table>
        <tr>
            <td>Name</td><td>Value</td>
        </tr>
        <tr>
            <td>Number of total feedbacks</td><td>{all}</td>
        </tr>
        <tr>
            <td>Average</td><td>{average}</td>
        </tr>
        <tr>
            <td>Positive</td><td>{positive + ' %'}</td>
        </tr>
        </table>
        }
        </>
    )
}