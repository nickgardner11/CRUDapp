module.exports = {
    // Load the form to add a player - GET
    addPostPage: function (request, response) {
        // Load the page
        response.render('edit-post', {add: true});
    },

    // Add a player to the database - POST
    addPost: function (request, response) {
        // Load values from the POST request
        let title = request.body.title;
        let author = request.body.author;
        let topic = request.body.topic;
        let date = request.body.date;

        // Query to add the new player to the database
        let query = `INSERT INTO articles (title, author, topic, date)
            VALUES ('${title}', '${author}', '${topic}', ${date});`;

        db.query(query, function (error, result) {
            if (error) {
                // Send server error
                return response.status(500).send(error);
            }

            // New player added successfully, reload homepage
            response.redirect('/');
        });
    },
    editPostPage: function (request, response) {
        console.log(request.params.id);
        response.render('edit-post');
    },

    editPostPage: function (request, response) {
        // Get player ID from the request
        let postId = request.params.id;
    
        // Query to find information about the player with the given ID
        let query = `SELECT * FROM articles WHERE id = ${postId};`;
    
        // Execute the query
        db.query(query, function (error, result) {
            if (error) {
                // Send server Error
                return response.status(500).send(error);
            }
    
            console.log(result[0]);
    
            // Load the page
            response.render('edit-post', {
                add: false,
                post: result[0]
            });
        });
    },

    deletePost: function (request, response) {
        let postId = request.params.id;

        // Query to delete the given player
        let query = `DELETE FROM articles WHERE id = ${postId};`;
    
        db.query(query, function (error, result) {
            if (error) {
                // Send server error
                return response.status(500).send(error);
            }
    
            // Delete successful, return to homepage
            response.redirect('/');
        });
    },

    // Update a player in the database - POST
editPlayer: function (request, response) {
    // Get values from the request
    let postId = request.params.id;
    let title = request.body.title;
    let author = request.body.author;
    let topic = request.body.topic;
    let date = request.body.date;

    // Query to update the existing player
    let query = `UPDATE articles
        SET title = '${title}', author = '${author}', topic = '${topic}', date = ${date}
        WHERE id = ${postId};`;

    // Execute the query
    db.query(query, function (error, result) {
        if (error) {
            // Send server error
            return response.status(500).send(error);
        }

        // Update successful, return to homepage
        response.redirect('/');
    });
},
}

