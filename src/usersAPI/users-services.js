const { Users } = require('../models');

async function getByEmail(email) {
    return await Users.findOne({
        where: {
            email,
        },
    });
}

function normalize({id, name, email}) {
    return {id ,name, email};
}

module.exports = {
    getByEmail,
    normalize,
};
