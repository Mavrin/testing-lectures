import videoList from '../Video-list';
import expectedVideos from '../__mocks__/videos.json';

describe('video list', () => {
    it('render empty list', function () {
        expect(videoList({items: [], query: ''})).toMatchSnapshot();
    });
    it('render message for empty result', function () {
        expect(videoList({items: [], query: 'test'})).toMatchSnapshot();
    });
    it('render videos non empty result', function () {
        expect(videoList(expectedVideos)).toMatchSnapshot();
    });
});