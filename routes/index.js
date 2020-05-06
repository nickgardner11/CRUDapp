module.exports = {
    getHomePage: function (request, response) {
        // Query database to get all the players
        let query = 'SELECT * FROM articles ORDER BY id ASC'; 

        // Reponse to query
        function queryCallback(error, result) {
            if (error) {
                // Send server error
                return response.status(418).send(error);
            }

            let renderData = {
                articles: result
            }

            response.render('index', renderData);
        }

        // Execute query
        db.query(query, queryCallback);
    },
};