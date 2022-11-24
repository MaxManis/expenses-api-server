const { Users } = require('../models');

async function getByEmail(email) {
    return await Users.findOne({
        where: {
            email,
        },
    });
}

function normalize({ id, name, email, activationToken }) {
    return { id, name, email, active: activationToken ? false : true};
}

module.exports = {
    getByEmail,
    normalize,
};
