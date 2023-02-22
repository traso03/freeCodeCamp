#!/bin/bash

PSQL="psql -X --username=freecodecamp --dbname=salon --tuples-only -c"

echo -e "\n~~~~~ MY SALON ~~~~~\n"
echo "Welcome to My Salon, how can I help you?"

MAIN_MENU() {
  if [[ $1 ]]
  then
    echo -e "\n$1"
  fi

  SERVICES=$($PSQL "SELECT service_id, name FROM services ORDER BY service_id;")
  echo "$SERVICES" | while read SERVICE_ID BAR NAME
  do
    echo -e "$SERVICE_ID) $NAME"
  done
  read SERVICE_ID_SELECTED

  case $SERVICE_ID_SELECTED in
    1) SERVICE_MENU ;;
    2) SERVICE_MENU ;;
    3) SERVICE_MENU ;;
    4) SERVICE_MENU ;;
    5) SERVICE_MENU ;;
    *) MAIN_MENU "I could not find that service. What would you like today?" ;;
  esac
}

SERVICE_MENU() {
  # get customer info
  echo -e "\nWhat's your phone number?"
  read CUSTOMER_PHONE

  CUSTOMER_NAME=$($PSQL "SELECT name FROM customers WHERE phone = '$CUSTOMER_PHONE'")

  if [[ -z $CUSTOMER_NAME ]]
  then
    echo -e "\nI don't have a record for that phone number, what's your name?"
    read CUSTOMER_NAME

    INSERT_CUSTOMER_RESULT=$($PSQL "INSERT INTO customers(name, phone) VALUES('$CUSTOMER_NAME', '$CUSTOMER_PHONE')") 
  fi

  CUSTOMER_ID=$($PSQL "SELECT customer_id FROM customers WHERE phone='$CUSTOMER_PHONE'")

  echo -e "\nWhat time would you like your cut, $(echo $CUSTOMER_NAME | sed -r 's/^ *| *$//g')?"
  read SERVICE_TIME
  
  INSERT_APPOINTMENT_RESULT=$($PSQL "INSERT INTO appointments(time, customer_id, service_id) VALUES('$SERVICE_TIME', $CUSTOMER_ID, $SERVICE_ID_SELECTED)")

  echo -e "\nI have put you down for a cut at $SERVICE_TIME, $(echo $CUSTOMER_NAME | sed -r 's/^ *| *$//g')."
}

MAIN_MENU

