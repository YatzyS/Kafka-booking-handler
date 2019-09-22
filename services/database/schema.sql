CREATE TABLE bookings(
   id                  SERIAL  NOT NULL PRIMARY KEY 
  ,user_id             INTEGER  NOT NULL
  ,vehicle_model_id    INTEGER  NOT NULL
  ,package_id          INTEGER 
  ,travel_type_id      INTEGER  NOT NULL
  ,from_area_id        INTEGER 
  ,to_area_id          INTEGER 
  ,from_city_id        INTEGER 
  ,to_city_id          INTEGER 
  ,from_date           TIMESTAMP NOT NULL
  ,to_date             TIMESTAMP
  ,online_booking      BIT  NOT NULL
  ,mobile_site_booking BIT  NOT NULL
  ,booking_created     TIMESTAMP NOT NULL
  ,from_lat            NUMERIC(9,6)
  ,from_long           NUMERIC(9,6)
  ,to_lat              NUMERIC(9,6)
  ,to_long             NUMERIC(9,6)
  ,Car_Cancellation    BIT  NOT NULL
);

