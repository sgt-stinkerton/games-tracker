import {Form} from "react-bootstrap";

// TODO whole page

import SteamLoginButton from "../components/SteamLoginButton.jsx";
import CommonPageHeader from "../components/common/CommonPageHeader.jsx";
import {useTheme} from "../ThemeProvider.jsx";

export default function Profile ({  }) {
  const { theme, changeTheme } = useTheme();

  return (<>
    <CommonPageHeader
      title="Profile Settings"
    />

    <ul>
      <li>dis/connect steam account</li>
      <SteamLoginButton currentUserId={1} />
      <li>change display name</li>
      <li>light mode/dark mode</li>
      <div className="d-flex align-items-center gap-2">
        <span className="small fw-bold">Theme:</span>
        <Form.Select
          size="sm"
          value={theme}
          onChange={(e) => changeTheme(e.target.value)}
          style={{ width: "auto" }}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="cute">Cute</option>
        </Form.Select>
      </div>
    </ul>
  </>)
}