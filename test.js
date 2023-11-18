const { items } = require("./payment-services/app/models");

function main() {
  console.log("Hello world");
  const arr1 = [
    { id: "1", name: "resa" },
    { id: "2", name: "rudi" },
  ];
  const filteredArray = arr1.filter((item) => item.id == "2");
  console.log(filteredArray);
}
main();
