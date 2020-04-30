import * as Secrets from './secrets'

export default {
    logInWithSpotify: (() => {

        let scopes_encoded = Secrets.scopes.replace(" ", "%20");

        window.location = [
            "https://accounts.spotify.com/authorize",
            `?client_id=` + Secrets.client_id,
            `&redirect_uri=` + Secrets.redirect_url,
            `&scope=` + scopes_encoded,
            "&response_type=token",
            "&show_dialog=true"
        ].join('');
    })
};