import React from 'react';
import ContentBox from '../wrappers/ContentBox';

/**
 * @typedef {Object} Comment
 * @prop {string} user - The name of the user who made the comment.
 * @prop {string} text - The content of the comment.
 * @prop {string} date - The date when the comment was made.
 * @prop {number} rating - The rating given by the user.
 */

/**
 * 
 * @param {{comments: Array<Comment>}} param0 
 * @returns 
 */
const MovieComments = ({ comments }) => {
    console.log('MovieComments mounted or dependencies changed, fetching movie details...');
    console.log(comments);


    return (
        <ContentBox className='movie-comments'>
            <h2>Comments</h2>
            <div className='movie-comments-list'>
                {comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <div key={index} className='movie-comment'>
                            <p><strong>{comment.user}</strong></p>
                            <p>{comment.text}</p>
                        </div>
                    ))
                ) : (
                    <p>No comments available.</p>
                )}
            </div>
        </ContentBox>
    );
};

export default MovieComments;  