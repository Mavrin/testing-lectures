import YoutubeApi from '../Youtube-api';
import searchResponse from '../__mocks__/search-response.json';
import detailsResponse from '../__mocks__/details-response.json';

const youtubeApi = new YoutubeApi('mykey', 10);
const expectedVideos = {
    items:[
        {
            id:"1",
            title: "Title 1",
            publishedAt: "2017-02-23T08:41:03.000Z",
            channelTitle: "channelTitle 1",
            description: "Video description 1",
            viewCount: "20",
            thumbnailUrl: "thumbnailUrl1"
        },
        {
            id:"2",
            title: "Title 2",
            publishedAt: "2017-03-23T08:41:03.000Z",
            channelTitle: "channelTitle 2",
            description: "Video description 2",
            viewCount: "10",
            thumbnailUrl: "thumbnailUrl2"
        }
    ]
};

describe('youtube api', () => {
    describe('get video by search query', function () {
        it('should generate the search url', () => {
            expect(
                youtubeApi.getSearchQueryUrl('rolling-scopes-school')
            )
                .toEqual('https://www.googleapis.com/youtube/v3/search?key=mykey&type=video&part=snippet&maxResults=10&q=rolling-scopes-school')
        });
        it('should extract ids', () => {
            expect(
                youtubeApi.extractIds(searchResponse)
            )
                .toEqual(['1', '2']);
        });
        it('should generate the details url', () => {
            expect(
                youtubeApi.getDetailsUrl(['1', '2'])
            )
                .toEqual('https://www.googleapis.com/youtube/v3/videos?key=mykey&id=1,2&part=statistics');
        });
        it('should merge search and details result', () => {
            expect(
                youtubeApi.mergeResult(searchResponse, detailsResponse)
            )
                .toEqual(expectedVideos);
        });
        it('getVideoByQuery return videos', () => {
            global.fetch = require('jest-fetch-mock');
            const searchRequest = fetch.mockResponseOnce(JSON.stringify(searchResponse));
            const detailsRequest =  fetch.mockResponseOnce(JSON.stringify(detailsResponse));
            return youtubeApi.getVideoByQuery('rolling-scopes-school').then((res) => {
                expect(fetch.mock.calls[0][0]).toEqual(
                    "https://www.googleapis.com/youtube/v3/search?key=mykey&type=video&part=snippet&maxResults=10&q=rolling-scopes-school"
                );
                expect(fetch.mock.calls[1][0]).toEqual(
                    "https://www.googleapis.com/youtube/v3/videos?key=mykey&id=1,2&part=statistics"
                );
                return expect(res).toEqual(expectedVideos);
            });
        })
    })
});