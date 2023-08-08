class DarkJS {
    constructor() {
        this.http = new XMLHttpRequest();
        this.headers = {};
    }

    setHeader(key, value) {
        this.headers[key] = value;
    }

    get(url = '', data = {}, callback = () => { }) {
        const queryString = Object.entries(data)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');

        this.http.open('GET', `${url}?${queryString}`, true);

        for (const [key, value] of Object.entries(this.headers)) {
            this.http.setRequestHeader(key, value);
        }

        this.http.onload = function () {
            if (this.http.status === 200) {
                callback(null, this.http.responseText);
            } else {
                callback(`Error: ${this.http.status}`);
            }
        }.bind(this);

        this.http.send();
    }

    post(url = '', data = {}, callback = () => { }) {
        this.http.open('POST', url, true);

        for (const [key, value] of Object.entries(this.headers)) {
            this.http.setRequestHeader(key, value);
        }

        this.http.onload = function () {
            callback(null, this.http.responseText);
        }.bind(this);

        const requestBody = Object.entries(data)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');

        this.http.send(requestBody);
    }

    put(url = '', data = {}, callback = () => { }) {
        this.http.open('PUT', url, true);

        for (const [key, value] of Object.entries(this.headers)) {
            this.http.setRequestHeader(key, value);
        }

        this.http.onload = function () {
            callback(null, this.http.responseText);
        }.bind(this);

        const requestBody = Object.entries(data)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');

        this.http.send(requestBody);
    }

    delete(url = '', callback = () => { }) {
        this.http.open('DELETE', url, true);

        for (const [key, value] of Object.entries(this.headers)) {
            this.http.setRequestHeader(key, value);
        }

        this.http.onload = function () {
            if (this.http.status === 200) {
                callback(null, 'Post Deleted!');
            } else {
                callback(`Error: ${this.http.status}`);
            }
        }.bind(this);

        this.http.send();
    }
}