/* eslint-disable no-param-reassign */
import type { NowRequest, NowResponse } from '@vercel/node'
import { createIntent, JSONIntent } from '../../common/dialogflow'
import { setCORSHeaders } from '../../common/utils'

export default async (req: NowRequest, res: NowResponse) => {
    res = setCORSHeaders(res)
    if (req.method == 'POST'){
        try {
            const sorted: JSONIntent = req.body
            console.log(sorted)
            const newIntent = await createIntent(sorted.intent_name, sorted.user_says, sorted.bot_says)
            return res.send(newIntent)
        } catch (error){
            console.log(error)
            return res.status(500).send(error)
        }
    } else if (req.method == 'OPTIONS'){
        /* Pass pre-flight HTTP check */
        res.send(200)
    } else {
        /* Send 404 on undefined method */
        res.send(404)
    }
}
