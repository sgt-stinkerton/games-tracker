import {Button} from "react-bootstrap";

export default function SetTodayDate({ handleInput }) {
  const setToday = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
    const dd = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${yyyy}-${mm}-${dd}`;

    // creates fake event to update parent state
    handleInput({ target: { name: "finishDate", value: formattedDate }});
  };

  return (
    <Button variant="primary" onClick={setToday} className="ms-1 px-2 py-1">
      Set Today
    </Button>
  )
}