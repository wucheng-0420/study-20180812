import(
    /* webpackChunkName: "u" */
    "./User"
).then(User => {
  const u = new User.default("ND", 18);
  console.log(u.toString());
});
