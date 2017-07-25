export default class YoutubeApi {
    constructor(key, count) {
        this.key = null;
        this.apiUrl = 'https://www.googleapis.com/youtube/v3/';
        this.count = count;
    }
    getSearchQueryUrl(query) {
        return `${this.apiUrl}search?key=${this.key}&type=video&part=snippet&maxResults=${this.count}&q=${query}`;
    }
    extractIds(response) {
        return response.items.map(({id:{videoId}}) => videoId);
    }
    getDetailsUrl(ids) {
        return `${this.apiUrl}videos?key=${this.key}&id=${ids.join(',')}&part=statistics`;
    }
    mergeResult(searchResult, detailsResult) {
        return searchResult.items.reduce((res,item) => {
            const id = item.id.videoId;
            const {title, publishedAt, channelTitle, description, thumbnails} = item.snippet;
            const detail = detailsResult.items.find(({id: videoId}) => videoId === id);
            res.items.push({
                id,
                title,
                publishedAt,
                channelTitle,
                description,
                viewCount: detail.statistics.viewCount,
                thumbnailUrl: thumbnails.medium.url,
            });
            return res;
        },{items:[]})
    }
    getRequest(url) {
        return fetch(url).then(res => res.json())
    }
    getVideoByQuery(query) {
        return this.getRequest(this.getSearchQueryUrl(query))
            .then((res) => Promise.all([
                res,
                this.getRequest(this.getDetailsUrl(this.extractIds(res)))
            ]))
            .then(([searchResult, detailsResult]) => this.mergeResult(searchResult, detailsResult))

    }
}