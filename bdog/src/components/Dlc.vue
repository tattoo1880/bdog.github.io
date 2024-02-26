<template>
    <el-row class="oel">
        <el-input v-model="input" placeholder="请输入内容" class="sinput"></el-input>
        <el-button @click="download" type="warning" plain>下载</el-button>
    </el-row>
</template>

<script setup>
import { ref, reactive } from 'vue'
import jsonpath from "jsonpath";
import axios from 'axios'
const input = ref('')
const download = async() => {
    console.log(input.value)
    const statusurl = input.value
    const keyvalue = statusurl.split("/").pop()
    console.log(keyvalue)
    try {
        const response = await axios.get(
            "https://twitter.com/i/api/graphql/4EQGUyO_lbCtGin4PT7MOQ/TweetDetail",
            {
                params: {
                    'variables': `{"focalTweetId":${keyvalue},"with_rux_injections":false,"includePromotedContent":true,"withCommunity":true,"withQuickPromoteEligibilityTweetFields":true,"withBirdwatchNotes":true,"withVoice":true,"withV2Timeline":true}`,
                    'features': '{"responsive_web_graphql_exclude_directive_enabled":true,"verified_phone_label_enabled":false,"responsive_web_home_pinned_timelines_enabled":true,"creator_subscriptions_tweet_preview_api_enabled":true,"responsive_web_graphql_timeline_navigation_enabled":true,"responsive_web_graphql_skip_user_profile_image_extensions_enabled":false,"c9s_tweet_anatomy_moderator_badge_enabled":true,"tweetypie_unmention_optimization_enabled":true,"responsive_web_edit_tweet_api_enabled":true,"graphql_is_translatable_rweb_tweet_is_translatable_enabled":true,"view_counts_everywhere_api_enabled":true,"longform_notetweets_consumption_enabled":true,"responsive_web_twitter_article_tweet_consumption_enabled":false,"tweet_awards_web_tipping_enabled":false,"freedom_of_speech_not_reach_fetch_enabled":true,"standardized_nudges_misinfo":true,"tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled":true,"longform_notetweets_rich_text_read_enabled":true,"longform_notetweets_inline_media_enabled":true,"responsive_web_media_download_video_enabled":false,"responsive_web_enhance_cards_enabled":false}',
                    'fieldToggles': '{"withArticleRichContentState":false}'
                },
                headers: {
                    'authority': 'twitter.com',
                    'accept': '*/*',
                    'accept-language': 'zh-CN,zh;q=0.9',
                    'authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA',
                    'content-type': 'application/json',
                    'cookie': 'guest_id=v1%3A170156326552730627; d_prefs=MToxLGNvbnNlbnRfdmVyc2lvbjoyLHRleHRfdmVyc2lvbjoxMDAw; guest_id_ads=v1%3A170156326552730627; guest_id_marketing=v1%3A170156326552730627; personalization_id="v1_uZVN0UHikjGNQwOkZ2znQA=="; _ga=GA1.2.1807573054.1701563267; _twitter_sess=BAh7CSIKZmxhc2hJQzonQWN0aW9uQ29udHJvbGxlcjo6Rmxhc2g6OkZsYXNo%250ASGFzaHsABjoKQHVzZWR7ADoPY3JlYXRlZF9hdGwrCLIMEy2MAToMY3NyZl9p%250AZCIlYzgwNDhmMzMxYzg2MGFmNTFlNjBlM2Y1MjdlNTk2ZmQ6B2lkIiVmYTdh%250AMTc3MDA4ZTM4OTE0MjAwOWRhYjI4YmFjYTkzZg%253D%253D--ad5164975b2a0e2f67cc934437b72c432bd3f1ab; kdt=pRK3q76VJNnhlI9zp3LlfoWrorPQYeiibL6BoYlz; auth_token=adc6b9d057e952cd186408f0f894c3a9f0ecf5e2; ct0=72d7facfc1e2ceb0db4d7f4355a9bd116e137f0c84383f9f05e4cb01af6a1b536e28b19393a20d449f4b6e507e5ee8eaeb8f72c6b29ff6b919f75ed9d4b1a1da111bb4bb6812763b58f1e1fdbf80ac58; lang=zh-cn; twid=u%3D732225356388667392; _gid=GA1.2.792589669.1701695735',
                    'referer': 'https://twitter.com/Maurice54976298/status/1730061971989659961',
                    'sec-ch-ua': '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"macOS"',
                    'sec-fetch-dest': 'empty',
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-site': 'same-origin',
                    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
                    'x-client-transaction-id': '8J/VkMLeJPubUH6RjUImZNQoajboTyJJWN7q9UfOt5bKE3dzp2GZb7jJAVfTGgCt8nOe7vGd1m2msmr5G/wKCEgwML4i8Q',
                    'x-csrf-token': '72d7facfc1e2ceb0db4d7f4355a9bd116e137f0c84383f9f05e4cb01af6a1b536e28b19393a20d449f4b6e507e5ee8eaeb8f72c6b29ff6b919f75ed9d4b1a1da111bb4bb6812763b58f1e1fdbf80ac58',
                    'x-twitter-active-user': 'yes',
                    'x-twitter-auth-type': 'OAuth2Session',
                    'x-twitter-client-language': 'zh-cn'
                }
            }
        );

        // ! 使用jsonpath获取m3u8的url
        let m3u8Urls = jsonpath.query(response.data, '$..url');
        console.log(m3u8Urls);
        // ! 去重
        m3u8Urls = [...new Set(m3u8Urls)];
        // ! 过滤出m3u8的url
        m3u8Urls = m3u8Urls.filter(item => typeof item === 'string' && item.includes("/vid/"));

        console.log(m3u8Urls);

        // 选取m3u8Urls的第一个元素
        const mp4Url = m3u8Urls[0].split("?")[0]
        console.log(mp4Url)
        //  生成一个时间戳整数作为视频的文件名
        const filename = Date.now()
        console.log(filename)
    } catch (e) {
        console.log(e)
    }
}

</script>

<style scoped>
.sinput {
    width: 600px;
}

.oel {
    margin-top: 120px;
    display: flex;
    justify-content: space-evenly;
}
</style>