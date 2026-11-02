export default function Pipeline({ steps, label = 'Project workflow' }) {
  return (
    <ol className="pipeline" aria-label={label}>
      {steps.map((step) => <li key={step}><span>{step}</span></li>)}
    </ol>
  );
}
