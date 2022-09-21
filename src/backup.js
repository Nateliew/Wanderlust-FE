// const getUser = async () => {
//   let initialUser = await axios.get(
//     `${process.env.REACT_APP_API_SERVER}/users`
//   );
//   setUser(initialUser.data);
// };

// useEffect(() => {
//   getUser();
// }, [trips]);

// console.log(user);

//example
// async updateTrip(req, res) {
//   try {
//     await this.model
//       .update(req.body, {
//         where: {
//           id: req.body.id,
//         },
//       })
//       .then((result) => {
//         // check the first element in the array if there are rows affected
//         if (result[0] > 0) {
//           res.status(200).send({ message: "data found" });
//         } else {
//           return res.status(422).send({ message: "no data found" });
//         }
//       });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({ message: "updating table failed" });
//   }
// }

// async getAllTrips(req, res) {
//   const { userId } = req.body;
//   try {
//     const trips = await this.model.findAll({
//       model: this.userTripModel,
//       through: { attributes: [] },
//       where: {
//         id: userId,
//       },
//     });
//     return res.json(trips);
//   } catch (err) {
//     return res.status(400).json({ error: true, msg: err });
//   }
// }

<div
  style={{
    borderBottom: "solid 1px",
    paddingBottom: "1rem",
    display: "flex",
    justifyContent: "space-around",
    fontSize: "16px",
  }}
>
  <Link to="calendar">Calendar | </Link>
  <Link to="wishlist">Wishlist | </Link>
  <Link to="packinglist">Packing List |</Link>
  <a href="">Add friend</a>
</div>;
