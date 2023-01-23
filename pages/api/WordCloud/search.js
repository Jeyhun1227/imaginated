const PoolConnection = require('../postgressql')


export default async (req, res) => {
    if(req.body.individual && req.body.query){
            var indivudal_val = await PoolConnection.query('select v.*, c."individualId"  from youtube_channel_keyword c join youtube_video_keyword v on c.id = v.channel_key where v.keyword = $1 AND c."individualId" = $2', [req.body.query, req.body.individual])

            return res.status(200).json({
                indivudal_val: indivudal_val.rows
            })
    }
    return res.status(403).json({
        message:
            'You must be sign in to view the protected content on this page.',
        })
}