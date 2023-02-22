#!/bin/bash

PSQL="psql --username=freecodecamp --dbname=number_guess -t --no-align -c"

SECRET_NUMBER=$(( $RANDOM % 1000 + 1 ))
echo SECRET $SECRET_NUMBER

echo "Enter your username:"
read USERNAME

READ_NUMBER() {
  read INPUT_NUMBER
  if ! [[ $INPUT_NUMBER =~ ^[0-9]+$ ]]
  then
    echo "That is not an integer, guess again:"
    READ_NUMBER
  else
    NUMBER_OF_GUESSES=$((NUMBER_OF_GUESSES+1))
  fi
}

if [ ${#USERNAME} -gt 22 ]
then
  echo "Username can not be higher to 22 characters."
else
  USER=$($PSQL "SELECT username, games_played, best_game FROM games WHERE username = '$USERNAME';")

  if [[ -z $USER ]]
  then
    echo "Welcome, $USERNAME! It looks like this is your first time here."
    INSERT_USER_RESULT=$($PSQL "INSERT INTO games(username) VALUES('$USERNAME');")
  else
    echo "$USER" | while IFS='|' read USERNAME GAMES_PLAYED BEST_GAME
    do
      echo "Welcome back, $USERNAME! You have played $GAMES_PLAYED games, and your best game took $BEST_GAME guesses."
    done
  fi

  echo "Guess the secret number between 1 and 1000:"
  READ_NUMBER
  NUMBER_OF_GUESSES=1
  while [ $INPUT_NUMBER != $SECRET_NUMBER ]; do
    if [ $SECRET_NUMBER -lt $INPUT_NUMBER ]
    then
      echo "It's lower than that, guess again:"
    else
      echo "It's higher than that, guess again:"
    fi

    READ_NUMBER
  done

  if [[ $NUMBER_OF_GUESSES -lt $BEST_GAME || -z $BEST_GAME ]]
  then
    UPDATE_BEST_RESULT=$($PSQL "UPDATE games SET best_game = $NUMBER_OF_GUESSES WHERE username = '$USERNAME';")
  fi

  GAMES_PLAYED=$((GAMES_PLAYED+1))
  UPDATE_GAMES_RESULT=$($PSQL "UPDATE games SET games_played = $GAMES_PLAYED WHERE username = '$USERNAME';")
  echo "You guessed it in $NUMBER_OF_GUESSES tries. The secret number was $SECRET_NUMBER. Nice job!"
fi
