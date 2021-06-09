export const parseOpinionsAndCommentsDate = opinions => {
    opinions.forEach(opinion => {
        opinion.createdAt = String(new Date(opinion.createdAt));
        opinion.updatedAt = String(new Date(opinion.updatedAt));
        opinion.comments.forEach(comment => {
            comment.createdAt = String(new Date(comment.createdAt));
            comment.updatedAt = String(new Date(comment.updatedAt));
        });
    });
    return opinions;
};

export const parseCommentsDate = comments => {
    comments.forEach(comment => {
        comment.createdAt = String(new Date(comment.createdAt));
        comment.updatedAt = String(new Date(comment.updatedAt));        
    });
    return comments;
};