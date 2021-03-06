import $ from 'jquery';
import config from 'util/config';


export function addPost(post, streetId) {
    const data = {
        streetId,
        post,
    }

    return new Promise((resolve, reject) => {
        $.ajax(`${config.posts}/addPost`, {
            method: 'POST',
            data: JSON.stringify(data),
            success: (res, status, xhr) => resolve(res),
            error: (xhr, status, error) => reject(xhr.responseJSON),
        });
    });
}

export function addComment(comment, postId) {
    const data = {
        postId,
        body: comment.body,
    }

    return new Promise((resolve, reject) => {
        $.ajax(`${config.posts}/addComment`, {
            method: 'POST',
            data: JSON.stringify(data),
            success: (res, status, xhr) => resolve(res),
            error: (xhr, status, error) => reject(xhr.responseJSON),
        });
    });
}

export function getPostsByPlaceId(placeId) {
    if (!placeId) {
        return;
    }

    return new Promise((resolve, reject) => {
        $.ajax(`${config.posts}/getPostsByPlaceId?placeId=${placeId}`, {
            method: 'GET',
            success: (res, status, xhr) => resolve(res),
            error: (xhr, status, error) => reject(xhr.responseJSON),
        });
    });
}

export function getPostsFeed() {
    return new Promise((resolve, reject) => {
        $.ajax(`${config.posts}/getPostsFeed`, {
            method: 'GET',
            success: (res, status, xhr) => resolve(res),
            error: (xhr, status, error) => reject(xhr.responseJSON),
        });
    });
}
