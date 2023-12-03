const Payment = require("../models/PaymentModel")
const User = require('../models/User');
const Subscriber = require("../models/SubscriberModel")


//new Payment
module.exports.newPayment = ( async (req, res) => {

    const { date, validateSubscribe, numbersMonth } = req.body;
    const subscriberAdminId = req.user.id; // Récupérer l'ID de l'utilisateur connecté
    const comptaAdmin= await User.findById(subscriberAdminId) //recover the pseudo of the admin connected and to do the request 
    const subscriberAuthor = await Subscriber.findById(req.params.id)   //  recover the subscriber, who must pay her subscribe
    //console.log("+++++++++++",subscriberAuthor);

    try {
        const payment = await Payment.create({
            date,
            validateSubscribe ,
            numbersMonth,
            // sum : numbersMonth * subscriberAuthor.paymentPriceSubscribe,
            subscriberAuthorId : subscriberAuthor.id,
            subscriberAuthorName : subscriberAuthor.name,
            subscriberAuthorPhoneNumber : subscriberAuthor.phoneNumber,
            subscriberAuthorPaymentPrice : subscriberAuthor.paymentPriceSubscribe,
            comptaAdminId: comptaAdmin.id, // Assigner l'ID de l'utilisateur connecté comme administrateur qui doit effectuer les paiements
            comptaAdminPseudo : comptaAdmin.pseudo 
        }); 

        // Utiliser populate pour obtenir les informations de l'utilisateur créateur
        // await Payment.populate('subscriberAdmin').execPopulate();
        return res.status(201).json({ message: 'Payment created successfully', payment });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Failed to create Payment', err });
    }

})

//All Payments 
module.exports.getAllPayments = async (req, res) => {
    try{
    const allPayments = await Payment.find()
    return !allPayments ? res.status(404).json({message : "Not Payment Found !!!"}) :
        res.status(200).json({ message: "Successfully fetched the data", allPayments });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
    }

//All Payments for one Subscriber
module.exports.getAllPaymentsSubscriber = async (req, res) => {
    try{
    const subscriberAuthor = await Subscriber.findById(req.params.id)   //  recover the subscriber, who must pay her subscribe
    const allPaymentsSubscriber = await Payment.find()
    if (!subscriberAuthor) {
        return res.status(404).json({message : "Subscriber not found"})
    }
    if (!allPaymentsSubscriber) {
        return res.status(404).json({message : "No Payments Found!"})
    }
        return res.status(200).json({ message: "Successfully fetched the data", allPaymentsSubscriber });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
    }

//Single Payment by id
module.exports.singlePaymentById = async (req, res) => {
    try{
    // const subscriberAuthor = await Subscriber.findById(req.params.id1)   //  recover the subscriber, who must pay her subscribe
    const singlePayment = await Payment.findById(req.params.id2)
    // if(subscriberAuthor.id !== singlePayment.subscriberAuthorId ){
    //     return res.status(409).json({message: "It's not the Author Subscriber"})
    // }
    //if no such user exists in db then send error response
    return !singlePayment ? res.status(404).json({message : "Payment Not found"}) :
        res.status(200).json({ message: 'successfully found a Payment!', singlePayment })
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
    }

// Delete a single Payment from database by IDs
module.exports.removePayment = async (req, res) => {

    try {
        // Supprimer le Payment en fonction de son ID
        const deletedPayment = await Payment.findOneAndDelete({ _id: req.params.id });

        if (!deletedPayment) {
            // Si le Payment avec l'ID donné n'a pas été trouvé, renvoyer une erreur 404 (Not Found)
            return res.status(404).json({ message: 'Payment not found' });
        }

        // Envoyer une réponse JSON pour indiquer que le Payment a été supprimé avec succès
        return res.status(204).json({ message: 'Payment deleted successfully' });
    } catch (error) {
        // En cas d'erreur lors de la suppression du Payment, renvoyer une erreur 500 (Internal Server Error)
        return res.status(500).json({ message: 'Failed to delete Payment', error });
    }
};


// Fonction pour regrouper les paiements par date
module.exports.groupPaymentsByDate = async (req, res) => {
    try {
        const groupedPayments = await Payment.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: "$date" },
                        month: { $month: "$date" },
                        day: { $dayOfMonth: "$date" }
                    },
                    totalPayments: { $sum: 1 },
                    payments: { $push: "$$ROOT" }
                }
            },
            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1,
                    "_id.day": 1
                }
            }
        ]);

        return res.status(200).json({ message: "Payments grouped by date", groupedPayments });
    } catch (error) {
        return res.status(500).json({ message: "Error grouping payments by date", error });
    }
};



//trying a new api create payment with th format DD/MM/YYYY
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

