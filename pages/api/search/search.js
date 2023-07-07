// const PoolConnection = require('../postgressql')
// import { getSession } from "next-auth/react";
// import { PineconeClient } from "@pinecone-database/pinecone";
// const { Configuration, OpenAIApi } = require("openai");

// // const pinecone = new PineconeClient({ apiKey: process.env.PINECONE_KEY , baseUrl:"us-east1-gcp"});

// MOVED TO GRAPHQL SERVER


// export default async (req, res) => {
//     // const openai = createClient({ apiKey: process.env.OPENAI_KEY });
//     // console.log('process.env.OPENAI_KEY: ', process.env.OPENAI_KEY)
//     const configuration = new Configuration({
//         apiKey: process.env.OPENAI_KEY,
//       });
//     const openai = new OpenAIApi(configuration);


//     if (req.method === 'POST' && req.body.keyword) {
//         const session = await getSession({ req })
//         const { headers } = req;
//         const sessionId = session? session.id: null;
//         const category = 'Photography'
//         const ip = headers['x-forwarded-for'] || req.connection.remoteAddress;
//         // const response = await openai.createCompletion({
//         //     model: "text-davinci-002",
//         //     prompt: "Hello world",
//         //   });
//         const response = await openai.createEmbedding({
//             model: 'text-embedding-ada-002',
//             input: req.body.keyword,
            
//         });
//         //         axios.post('https://api.openai.com/v1/embeddings', headers={Authorization: `Bearer ${process.env.OPENAI_KEY}`})

//         // console.log('embedding: ', response.data.data[0].embedding, req.body.keyword)
//         // Extract the embedding from the API response
//         const embedding = response.data.data[0].embedding;
//         const pinecone = new PineconeClient();
//         await pinecone.init({
//         apiKey: process.env.PINECONE_KEY , environment:"us-east1-gcp"
//         });

//         const index = pinecone.Index("openai")

//         const pinecone_values = await index.query({
//             topK: 12,
//             vector: embedding,
//             namespace: "Photography",     
//             includeMetadata: true,

                  
//         });
//         const keyword_list_main = pinecone_values.data.matches.filter(item => item.score >= .90)
//         const keyword_list = keyword_list_main.map(item => item.id.toLowerCase()) // lower the strings
//                             .filter((item, index, arr) => arr.indexOf(item) === index);
//         const keyword_list_array = keyword_list_main.map((e) => [e.id.toLowerCase(), Math.round(e.score * 1000)])
//                                 // .filter((item, index, arr) => arr.indexOf(item[0]) === index)
//         // let main_keywords = Array.from(new Map(keyword_list_array.map(item => [item[0], item])).values());
//         // console.log('pinecone_values: ', main_keywords)
//         let youtubeChannel = await PoolConnection.query('SELECT "channelId" id, "channelId", individualid, first_name, last_name, linkname, aka, category, subcategory, imagelink, "count", avg, sum(match_rate) match_rate, sum("index") "index" FROM youtube_channel_keyword_individual WHERE keyword_lower = ANY($1) and category = $2 GROUP BY 1,2,3,4,5,6,7,8,9,10,11,12 ORDER BY match_rate desc;', [keyword_list, category])
//         let youtubeKeywords = await PoolConnection.query('SELECT videoid id, "channelId", videoid, title, thumbnail, sum(score) score, sum(relevance) relevance, sum(engagement) engagement from youtube_video_keyword where show_overall is true and keyword_lower = ANY($1) and category = $2 group by 1,2,3,4,5;', [keyword_list, category])
        
//         const premium_keywords = keyword_list_main.filter((e) => e.metadata.premium).map((e) => e.metadata.title)
//         // console.log('premium_keywords: ', premium_keywords)

//         let premiumOfferings = await PoolConnection.query('SELECT o.* from individual_premium_offerings o join category c on c.id = o.category where name = ANY($1) and c.category = $2;', [premium_keywords, category])

//         let youtubeChannelResults = youtubeChannel.rows
//         let youtubeKeywordsResults = youtubeKeywords.rows
//         let channel_ids = [...new Set(youtubeChannelResults.map((e) => e.channelId))];
//         let youtubeSubs = await PoolConnection.query('SELECT * from youtube_top_ranking_sub_buckets WHERE "channelId" = ANY($1);', [channel_ids])
//         let youtubeSubsResults = youtubeSubs.rows
//         var insert_values = await PoolConnection.query('INSERT INTO user_request_search(search_term, userid, ip, category, channel_results, video_results, keyword_list) VALUES($1, $2, $3, $4, $5, $6, $7);', 
//         [req.body.keyword, sessionId, ip, req.body.category, youtubeChannelResults.length, youtubeKeywordsResults.length, keyword_list_array]);

//         // console.log('search: ', premiumOfferings.rows)
//         return res.status(200).json({youtubeChannel: youtubeChannelResults, youtubeKeywords: youtubeKeywordsResults, youtubeSubs: youtubeSubsResults, premiumOfferings: premiumOfferings.rows})

//     }
//     return res.status(403).json({
//         message:
//             'Incorrect Parameters',
//         })
// }