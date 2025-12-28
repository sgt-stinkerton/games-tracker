export default function FormAlert({ error, defaultText=<>&nbsp;</> }) {
  return (
    <div className="align-self-center">
      <p className={`m-0 text-center ${error ? "visible text-danger" : "text-muted"}`}>
        {error || defaultText}
      </p>
    </div>
  )
}