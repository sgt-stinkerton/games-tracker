import {useEffect, useState} from "react";

import CommonPageHeader from "../components/common/CommonPageHeader.jsx";
import MainCreateForm from "../components/create_components/MainCreateForm.jsx";

export default function CreateGame({ }) {
  return (<>
    <CommonPageHeader
      title="Add Game"
      sideInfo="Manually add game data. It is recommended to sync Steam game data first."
    />

    <MainCreateForm />
  </>);
}