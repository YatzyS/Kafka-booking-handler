const avro = require('avsc');
const avroSchema = {
  "name": "mytable",
  "type": "record",
  "fields": [
    {
      "name": "user_id",
      "type": "int"
    },
    {
      "name": "vehicle_model_id",
      "type": "int"
    },
    {
      "name": "package_id",
      "type": ["null", "int"],
      "default": null
    },
    {
      "name": "travel_type_id",
      "type": "int"
    },
    {
      "name": "from_area_id",
      "type": ["null", "int"],
      "default": null
    },
    {
      "name": "to_area_id",
      "type": ["null", "int"],
      "default": null
    },
    {
      "name": "from_city_id",
      "type": ["null", "int"],
      "default": null
    },
    {
      "name": "to_city_id",
      "type": ["null", "int"],
      "default": null
    },
    {
      "name": "from_date",
      "type": {
      	"type":"long",
	"logicalType": "date"
      } 
    },
    {
      "name": "to_date",
      "type": ["null",{
      	"type":"long",
	"logicalType": "date"
      }], 
      "default": null
    },
    {
      "name": "online_booking",
      "type": "int"
    },
    {
      "name": "mobile_site_booking",
      "type": "int"
    },
    {
      "name": "booking_created",
      "type": {
      	"type":"long",
	"logicalType": "date"
      }    
    },
    {
      "name": "from_lat",
      "type": ["null","double"],
      "default": null
    },
    {
      "name": "from_long",
      "type": ["null","double"],
      "default": null
    },
    {
      "name": "to_lat",
      "type": ["null","double"],
      "default": null
    },
    {
      "name": "to_long",
      "type": ["null","double"],
      "default": null
    },
    {
      "name": "car_cancellation",
      "type": "int"
    }
  ]
};

const type = avro.parse(avroSchema)
console.log(type)

module.exports = type;

