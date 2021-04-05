'use strict';

const {
    app,
} = require('./server');

app.listen(3015, () => {
    console.log('Listening on 3015');
});
