package main

import (

	"fmt"

	"net/http"
	"time"
	"encoding/json"

	"golang.org/x/crypto/bcrypt"

	"github.com/MayangAsura/thullab-evaluation/internal/database"

)

func (apiCnfg *apiConfig) handleLogin(w http.ResponseWriter, r *http.Request){
	type parameters struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}

	decoder := json.NewDecoder(r.Body)

	params := parameters{}

	err := decoder.Decode(&params)

	if err != nil {
		respondWithError(w, 400, fmt.Sprint("Error when decode body: %v", err))
		return
	}

	user, err := apiCnfg.DB.GetUserByUsername(r.Context(), params.Username)

	if err != nil {
		respondWithError(w, 400, fmt.Sprint("Username or password wrong."))
		return
	}

	match := VerifyPassword(params.Password, user.Password)

	if match != true {
		respondWithError(w, 400, fmt.Sprint("Username or password wrong."))
		return
	}





	// return respondWithJson(w, 200, fmt.Sprint("You are successfully login."))
	return
}

func (apiCnfg *apiConfig) handleRegister(w http.ResponseWriter, r *http.Request){
	// return respondWithJson(w, 200, fmt.Sprint("Your are successfully registerred."))
	return

}

// -- from article: HashPassword generates a bcrypt hash for the given password.
func HashPassword(password string) (string, error) {
    bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
    return string(bytes), err
}

// -- from article: VerifyPassword verifies if the given password matches the stored hash.
func VerifyPassword(password, hash string) bool {
    err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
    return err == nil
}

func (apiCnfg *apiConfig) ResetPassword(w http.ResponseWriter, r *http.Request, user database.User){

	type parameters struct {
		NewPassword string `json:"new_password"`
	}

	decoder := json.NewDecoder(r.Body)

	params := parameters{}

	err := decoder.Decode(&params)

	if err != nil {
		respondWithError(w, 400, fmt.Sprint("Error when parse json: %v", err))
		return
	}

	_, errUser := apiCnfg.DB.GetUserByUsername(r.Context(), user.PhoneNumber)

	if errUser != nil {
		respondWithError(w, 400, fmt.Sprint("User not found: %v", errUser))
		return
	}

	hash, _ := HashPassword(params.NewPassword)


	errUpdate := apiCnfg.DB.UpdateUserPassword(r.Context(), database.UpdateUserPasswordParams{
		PhoneNumber: user.PhoneNumber,
		Password: hash,
		UpdatedAt: time.Now(),
	})

	if errUpdate != nil {
		respondWithError(w, 400, fmt.Sprint("Error when reset user password: %v", errUpdate))
		return
	}

	respondWithJson(w, 200, fmt.Sprint("Successfully updated user password."))
}

func (apiCnfg *apiConfig) ForgotPassword(w http.ResponseWriter, r *http.Request){

	type parameters struct {
		Username string `json:"username"`
		NewPassword string `json:"new_password"`
	}

	decoder := json.NewDecoder(r.Body)

	params := parameters{}

	err := decoder.Decode(&params)

	if err != nil {
		respondWithError(w, 400, fmt.Sprint("Error when parse json: %v", err))
		return
	}

	_, errUser := apiCnfg.DB.GetUserByUsername(r.Context(), params.Username)

	if errUser != nil {
		respondWithError(w, 400, fmt.Sprint("User not found: %v", errUser))
		return
	}

	hash, _ := HashPassword(params.NewPassword)


	errUpdate := apiCnfg.DB.UpdateUserPassword(r.Context(), database.UpdateUserPasswordParams{
		PhoneNumber: params.Username,
		Password: hash,
		UpdatedAt: time.Now(),
	})

	if errUpdate != nil {
		respondWithError(w, 400, fmt.Sprint("Error when reset user password: %v", errUpdate))
		return
	}

	respondWithJson(w, 200, fmt.Sprint("Successfully updated user ppassword."))
}