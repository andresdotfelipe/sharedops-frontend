export const users = [
    {
        _id: '0',
        name: 'User 0',
        description: 'User 0\'s description',
        profilePicUrl: 'https://profilepictures.com/user0',
        favoriteOpinions: ['0', '1'],
        createdAt: 'Fri Mar 26 2021 15:09:45 GMT-0500 (hora estándar de Colombia)',
        modifiedAt: 'Tue Mar 30 2021 13:23:04 GMT-0500 (hora estándar de Colombia)'
    },
    {
        _id: '1',
        name: 'User 1',
        description: 'User 1\'s description',
        profilePicUrl: 'https://profilepictures.com/user1',
        favoriteOpinions: ['2', '1', '0'],
        createdAt: 'Sat Mar 27 2021 13:12:10 GMT-0500 (hora estándar de Colombia)',
        modifiedAt: 'Tue Mar 30 2021 15:04:20 GMT-0500 (hora estándar de Colombia)'
    },
    {
        _id: '2',
        name: 'User 2',
        description: 'User 2\'s description',
        profilePicUrl: 'https://profilepictures.com/user2',
        favoriteOpinions: ['2'],
        createdAt: 'Sun Mar 28 2021 18:40:09 GMT-0500 (hora estándar de Colombia)',
        modifiedAt: 'Tue Mar 30 2021 17:39:23 GMT-0500 (hora estándar de Colombia)'
    }
];

const commentsOpinionZero = [
    {
        author: users[0],        
        body: 'User 0\'s comment in Opinion 0',
        createdAt: 'Wed Mar 31 2021 14:15:38 GMT-0500 (hora estándar de Colombia)'
    },
    {
        author: users[1],        
        body: 'User 1\'s comment in Opinion 0',
        createdAt: 'Wed Mar 31 2021 14:02:10 GMT-0500 (hora estándar de Colombia)'
    },
    {
        author: users[2],        
        body: 'User 2\'s comment in Opinion 0',
        createdAt: 'Wed Mar 31 2021 13:54:11 GMT-0500 (hora estándar de Colombia)'
    }
];

const commentsOpinionOne = [
    {
        author: users[1],        
        body: 'User 1\'s comment in Opinion 1',
        createdAt: 'Wed Mar 31 2021 15:03:34 GMT-0500 (hora estándar de Colombia)'
    },
    {
        author: users[1],        
        body: 'User 1\'s comment in Opinion 1',
        createdAt: 'Wed Mar 31 2021 14:50:12 GMT-0500 (hora estándar de Colombia)'
    },
    {
        author: users[2],        
        body: 'User 2\'s comment in Opinion 1',
        createdAt: 'Wed Mar 31 2021 14:45:22 GMT-0500 (hora estándar de Colombia)'
    }
];

export const opinions = [    
    {
        _id: '2',
        title: 'Opinion 2',
        body: 'Body 2',
        opinionImageUrl: 'https://images.com/2',
        author: users[2],
        comments: [],
        createdAt: 'Mon Mar 29 2021 17:50:32 GMT-0500 (hora estándar de Colombia)',
        modifiedAt: 'Wed Mar 31 2021 17:14:40 GMT-0500 (hora estándar de Colombia)'
    },
    {
        _id: '1',
        title: 'Opinion 1',
        body: 'Body 1',
        opinionImageUrl: 'https://images.com/1',
        author: users[1],
        comments: commentsOpinionOne,
        createdAt: 'Mon Mar 29 2021 15:14:11 GMT-0500 (hora estándar de Colombia)',
        modifiedAt: 'Wed Mar 31 2021 15:03:34 GMT-0500 (hora estándar de Colombia)'
    },    
    {
        _id: '0',
        title: 'Opinion 0',
        body: 'Body 0',
        opinionImageUrl: 'https://images.com/0',
        author: users[0],
        comments: commentsOpinionZero,
        createdAt: 'Mon Mar 29 2021 14:28:30 GMT-0500 (hora estándar de Colombia)',
        modifiedAt: 'Wed Mar 31 2021 14:15:38 GMT-0500 (hora estándar de Colombia)'
    }
];