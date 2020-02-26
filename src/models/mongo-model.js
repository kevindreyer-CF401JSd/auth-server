// class of generic mongoose model
class Model {
  constructor (schema) {
    this.schema = schema;
  }

  create (record) {
    const newRecord = new this.schema(record);
    return newRecord.save();
  }

  read (id) {
    const queryObject = id ? { _id: id } : {};
    return this.schema.find(queryObject);
  }

}

module.exports = Model;