import {useEffect, useState} from "react";

import CommonPageHeader from "../components/CommonPageHeader.jsx";
import MultiPartGameForm from "../components/MultiPartGameForm.jsx";

export default function CreateGame({ setShowToast, setToastMsg }) {
  const [success, setSuccess] = useState(null);

  // happy toast
  useEffect(() => {
    if (success === true) {
      setToastMsg("Game Added Successfully")
      setShowToast(true);
    }
  }, [success])

  return (<>
    <CommonPageHeader
      title="Add Game"
      sideInfo="Manually add game data. It is recommended to sync Steam game data first."
    />

    <MultiPartGameForm setSuccess={setSuccess} />
  </>);
}