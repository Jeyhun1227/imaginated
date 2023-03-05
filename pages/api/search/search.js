const PoolConnection = require('../postgressql')
import { getSession } from "next-auth/react";
import { PineconeClient } from "@pinecone-database/pinecone";
const { Configuration, OpenAIApi } = require("openai");

// const pinecone = new PineconeClient({ apiKey: process.env.PINECONE_KEY , baseUrl:"us-east1-gcp"});




export default async (req, res) => {
    // const openai = createClient({ apiKey: process.env.OPENAI_KEY });
    // console.log('process.env.OPENAI_KEY: ', process.env.OPENAI_KEY)
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_KEY,
      });
    const openai = new OpenAIApi(configuration);


    if (req.method === 'POST' && req.body.keyword) {
        const session = await getSession({ req })
        const { headers } = req;
        const sessionId = session? session.id: null;
        const ip = headers['x-forwarded-for'] || req.connection.remoteAddress;
        // const response = await openai.createCompletion({
        //     model: "text-davinci-002",
        //     prompt: "Hello world",
        //   });
        const response = await openai.createEmbedding({
            model: 'text-embedding-ada-002',
            input: req.body.keyword,
            
        });
        //         axios.post('https://api.openai.com/v1/embeddings', headers={Authorization: `Bearer ${process.env.OPENAI_KEY}`})

        // console.log('embedding: ', response.data.data[0].embedding, req.body.keyword)
        // Extract the embedding from the API response
        const embedding = response.data.data[0].embedding;
        const pinecone = new PineconeClient();
        await pinecone.init({
        apiKey: process.env.PINECONE_KEY , environment:"us-east1-gcp"
        });

        const index = pinecone.Index("openai")

        const pinecone_values = await index.query({
            topK: 20,
            vector: embedding            
        });
        const keyword_list = pinecone_values.data.matches.filter(item => item.score >= .90)
                            .map(item => item.id.toLowerCase()) // lower the strings
                            .filter((item, index, arr) => arr.indexOf(item) === index);


        // console.log('pinecone_values: ', pinecone_values.data.matches, keyword_list)

        let youtubeChannel = await PoolConnection.query('SELECT "channelId" id, "channelId", first_name, last_name, linkname, aka, category, subcategory, imagelink, "count", avg, sum(match_rate) match_rate, sum("index") "index" FROM youtube_channel_keyword_individual_vw WHERE lower(keyword) = ANY($1) GROUP BY 1,2,3,4,5,6,7,8,9,10,11 ORDER BY match_rate desc;', [keyword_list])
        let youtubeKeywords = await PoolConnection.query('SELECT videoid id, "channelId", videoid, title, thumbnail, sum(score) score, sum(relevance) relevance, sum(engagement) engagement from youtube_video_keyword where show_overall is true and lower(keyword) = ANY($1) group by 1,2,3,4,5;', [keyword_list])
        let youtubeChannelResults = youtubeChannel.rows
        let youtubeKeywordsResults = youtubeKeywords.rows
        let channel_ids = [...new Set(youtubeChannelResults.map((e) => e.channelId))];
        let youtubeSubs = await PoolConnection.query('SELECT * from youtube_top_ranking_sub_buckets WHERE "channelId" = ANY($1);', [channel_ids])
        let youtubeSubsResults = youtubeSubs.rows
        var insert_values = await PoolConnection.query('INSERT INTO user_request_search(search_term, userid, ip, category, channel_results, video_results) VALUES($1, $2, $3, $4, $5, $6);', 
        [req.body.keyword, sessionId, ip, req.body.category, youtubeChannelResults.length, youtubeKeywordsResults.length]);

        return res.status(200).json({youtubeChannel: youtubeChannelResults, youtubeKeywords: youtubeKeywordsResults, youtubeSubs: youtubeSubsResults})

    }
    return res.status(403).json({
        message:
            'Incorrect Parameters',
        })
}