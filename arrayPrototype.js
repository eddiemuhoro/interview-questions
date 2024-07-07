
Array.prototype.checkArray = function () {
   this.map((item, index) => console.log(item))
};

[1, 2, 3].checkArray();
