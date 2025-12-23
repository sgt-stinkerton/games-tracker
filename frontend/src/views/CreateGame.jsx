import {useEffect, useState} from "react";

import CommonPageHeader from "../components/CommonPageHeader.jsx";
import MainCreateForm from "../components/create_game_components/MainCreateForm.jsx";

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

    <MainCreateForm setSuccess={setSuccess} />
  </>);
}