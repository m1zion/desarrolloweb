/* *
 * FC Instagram - Development FCV Team
 * Since: 2019-11
 * Version: v1.1.2
 * */
var FCInstagram = window.FCInstagram || {};
FCInstagram.version = "1.1.2";
FCInstagram.debug = false;
// Info
console.info("%c FC Instagram GraphQL %c v" + FCInstagram.version + " %c", "margin-left: 5px; padding: 1px; color: #FEFEFE; font-size: 12px; line-height: 15px; background: #F79433; border-radius: 3px 0 0 3px;", "padding: 1px; color: #FEFEFE; font-size: 12px; line-height: 15px; background: #FF5722; border-radius: 0 3px 3px 0;", "background: transparent;");
// Load library
requirejs.config({
    waitSeconds: 0,
    paths: {
        'es6promise': 'https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.min',
        'axios': 'https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.min',
        'instagram_config': './clone.instagram.config'
    }
});

define(['axios', 'es6promise', 'instagram_config'], function (axios, es6promise, instagram_config) {
    "use strict";
    // Set vars
    FCInstagram.url_api = 'https://www.instagram.com/';
    FCInstagram.account = config_instagram.account;
    FCInstagram.limit_item = config_instagram.limit_item;
    FCInstagram.resolution = config_instagram.resolution;
    FCInstagram.list_resolution = [150, 240, 320, 480, 640, 1080];
    FCInstagram.slug_page = 'p/';
    FCInstagram.slug_graph = '/?__a=1';
    FCInstagram.debug = config_instagram.debug;
    var photos = '';
    var i;
    // Get API

    axios.get(FCInstagram.url_api + FCInstagram.account + FCInstagram.slug_graph, {
        validateStatus: function (status) {
            if (status < 203) {
                return status < 203;
            } else {
                throw new Error("Account Instagram does not exist or broken link");
            }
        }
    }).then(function (response) {

        // Set vars
        FCInstagram.gallery_data = response.data["graphql"]["user"]["edge_owner_to_timeline_media"]["edges"];

        // Handling
        try {

            // Check resolution config
            if (FCInstagram.list_resolution.includes(FCInstagram.resolution) === false) {
                throw new Error("Please check resolution config at imstagram/shared/js/imstagram.config.js");
            }

            // Check data length
            if (FCInstagram.gallery_data.length !== 0) {

                // Check Data User & Data Limit
                if (FCInstagram.limit_item <= FCInstagram.gallery_data.length) {
                    loop(FCInstagram.limit_item);
                } else {
                    loop(FCInstagram.gallery_data.length);
                }

                // Resolution Handling & Loop item
                function loop(limit) {
                    if (FCInstagram.resolution === 1080) { // Resolution: 1080

                        // Loop item
                        for (i = 0; i < limit; i++) {

                            photos += '<a href="' + FCInstagram.url_api + FCInstagram.slug_page + FCInstagram.gallery_data[i].node.shortcode + '" target="_blank" rel="nofollow" style="background:url(' + FCInstagram.gallery_data[i].node.display_url + ') no-repeat center / cover;"> </a>';

                        }

                    } else {

                        // Loop item
                        for (i = 0; i < limit; i++) {

                            photos += '<a href="' + FCInstagram.url_api + FCInstagram.slug_page + FCInstagram.gallery_data[i].node.shortcode + '" target="_blank" rel="nofollow" style="background:url(' + FCInstagram.gallery_data[i].node.thumbnail_resources[FCInstagram.list_resolution.indexOf(FCInstagram.resolution)].src + ') no-repeat center / cover;"> </a>';

                        }

                    }
                }

                // Insert Data
                document.querySelector("#instafeed").innerHTML = photos;

            } else {
                throw new Error("Account Instagram private or no media");
            }

        } catch (e) {
            if (FCInstagram.debug) {
                console.error(e.message);
            }
        }

    }).catch(function (error) {

        if (FCInstagram.debug) {
            console.log(error.response.data.message);
        }
    });
});