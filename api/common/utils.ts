/* eslint-disable no-param-reassign */

export const setCORSHeaders = (res: any) => {
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  return res
}
