
exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl=>{
    tbl.increments('id');

    tbl.string('vin', 32)
      .notNullable()
      .unique()
      .index();

    tbl.string('make', 64)
      .notNullable()
      .index();
    
    tbl.string('model', 64)
      .notNullable()
      .index();
    
    tbl.integer('mileage')
      .notNullable()
      .index();

    tbl.string('transType', 64)
        .index();
    
    tbl.string('titleStatus', 128)
      .index();

  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars')
};
