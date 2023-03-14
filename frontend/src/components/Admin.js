//import {withAuthenticator} from "@aws-amplify/ui-react";
import { Authenticator } from '@aws-amplify/ui-react';
import SkillsDisplay from './SkillsDisplay'

export function Admin() {
    return (
        <Authenticator>
            {({ signOut, user }) => (
                <SkillsDisplay signOut={signOut} user={user} />
            )}
        </Authenticator>
    );
}
