const User = require('../models/User');


//All Admins
module.exports.getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find()
        return !allUsers ? "No Users Found!" :
            res.status(200).json({ message: "Successfully fetched the data", allUsers });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
}

//Single User by id
module.exports.singleUserById = async (req, res) => {
    const singleUser = await User.findById(req.params.id)

    //if no such user exists in db then send error response
    return !singleUser ? "User Not found" :
        res.status(200).json({ message: 'successfully found a User!', singleUser })
}

//Update User
module.exports.updateUser = async (req, res) => {
    try {
        const { pseudo, email, role } = req.body;
        const updatedUser = await User.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    pseudo: pseudo,
                    email: email,
                    role: role,
                }
            },
            { new: true } //or used :
        );

        return res.status(200).json({ message: " Successfully update User", updatedUser });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
}


// Delete a single User from database by its ID
module.exports.removeUser = async (req, res) => {
    try {
        // Supprimer le User en fonction de son ID
        const deletedUser = await User.findOneAndDelete({ _id: req.params.id });

        if (!deletedUser) {
            // Si le User avec l'ID donné n'a pas été trouvé, renvoyer une erreur 404 (Not Found)
            return res.status(404).json({ message: 'User not found' });
        }

        // Envoyer une réponse JSON pour indiquer que le Admin a été supprimé avec succès
        return res.status(204).json({ message: 'User deleted successfully' });
    } catch (error) {
        // En cas d'erreur lors de la suppression du User, renvoyer une erreur 500 (Internal Server Error)
        return res.status(500).json({ message: 'Failed to delete User', error });
    }
};





