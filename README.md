# Kafka booking handler

- This script is made with following tech-stack:
    - NodeJS
    - ExpressJS
    - Kafka-Node
    - PostgreSQL
    - Docker
- This script creates a docker for kafka, zookeeper and for a producer and consumer.
- Produces gets the post data and it send it to kafka brokers
- Kafka brokers have consumer subscribed to that topic to which this data is passed.
- Consumer here will take the data and insert it to the postgreSql database

