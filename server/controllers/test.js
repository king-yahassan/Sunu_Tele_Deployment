// const Test = require("../models/test");
// const cron = require('node-cron');

// let iterations = 0;
// const maxIterations = 5;

// module.exports.scheduledTask = cron.schedule('* * * * *', async () => {
//     try {
//         if (iterations < maxIterations) {
//             const date = new Date();
//             const value = `Test value ${iterations + 1}`;
            
//             const test = await Test.create({
//                 date,
//                 value
//             });

//             iterations++;

//             console.log("Test created:", test);

//             if (iterations >= maxIterations) {
//                 // Arrêter la tâche après 5 ajouts
//                 scheduledTask.destroy();
//                 console.log("Scheduled task stopped after reaching max iterations.");
//             }
//         }
//     } catch (error) {
//         console.error("Error in scheduled task:", error);
//     }
// });


// module.exports.showTest = async (req, res) => {
//     try {
//         const tests = await Test.find();
//         return res.status(200).json({ message: "Tests found", tests });
//     } catch (error) {
//         return res.status(500).json({ message: "Error finding tests", error });
//     }
// };
