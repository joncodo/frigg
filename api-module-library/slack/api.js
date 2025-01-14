const { OAuth2Requester } = require('@friggframework/module-plugin');
const { get } = require('@friggframework/assertions');

class Api extends OAuth2Requester {
    constructor(params) {
        super(params);

        this.baseUrl = 'https://slack.com/api';
        this.client_id = process.env.SLACK_CLIENT_ID;
        this.client_secret = process.env.SLACK_CLIENT_SECRET;
        // this.client_id = get(params, 'client_id');
        // this.client_secret = get(params, 'client_secret');
        this.scope = process.env.SLACK_SCOPE;
        this.redirect_uri = `${process.env.REDIRECT_URI}/slack`;
        this.access_token = get(params, 'access_token', null);

        this.URLs = {
            // Auth
            authorize: 'https://slack.com/oauth/v2/authorize',
            access_token: '/oauth.v2.access',
            authTest: '/auth.test',

            // Chats
            getMessagePermalink: '/chat.getPermalink',
            postMessage: '/chat.postMessage',
            updateMessage: '/chat.update',
            deleteMessage: '/chat.delete',

            // Files
            getFile: '/files.info', // Gets information about a file.
            listFiles: '/files.list', // List for a team, in a channel, or from a user with applied filters.
            uploadFile: '/files.upload', // Uploads a file
            deleteFile: '/files.delete', // Deletes a file.
            getFileUploadURLExternal: '/files.completeUploadExternal', // Gets a URL for an edge external upload
            completeFileUploadExternal: '/files.getUploadURLExternal', // Finishes an upload started with getUploadURLExternal
            getRemoteFile: '/files.remote.info', // Gets information about a remote file
            listRemoteFiles: '/files.remote.list', // Lists remote files
            addRemoteFile: '/files.remote.add', // Adds a remote file
            updateRemoteFile: '/files.remote.update', // Updates a remote file
            removeRemoteFile: '/files.remote.remove', // Removes a remote file
            shareRemoteFile: '/files.remote.share', // Shares a remote file
            revokeFilePublicURL: '/files.revokePublicURL', // Revokes public/external sharing access for a file
            sharedFilePublicURL: '/files.sharedPublicURL', // Enables a file for public/external sharing.
        };

        this.authorizationUri = `${this.URLs.authorize}?state=FRIGGSLACKAPP&client_id=${this.client_id}&scope=${this.scope}&redirect_uri=${this.redirect_uri}`;
    }

    async addAuthHeaders(headers) {
        if (this.access_token) {
            headers.Authorization = `Bearer ${this.access_token}`;
        }
        return headers;
    }

    async getAuthUri() {
        return this.authorizationUri;
    }

    async getTokenFromCode(code) {
        const options = {
            url: this.baseUrl + this.URLs.access_token,
            body: {
                client_id: this.client_id,
                client_secret: this.client_secret,
                code,
            },
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        };
        const response = await this._post(options);
        return response;
    }

    async authTest() {
        const options = {
            url: this.baseUrl + this.URLs.authTest,
            body: null,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        };
        const response = await this._post(options);
        return response;
    }

    // Args:
    // channel: string, required
    // message_ts: string, required
    async getMessagePermalink(query) {
        const options = {
            url: this.baseUrl + this.URLs.getMessagePermalink,
            query,
        };
        const response = await this._get(options);
        return response;
    }

    // Args:
    // channel: string, required
    // At least one required:
    //      attachments: string
    //      blocks: blocks[] as string
    //      text: string
    // as_user: boolean, optional
    // icon_emoji: string, optional
    // icon_url: string, optional
    // link_names: boolean, optional
    // metadata: string, optional
    // mrkdwn: boolean, optional
    // parse: string, optional
    // reply_broadcast: boolean, optional
    // thread_ts: string, optional
    // unfurl_links: boolean, optional
    // unfurl_media: boolean, optional
    // username: string, optional
    async postMessage(body) {
        const options = {
            url: this.baseUrl + this.URLs.postMessage,
            body,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        };
        const response = await this._post(options);
        return response;
    }

    // Args:
    // channel: string, required
    // ts: string, required
    // as_user: boolean, optional
    // attachments: string, optional
    // blocks: blocks[] as string, optional
    // file_ids: array, optional
    // link_names: boolean, optional
    // metadata: string, optional
    // parse: string, optional
    // reply_broadcast: boolean, optional
    // text: string, optional
    async updateMessage(body) {
        const options = {
            url: this.baseUrl + this.URLs.updateMessage,
            body,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        };
        const response = await this._post(options);
        return response;
    }

    // Args:
    // channel: string, required
    // ts: string, required
    // as_user: boolean, required
    async deleteMessage(body) {
        const options = {
            url: this.baseUrl + this.URLs.deleteMessage,
            body,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        };
        const response = await this._post(options);
        return response;
    }

    // Args:
    // count: integer, optional
    // cursor: string, optional
    // limit: integer, optional
    // page: integer, optional
    async getFile(query) {
        const options = {
            url: this.baseUrl + this.URLs.getFile,
            query,
        };
        const response = await this._get(options);
        return response;
    }

    // Args:
    // channel: string, optional
    // count: integer, optional
    // files: string, optional
    // page: integer, optional
    // show_files_hidden_by_limit: boolean, optional
    // team_id: string, optional
    // ts_from: string, optional
    // ts_to: string, optional
    // types: string, optional
    // user: string, optional
    async listFiles(query) {
        const options = {
            url: this.baseUrl + this.URLs.listFiles,
            query,
        };
        const response = await this._get(options);
        return response;
    }

    // Args:
    // channels: string, optional
    // content: string, optional - If omitting this parameter, you must submit file.
    // file: file, optional - If omitting this parameter, you must submit content.
    // filename: string, optional
    // filetype: string, optional
    // initial_comment: string, optional
    // thread_ts: string, optional
    // title: string, optional
    async uploadFile(body) {
        const options = {
            url: this.baseUrl + this.URLs.uploadFile,
            body,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        };
        const response = await this._post(options);
        return response;
    }

    // Args:
    // file: string, required
    async deleteFile(body) {
        const options = {
            url: this.baseUrl + this.URLs.deleteFile,
            body,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        };
        const response = await this._post(options);
        return response;
    }

    // Args:
    // external_id: string, optional
    // file: string, optional
    async getRemoteFile(query) {
        const options = {
            url: this.baseUrl + this.URLs.getRemoteFile,
            query,
        };
        const response = await this._get(options);
        return response;
    }

    // Args:
    // channel: string, optional
    // cursor: string, optional
    // limit: integer, optional
    // ts_from: string, optional
    // ts_to: string, optional
    async listRemoteFiles(query) {
        const options = {
            url: this.baseUrl + this.URLs.listRemoteFiles,
            query,
        };
        const response = await this._get(options);
        return response;
    }

    // Args:
    // title: string, required
    // external_id: string, required
    // external_url: string, required
    // filetype: string, optional
    // indexable_file_contents: file, optional
    // preview_image: file, optional
    async addRemoteFile(query) {
        const options = {
            url: this.baseUrl + this.URLs.addRemoteFile,
            query,
        };
        const response = await this._get(options);
        return response;
    }

    // Args:
    // channels: string, required
    // external_id: string, optional
    // file: string, optional
    async shareRemoteFile(query) {
        const options = {
            url: this.baseUrl + this.URLs.shareRemoteFile,
            query,
        };
        const response = await this._get(options);
        return response;
    }

    // Args:
    // file: string, optional
    // external_id: string, optional
    // title: string, optional
    // external_url: string, optional
    // filetype: string, optional
    // indexable_file_contents: file, optional
    // preview_image: file, optional
    async updateRemoteFile(query) {
        const options = {
            url: this.baseUrl + this.URLs.updateRemoteFile,
            query,
        };
        const response = await this._get(options);
        return response;
    }

    // Args:
    // external_id: string, optional
    // file: string, optional
    async removeRemoteFile(query) {
        const options = {
            url: this.baseUrl + this.URLs.removeRemoteFile,
            query,
        };
        const response = await this._get(options);
        return response;
    }
}

module.exports = { Api };
