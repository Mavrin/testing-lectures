import YoutubeApi from '../Youtube-api';
import searchResponse from '../__mocks__/search-response.json';
import detailsResponse from '../__mocks__/details-response.json';
import expectedVideos from '../__mocks__/videos.json';

const youtubeApi = new YoutubeApi('mykey', 10);

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
                .toEqual('https://www.googleapis.com/youtube/v3//videos?key=mykey&id=1,2&part=statistics');
        });
        it('should merge search and details result', () => {
            expect(
                youtubeApi.mergeResult(searchResponse, detailsResponse)
            )
                .toEqual(expectedVideos);
        });
        it('getVideoByQuery return videos', () => {
            global.fetch = require('jest-fetch-mock');
            fetch.mockResponseOnce(JSON.stringify(searchResponse));
            fetch.mockResponseOnce(JSON.stringify(detailsResponse));
            return youtubeApi.getVideoByQuery('rolling-scopes-school').then((res) => {
                expect(fetch).toHaveBeenCalledWith(
                    "https://www.googleapis.com/youtube/v3//videos?key=mykey&id=1,2&part=statistics"
                );
                expect(fetch).toHaveBeenCalledWith(
                    "https://www.googleapis.com/youtube/v3/search?key=mykey&type=video&part=snippet&maxResults=10&q=rolling-scopes-school"
                );
                return expect(res).toEqual(expectedVideos);
            });
        })
    })
});