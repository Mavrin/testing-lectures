export default function videoList(data) {
    if (data.items.length === 0) {
        if (data.query) {
            return `<div>Not found</div>`
        }
        return `<div>Please start search</div>`
    }
    return `<div>
                <ul>
                ${
                    data.items
                        .map(({title, thumbnailUrl}) => `<li><img src="${thumbnailUrl}" alt="">${title}</li>`).join('')
                }
                </ul>
            </div>`;
}