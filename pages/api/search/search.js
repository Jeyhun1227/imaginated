const PoolConnection = require('../postgressql')



export default async (req, res) => {
//   const session = await getSession({ req })
    if (req.method === 'POST' && req.body.keyword) {
            let youtubeChannel = await PoolConnection.query('SELECT * FROM youtube_channel_keyword_individual_vw WHERE keyword = $1;', [req.body.keyword])
            let youtubeKeywords = await PoolConnection.query('SELECT * FROM youtube_video_keyword yck where keyword = $1;', [req.body.keyword])
            return res.status(200).json({youtubeChannel: youtubeChannel.rows, youtubeKeywords: youtubeKeywords.rows})

    }
    return res.status(403).json({
        message:
            'Incorrect Parameters',
        })
}