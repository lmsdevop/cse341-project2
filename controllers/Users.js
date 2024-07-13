const User = require('../models/Users')

const getAllUsers = async (req, res) => {
    //#swagger.tags=['Users']    

    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

const getSingleUser = async (req, res) => {
    //#swagger.tags=['Users']    

    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        res.status(200).json(user);
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
};

const createUser = async (req, res) => {
    //#swagger.tags=['Users']    
    try {
        const body = req.body
        const newUser = new User(body);
        await newUser.save();
        console.log('User created:', newUser);
        return res.status(204).json(newUser);
    } catch (err) {
        console.error('Error creating user:', err);
        throw err;
    }
};

const updateUser = async (req, res) => {
    //#swagger.tags=['Users']    
    try {
        const userId = req.params.id;
        const { username, email, password, role } = req.body;
        
        const updatedUser = await User.findByIdAndUpdate(userId, {
            username,
            email,
            password,
            role,
            updatedAt: new Date(),
        }, { new: true });
        
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        res.status(204).json(updatedUser);
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ error: 'Failed to update user' });
    }
};

const deleteUser = async (req, res) => {
    //#swagger.tags=['Users']    
    
    try {
        const userId = req.params.id;
        const deleteUser = await User.findByIdAndDelete(userId);
        
        if (!deleteUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        res.status(204).send();
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ error: 'Failed to delete user' });
    }
};

module.exports ={
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
}