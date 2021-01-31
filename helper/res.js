"use strict";

class res {
  static ok(values, res) {
    var data = {
      status: 200,
      values: values,
    };
    res.json(data);
    res.end();
  }
  static Created(values, res) {
    var data = {
      status: 201,
      values: values,
    };
    res.json(data, "success adding data");
    res.end();
  }
  static Updated(values, res) {
    const data = {
      status: 201,
      values: values,
    };
    res.json(data, "success updating data");
    res.end();
  }
}
module.exports = res;
