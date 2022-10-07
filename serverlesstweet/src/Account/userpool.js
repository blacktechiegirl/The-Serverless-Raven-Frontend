import { CognitoUserPool } from 'amazon-cognito-identity-js'

const userPoolData = {
    UserPoolId: "us-east-1_wEs0v6sha",
    ClientId: "5nr14qma1kbavqcjtts2vlgdpe",
}

export default new CognitoUserPool(userPoolData)