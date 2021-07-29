import type { NowRequest, NowResponse } from '@vercel/node'
import { sessionClient } from './common/dialogflow'
import type * as dialogflow from '@google-cloud/dialogflow'
import { setCORSHeaders } from './common/utils';


export default async (req: NowRequest, res: NowResponse) => {
    res = setCORSHeaders(res)
    if (req.method == 'GET'){
            return res.send('Hello')
    }
    if (req.method == 'POST'){
        // console.log(req.body);
        /* Detect Intent (send a query to dialogflow) */
        /* 
        If no body, session, query, or lang, return 400 */
        if (!req.body || !req.body.session || !req.body.queryInput){
            res.statusCode = 400
            return res.send('Invalid body')
        } else {
            /* Prepare dialogflow request */
            const session_id = req.body.session
            const sessionPath = sessionClient.projectAgentSessionPath(process.env.SERVICE_ACCOUNT_PROJECT_ID!,
                session_id)

            const request = {
                session: sessionPath,
                queryInput: req.body.queryInput
            }

            try {
                /* Send our request to Dialogflow */
                const responses = await sessionClient.detectIntent(request)
                /* If the response should be formatted (?format=true), then return the format the response */
                const intentresponse = responses[0] as dialogflow.protos.google.cloud.dialogflow.v2.IDetectIntentResponse

                return res.send(intentresponse)

            } catch (error){
                console.log(error)
                res.statusCode = 500
                return res.send(error.message)
            }
        }
    } else if (req.method == 'OPTIONS'){
        /* Pass pre-flight HTTP check */
        res.send(200)
    } else {
        /* Send 404 on undefined method */
        res.send(404)
    }
};