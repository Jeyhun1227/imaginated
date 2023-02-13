const PoolConnection = require('../postgressql')
import { getSession } from "next-auth/react";
import { PineconeClient } from 'pinecone-client';
// const pinecone = new PineconeClient({ /* ... */ });



export default async (req, res) => {
    if (req.method === 'POST' && req.body.keyword) {
            const session = await getSession({ req })
            const { headers } = req;
            const sessionId = session? session.id: null;
            const ip = headers['x-forwarded-for'] || req.connection.remoteAddress;

            // const { matches } = await pinecone.query({
            //     topK: 2,
            //     id: '2',
            //     filter: { size: { $lt: 20 } },
            //     includeMetadata: true,
            // });

            let youtubeChannel = await PoolConnection.query('SELECT * FROM youtube_channel_keyword_individual_vw WHERE keyword = $1 ORDER BY match_rate desc;', [req.body.keyword])
            let youtubeKeywords = await PoolConnection.query('SELECT * FROM youtube_video_keyword yck where keyword = $1;', [req.body.keyword])
            let youtubeChannelResults = youtubeChannel.rows
            let youtubeKeywordsResults = youtubeKeywords.rows
            var insert_values = await PoolConnection.query('INSERT INTO user_request_search(search_term, userid, ip, category, channel_results, video_results) VALUES($1, $2, $3, $4, $5, $6);', 
            [req.body.keyword, sessionId, ip, req.body.category, youtubeChannelResults.length, youtubeKeywordsResults.length]);

            return res.status(200).json({youtubeChannel: youtubeChannelResults, youtubeKeywords: youtubeKeywordsResults})

    }
    return res.status(403).json({
        message:
            'Incorrect Parameters',
        })
}