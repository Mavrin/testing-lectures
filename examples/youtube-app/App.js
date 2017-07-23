import videoList from './Video-list';
import YoutubeApi from './Youtube-api';


class App {
    constructor(id) {
        this.container = document.getElementById(id);
        this.youtubeApi = new YoutubeApi('AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y', 10);
        this.container.innerHTML = this.render({query: '', items: ''});
        document.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = e.currentTarget.querySelector('input').value;
            this.youtubeApi.getVideoByQuery(query).then(({items}) => {
                this.container.innerHTML = this.render({query: query, items});
            });
        })
    }

    render(data) {
        return `
            <div>
            <form>
                <input type="search" placeholder="rolling scopes school" value="${data.query}">
            </form>
                ${videoList(data)}
            </div>
        `
    }
}

new App('app');