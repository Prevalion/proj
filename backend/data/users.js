import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Tarek',
        email: 'tarek@tarek.tn',
        password : bcrypt.hashSync('moi',10),
        isAdmin : true
    },
    {
        name: 'User',
        email: 'user@user.tn',
        password : bcrypt.hashSync('fahd',10),
        isAdmin : false
    }
];

export default users