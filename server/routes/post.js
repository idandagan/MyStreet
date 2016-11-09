/* eslint-disable no-underscore-dangle, consistent-return, no-param-reassign */
import { Router as expressRouter } from 'express';
import { Street } from '../models/street';
import { Post } from '../models/post';

const router = expressRouter();

router.post('/addLikeToPost', (req, res) => {

    const postID = req.session.postID;
    const userID = req.session.user._id;

    if (postID == null || userID == null) {
        return res.send('There have been validation errors', 400);
    }

    Post.findByIdAndUpdate(postID, { $addToSet: { likes: userID } }).exec()
        .then(post => {
            if (post) {
                return res.status(200).send({ msg: 'Added like' });
            }
        }
    );
});

router.delete('/unlikePost', (req, res) => {

    const postID = req.session.postID;
    const userID = req.session.user._id;

    if (postID == null || userID == null) {
        return res.send('post or user is missing', 400);
    }

    Post.findByIdAndUpdate(
        { _id: postID },
        { $pull: { likes: userID },
        }, err => {
            if (err) throw err;
            else res.status(200).send({ msg: 'unlike post' });
        }
    );
});

router.post('/addPost', (req, res) => {
    // TODO: Change Parameters.
    const userID = req.session.user._id;
    const post = req.body.post;
    const streetID = req.session.streetID;

    req.check('post', 'post is empty').notEmpty();

    const errors = req.validationErrors();

    if (errors || userID == null || streetID == null) {
        return res.send(`There have been validation errors: ${errors}`, 400);
    }

    const newPost = new Post({
        createDate: Date.now(),
        author: userID,
        body: post,
    });
    newPost.save(err => {
        if (err) throw err;
        req.session.postID = newPost._id;
        req.session.save();
    });

    Street.findByIdAndUpdate(streetID, {
        $push: { postList: newPost },
    }).exec()
        .then(street => {
            if (street) {
                console.log('Added post');
                res.status(200).send({ msg: 'New post' });
            }
        }
    );
});

router.post('/addComment', (req, res) => {
    // TODO: Change parameters
    const userID = req.session.user._id;
    const postID = req.session.postID;
    const comment = req.body.comment;

    req.check('comment', 'Comment is missing').notEmpty();

    const errors = req.validationErrors();

    if (errors || userID == null || postID == null) {
        return res.send(`There have been validation errors: ${errors}`, 400);
    }

    Post.findByIdAndUpdate(postID, {
        $push: {
            comments: {
                createDate: Date.now(),
                author: userID,
                body: comment,
            },
        },
    }).then(user => {
        if (user) {
            console.log('Added comment');
            res.status(200).send({ msg: 'New comment' });
        }
    });
});

router.get('/getPosts', (req, res) => {
    // TODO: Change Parameters.
    const streetID = req.session.streetID;

    if (streetID == null) {
        return res.send('StreetID', 400);
    }

    Street.findOne({ _id: streetID })
        .populate({
            path: 'postList',
            model: 'post',
            populate: [{
                path: 'author',
                model: 'user',
                select: { name: 1 },
            },
            {
                path: 'likes',
                model: 'user',
                select: { name: 1 },
            }],
        }).exec()
        .then(street => {
            if (street) {
                console.log('getPosts executed successfully');
                return res.send(street.postList);
            }
        }
    );
});

router.delete('/deletePost', (req, res) => {

    const postID = req.session.postID;

    if (postID == null) {
        return res.send('postID', 400);
    }

    Post.findByIdAndRemove(postID).exec()
        .then(post => {
            if (post) {
                console.log('Deleted post');
                res.status(200).send({ msg: 'Deleted post' });
            }
        }
    );
});

export default router;
