import React, { useCallback, useState, useContext, useEffect } from 'react';
import { SourceContext } from '../../context/SourceContext'; // Assuming you have a context for the API URL
import Loader from '../low/Loader'; // Assuming you have a Loader component
import ContentBox from '../wrappers/ContentBox';
import './MovieComments.css'; // Assuming you have a CSS file for styling

/**
 * @typedef {Object} Comment
 * @prop {string} username - The name of the user who made the comment.
 * @prop {string} comment - The content of the comment.
 * @prop {string} createdAt - The date when the comment was made.
 * @prop {string} updatedAt - The text of the comment.
 * @prop {number} rating - The rating given by the user.
 */

/**
 * 
 * @param {{movieId: string}} param0 
 * @returns 
 */
const MovieComments = ({ movieId }) => {
    const { apiUrl, imageBaseUrl } = useContext(SourceContext); // Assuming you have a context for the API URL
    /**
     * @type {[Comment[], function]}
     */
    const [comments, setComments] = useState([]);

    const parseDateString = (dateString) => {
        const dateParts = dateString.split('T')[0]; // Assuming the date is in YYYY-MM-DD format
        return dateParts.split('-').reverse().join('.'); // Convert to DD.MM.YYYY format
    }

    const fetchReviews = useCallback(async () => {
        try {
            const response = await fetch(`${apiUrl}/reviews?movieId=${movieId}`); // Replace with your API endpoint
            const data = await response.json();
            console.log('Fetched comments:', data); // Debugging line to check the fetched data

            setComments(data); // Assuming the API returns an array of comments
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    }, [movieId, apiUrl]);

    useEffect(() => {
        fetchReviews();
    }, [fetchReviews]);

    if (!comments) return <Loader description='Loading comments...' />; // Assuming you have a Loader component

    const formattedComments = () => {
        return comments.map((comment, index) => (
            <div key={index} className='movie-comment'>
                <p className='movie-comment-title'>
                    <img src={imageBaseUrl + "blank-avatar.png"} alt="U:" className='user-icon' />
                    <strong>{comment.username}</strong>
                </p>
                <p className='movie-comment-info'>
                    <span style={{ marginRight: '10px' }}>{parseDateString(comment.createdAt)}</span>
                    <img src={imageBaseUrl + "rating-star.png"} alt="R:" className='rating-star' />
                    <span>{comment.rating}</span>
                </p>
                <div className='movie-comment-text'>{comment.comment}</div>
            </div>
        ));
    }

    return (
        <ContentBox className='movie-comments'>
            <h2>Comments</h2>
            <div className='movie-comments-list'>
                {comments.length > 0 ? (
                    formattedComments()
                ) : (
                    <p>No comments available.</p>
                )}
            </div>
        </ContentBox>
    );
};

export default MovieComments;  