/* schema for bets and users table. */ 

CREATE DATABASE BET_TRACKER; 

CREATE TABLE bets(
    bet_id SERIAL PRIMARY KEY,
    wager INTEGER,
    odds FLOAT,
    result BOOLEAN, 
    date date
); 

CREATE TABLE users(
    username VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255)
); 
