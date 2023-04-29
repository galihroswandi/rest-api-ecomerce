const dbPool = require('./../config/database');

const getAllUsers = () => {
    const SQLQuery = 'SELECT * FROM users';

    return dbPool.execute(SQLQuery);
}

const findUser = (id_user) => {
    const SQLQuery = `SELECT * FROM users WHERE id_user='${id_user}'`;

    return dbPool.execute(SQLQuery);
}

const createNewUser = (body) => {
    const SQLQuery = `  INSERT INTO users (name, email, password, address) 
                        VALUES ('${body.name}', '${body.email}', '${body.password}', '${body.address}')`;

    return dbPool.execute(SQLQuery);
}

const updateUser = (body, id_user) => {
    const SQLQuery = `  UPDATE users 
                        SET 
                            name='${body.name}', 
                            email='${body.email}', 
                            address='${body.address}' 
                        WHERE id_user='${id_user}'`;
    return dbPool.execute(SQLQuery);
}

const deleteUser = (id_user) => {
    const SQLQuery = `DELETE FROM users WHERE id_user='${id_user}'`;

    return dbPool.execute(SQLQuery);
}

module.exports = { getAllUsers, createNewUser, updateUser, deleteUser, findUser };