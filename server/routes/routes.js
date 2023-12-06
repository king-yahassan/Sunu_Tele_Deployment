const router = require("express").Router() ;

const AuthUser = require('../middleware/Authorization');
// const Auth = require("../controllers/Auth")
const Auth = require("../controllers/Auth")
const Subscriber = require("../controllers/SubscriberController");
const Admins = require("../controllers/AdminsController.JS");
const Payment = require("../controllers/PaymentController")
const geoDataController = require('../controllers/GeoDataController');


//Authentification
router.post("/signup",AuthUser.authenticateSuperAdmin, Auth.signUP) ;
router.post("/signin", Auth.signIn);

//crud Subscriber the IDs came from  the Subscribers
router.post("/newSubscriber",AuthUser.authenticateUser,Subscriber.newSubscriber);
router.get('/subscribers',Subscriber.getAllSubscribers);
router.get("/showSubscriber/:id" ,Subscriber.singleSubscriberById)
router.put('/update/:id',AuthUser.authenticateUser,Subscriber.updateSubscriber);
router.delete('/removeSubscriber/:id',AuthUser.authenticateUser,Subscriber.removeSubscriber);

// Controller Admins the IDs came on  the Admins

router.get('/admins',AuthUser.authenticateSuperAdmin,Admins.getAllUsers);
router.get("/showAdmin/:id" ,AuthUser.authenticateSuperAdmin,Admins.singleUserById)
router.put('/updateAdmin/:id',AuthUser.authenticateSuperAdmin,Admins.updateUser);
router.delete('/removeAdmin/:id',AuthUser.authenticateSuperAdmin,Admins.removeUser);

// Payments routes the IDs came newPayment and PaymentsSubscriber  on the Subscribers
// The IDs showPayment and removeSubscriber came from payments

router.post("/newPayment/:id",AuthUser.authenticateAdminCompta,Payment.newPayment);
router.get('/Payments',Payment.getAllPayments);
router.get('/paymentsSubscriber/:id',Payment.getAllPaymentsSubscriber);
router.get("/showPayment/:id" ,Payment.singlePaymentById)  
router.delete('/removeSubscriber/:id',AuthUser.authenticateAdminCompta,Payment.removePayment);
router.get('/payments/groupedByDate', Payment.groupPaymentsByDate);

//  données géospatiales
router.post('/newCartography', geoDataController.createGeoData);
router.get('/allCartography', geoDataController.getAllGeoData);

// router.get("/showPayment/:id1/:id2" ,Payment.singlePaymentById)  
// router.delete('/removeSubscriber/:id1/:id2',ComptaAdmin.authenticateAdminCompta,Payment.removePayment);



// Route avec deux IDs différents les ids sont à refaire pour plus de calarté 
// router.get('/items/:id1/:id2', (req, res) => {
//     const id1 = req.params.id1;
//     const id2 = req.params.id2;



// test
// router.post("/newTest",Test.scheduledTask)
// router.get("/tests", Test.showTest)

module.exports = router ;