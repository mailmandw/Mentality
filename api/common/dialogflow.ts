/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
import * as dialogflow from '@google-cloud/dialogflow'


export const intentClient = new dialogflow.IntentsClient({
  credentials: {
    // <-- Initialize with service account
    private_key: process.env.SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/gm,
      '\n'),
    client_email: process.env.SERVICE_ACCOUNT_EMAIL
  }
})

/* SessionsClient makes text requests */
export const sessionClient = new dialogflow.SessionsClient({
  credentials: {
    // <-- Initialize with service account
    private_key: process.env.SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/gm,
      '\n'),
    client_email: process.env.SERVICE_ACCOUNT_EMAIL
  }
})

export const createIntent = async (displayName: string,
  questions: string[],
  answer: string[]): Promise<any> => {
  let parent = intentClient.projectPath(process.env.SERVICE_ACCOUNT_PROJECT_ID)
  parent = `${parent}/agent`

  const newintent = await intentClient.createIntent({
    parent,
    intent: {
      displayName: displayName.trim(),
      outputContexts: [
        {
          lifespanCount: 2,
          parameters: {
            fields: {
              question: { stringValue: questions[0] },
              response: { stringValue: answer[0] }
            }
          },
          name: `${parent}/sessions/-/contexts/${displayName.replace(/\./gi,
            '-')}`
        }
      ],
      trainingPhrases: questions.map((t: any) => {
        return { parts: [{ text: t }] }
      }),
      messages: [{ text: { text: answer } }]
    }
  })
  return newintent
}

export type JSONIntent = {
  id: string
  bot: string
  parent?: string
  output?: string
  intent_name: string
  user_says: string[]
  bot_says: string[]
}
