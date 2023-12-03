const Subscriber = require("../models/SubscriberModel")
const User = require('../models/User');

//new Subscriber
module.exports.newSubscriber = ( async (req, res) => {

    const { name, address, phoneNumber,inscriptionRules, paymentPriceSubscribe,numbersMonth,validity, coordoneesX,coordoneesY,status } = req.body;
    const subscriberAdminId = req.user.id; // Récupérer l'ID de l'utilisateur connecté
    const subscriberAdminUser= await User.findById(subscriberAdminId) //find the pseudo of the admin connected and do the request 

    try {
        const subscriber = await Subscriber.create({
            name,
            address,
            phoneNumber,
            inscriptionRules,
            paymentPriceSubscribe,
            validity,
            numbersMonth,
            status,
            subscriberAdmin: subscriberAdminId, // Assigner l'ID de l'utilisateur connecté comme administrateur de l'abonné
            subscriberAdminName : subscriberAdminUser.pseudo 
        }); 

        // Utiliser populate pour obtenir les informations de l'utilisateur créateur
        // await subscriber.populate('subscriberAdmin').execPopulate();
        //console.log(subscriberAdminUser.pseudo);
        return res.status(201).json({ message: 'Subscriber created successfully', subscriber });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Failed to create subscriber', err });
    }

})

//All Subscribers
module.exports.getAllSubscribers = async (req, res) => {
    try{ 
    const allSubscribers = await Subscriber.find()
    return !allSubscribers ? res.status(404).json({message :"No Subscribers Found!"}) :
        res.status(200).json({ message: "Successfully fetched the data", allSubscribers });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
}

//Single Subscriber by id
module.exports.singleSubscriberById = async (req, res) => {
    try{
    const singleSubscriber = await Subscriber.findById(req.params.id)

    //if no such user exists in db then send error response
    return !singleSubscriber ? res.status(404).json({message :"No Subscribers Found!"}) :
        res.status(200).json({ message: 'successfully found a Subscriber!', singleSubscriber })
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
    }

//Update Subscriber
module.exports.updateSubscriber = async (req, res) => {
    try{
    const { name, address, phoneNumber,validity, paymentPriceSubscribe, status } = req.body;
    const updatedSubscriber = await Subscriber.findOneAndUpdate(
        { _id: req.params.id },
        {
            $set: {
                name: name,
                address: address,
                phoneNumber : phoneNumber,
                validity : validity ,
                paymentPriceSubscribe: paymentPriceSubscribe,
                // status : status
            }
        },
        { new : true } //or used :
    );

    return res.status(200).json({ message: " Successfully update Subscriber", updatedSubscriber });
} catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
}
}

// Delete a single Subscriber from database by its ID
module.exports.removeSubscriber = async (req, res) => {
    try {
        // Supprimer le subscriber en fonction de son ID
        const deletedSubscriber = await Subscriber.findOneAndDelete({ _id: req.params.id });

        if (!deletedSubscriber) {
            // Si le subscriber avec l'ID donné n'a pas été trouvé, renvoyer une erreur 404 (Not Found)
            return res.status(404).json({ message: 'Subscriber not found' });
        }

        // Envoyer une réponse JSON pour indiquer que le subscriber a été supprimé avec succès
        return res.status(204).json({ message: 'Subscriber deleted successfully' });
    } catch (error) {
        // En cas d'erreur lors de la suppression du subscriber, renvoyer une erreur 500 (Internal Server Error)
        return res.status(500).json({ message: 'Failed to delete subscriber', error });
    }
};



//Trying 
// module.exports.newPayment = async (req, res) => {
//     const { date, validateSubscribe, numbersMonth } = req.body;
//     const subscriberAdminId = req.user.id;
//     const comptaAdmin = await User.findById(subscriberAdminId);
//     const subscriberAuthor = await Subscriber.findById(req.params.id);

//     try {
//         const formattedDate = moment(date, "DD/MM/YYYY", true);
//         const formattedValidateSubscribe = moment(validateSubscribe, "DD/MM/YYYY", true);

//         if (!formattedDate.isValid() || !formattedValidateSubscribe.isValid()) {
//             return res.status(400).json({ message: 'Invalid date format' });
//         }

//         const payment = await Payment.create({
//             date: formattedDate.toDate(),
//             validateSubscribe: formattedValidateSubscribe.toDate(),
//             numbersMonth,
//             subscriberAuthorId: subscriberAuthor.id,
//             subscriberAuthorName: subscriberAuthor.name,
//             subscriberAuthorPhoneNumber: subscriberAuthor.phoneNumber,
//             subscriberAuthorPaymentPrice: subscriberAuthor.paymentPriceSubscribe,
//             comptaAdminId: comptaAdmin.id,
//             comptaAdminPseudo: comptaAdmin.pseudo,
//         });

//         return res.status(201).json({ message: 'Payment created successfully', payment });
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({ message: 'Failed to create Payment', err });
//     }
// };






