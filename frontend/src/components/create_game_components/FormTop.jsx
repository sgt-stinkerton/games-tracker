import {CheckCircle, Clipboard, Controller, JournalText,
  QuestionCircle, Star, Tags, XCircle} from "react-bootstrap-icons";

export default function FormTop ({ title, iconName }) {

  const getIcon = (iconName) => {
    switch (iconName) {
      case "Controller": return <Controller size={45} />
      case "Tags": return <Tags size={45} />
      case "Clipboard": return <Clipboard size={45} />
      case "Star": return <Star size={45} />
      case "JournalText": return <JournalText size={45} />
      case "QuestionCircle": return <QuestionCircle size={45} />
      case "CheckCircle": return <CheckCircle size={45} />
      default: return <XCircle size={45} />
    }
  }

  return (
    <div className="d-flex flex-column align-items-center">
      <div
        className="bg-primary-subtle text-primary"
        style={{ marginTop: "-40px", marginBottom: "10px", borderRadius: "50%", padding: "12px" }}
      >
        {getIcon(iconName)}
      </div>
      <h4 className="mt-0">{title}</h4>
    </div>
  )
}