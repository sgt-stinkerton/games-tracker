// TODO whole page

import CommonPageHeader from "../components/common/CommonPageHeader.jsx";

export default function Home ({  }) {
  return (<>
      <CommonPageHeader
        title="Welcome back, [display name]!"
      />

      <ul>
        <li>show currently playing</li>
        <li>show up next</li>
      </ul>
  </>
  )
}