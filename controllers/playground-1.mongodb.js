/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.

// Select the database to use.
use("admin"); // or "Rebound" if that's your actual DB name

// Insert a sample user document into the User collection
// db.User.insertOne({
//   UserID: 1,
//   FullName: "Nguyễn Kim",
//   PhoneNumber: "0901234567",
//   Sex: "Female",
//   Email: "kim@example.com",
//   DateOfBirth: new Date("1998-05-21"),
//   RegistrationDate: new Date(),
//   AvatarURL: "https://example.com/avatar.jpg",
//   Username: "kim123",
//   Password: "123456",
//   UserRanking: "Bạc"
// });
db.User.find().pretty();
