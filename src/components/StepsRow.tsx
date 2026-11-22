import { processSteps } from '../data/content'

export default function StepsRow() {
  return (
    <ol className="steps-row">
      {processSteps.map(step => (
        <li key={step.number}>
          <span className="steps-num">{step.number}</span>
          <h3>{step.title}</h3>
          <p>{step.text}</p>
        </li>
      ))}
    </ol>
  )
}
