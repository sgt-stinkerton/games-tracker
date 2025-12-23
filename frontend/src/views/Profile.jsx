// TODO whole page

import SteamLoginButton from "../components/SteamLoginButton.jsx";
import CommonPageHeader from "../components/CommonPageHeader.jsx";

export default function Profile ({  }) {

  return (<>
    <CommonPageHeader
      title="Profile Settings"
    />

    <ul>
      <li>dis/connect steam account</li>
      <SteamLoginButton currentUserId={1} />
      <li>change display name</li>
      <li>light mode/dark mode</li>
    </ul>
  </>)
}