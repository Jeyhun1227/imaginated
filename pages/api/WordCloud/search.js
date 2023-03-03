const PoolConnection = require('../postgressql')
import { PineconeClient } from "@pinecone-database/pinecone";
const { Configuration, OpenAIApi } = require("openai");

export default async (req, res) => {

    if(req.body.individual && req.body.query){
        let keyword_found = req.body.query.toLowerCase()
        if(req.body.query_param){
            const configuration = new Configuration({
                apiKey: process.env.OPENAI_KEY,
              });
            const openai = new OpenAIApi(configuration);
            const response = await openai.createEmbedding({
                model: 'text-embedding-ada-002',
                input: req.body.query,
                
            });

            const embedding = response.data.data[0].embedding;
            // console.log('embedding: ', embedding)
            const pinecone = new PineconeClient();
            await pinecone.init({
            apiKey: process.env.PINECONE_KEY , environment:"us-east1-gcp"
            });

            const index = pinecone.Index("openai")

            if(req.body.videoid){
                const pinecone_values = await index.query({
                    topK: 20,
                    vector: embedding            
                });
                const keyword_list = pinecone_values.data.matches.filter(item => item.score >= .90)
                .map(item => item.id.toLowerCase()) // lower the strings
                .filter((item, index, arr) => arr.indexOf(item) === index);
                console.log('keyword_list: ', keyword_list)
                var indivudal_val = await PoolConnection.query('SELECT v.id, v."channelId", v.parent, v.sub_bucket, v.videoid, v.title, v.thumbnail, sum(v.score) score, sum(v.relevance) relevance, sum(v.engagement) engagement from youtube_channel_keyword c join youtube_video_keyword v on c.id = v.channel_key where v.videoid = $1 AND lower(v.keyword) = ANY($2) AND c."individualId" = $3  group by 1,2,3,4,5,6,7', [req.body.videoid, keyword_list, req.body.individual])
            }else{
                const pinecone_values = await index.query({
                    topK: 1,
                    vector: embedding            
                });
                keyword_found = pinecone_values.data.matches[0].id.toLowerCase();
                var indivudal_val = await PoolConnection.query('SELECT v.id, v."channelId", v.parent, v.sub_bucket, v.videoid, v.title, v.thumbnail, sum(v.score) score, sum(v.relevance) relevance, sum(v.engagement) engagement from youtube_channel_keyword c join youtube_video_keyword v on c.id = v.channel_key where lower(v.keyword) = $1 AND c."individualId" = $2  group by 1,2,3,4,5,6,7', [keyword_found, req.body.individual])
            }
            return res.status(200).json({
                indivudal_val: indivudal_val.rows
            })
        }


    }
    return res.status(403).json({
        message:
            'You must be sign in to view the protected content on this page.',
        })
}