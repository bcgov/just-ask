import React from "react";
import {
  Header as BCGovHeader,
  Link,
  Text,
} from "@bcgov/design-system-react-components";

const App: React.FC = () => {
  return (
    <div>
      <BCGovHeader>
        <h1>BC Gov Github Access Management</h1>
      </BCGovHeader>
      <div style={{ padding: "2rem" }}>
        <Text>
          This service is retired. Use the following instructions to join the BC
          Gov's GitHub organizations:
        </Text>
        <ul>
          <li>
            <Link href="https://developer.gov.bc.ca/docs/default/component/bc-developer-guide/use-github-in-bcgov/bc-government-organizations-in-github/#directions-to-sign-up-and-link-your-account-for-bcgov">
              How to join the bcgov GitHub organization
            </Link>
          </li>
          <li>
            <Link href="https://developer.gov.bc.ca/docs/default/component/bc-developer-guide/use-github-in-bcgov/bc-government-organizations-in-github/#directions-to-sign-up-and-link-your-account-for-bcgov-c">
              How to join the bcgov-c GitHub organization
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default App;
