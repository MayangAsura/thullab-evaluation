package main

import (
	"fmt"
	"net/http"
	"encoding/json"

	"github.com/google/uuid"

	"github.com/MayangAsura/thullab-evaluation/internal/database"

)

func (apiCnfg *apiConfig) handlerCreateStudentAchievement(w http.ResponseWriter, r *http.Request){

	type parameters struct {
		UserID uuid.UUID `json:"user_id"`
		ClassID uuid.UUID `json:"class_id"`
		SkillID uuid.UUID `json:"skill_id"`
	}

	decoder := json.NewDecoder(r.Body)

	params := parameters{}

	err := decoder.Decode(&params)

	if err != nil {
		respondWithError(w, 400, fmt.Sprint("Error when parsing json: %v", err))
		return
	}

	student_achievements, err := apiCnfg.DB.CreateStudentAchievement(r.Context(), database.CreateStudentAchievementParams{
		UserID: params.UserID,
		ClassID: params.ClassID,
		SkillID: params.SkillID,
	})

	if err != nil {
		respondWithError(w, 400, fmt.Sprint("Error when save student achievement: %s", err))
		return
	}

	respondWithJson(w, 200, student_achievements)
}

func (apiCnfg *apiConfig) handleGetMyAchievements(w http.ResponseWriter, r *http.Request, user database.User){

	student_achievements, err := apiCnfg.DB.GetStudentAchievements(r.Context(), user.ID)

	if err != nil {
		respondWithError(w, 400, fmt.Sprint("Error when get student achievement: %v", err))
		return
	}

	// for _, student_achievement := range student_achievements {

	// 	class, err := apiCnfg.DB.GetClassByID(r.Context(), student_achievement.ClassID)

	// 	if err != nil {
	// 		respondWithError(w, 400, fmt.Sprint("Error when get class: %v", err))
	// 		return
	// 	}

	// 	skill, err := apiCnfg.DB.GetSkillByID(r.Context(), student_achievement.SkillID)

	// 	if err != nil {
	// 		respondWithError(w, 400, fmt.Sprint("Error when get skill: %v", err))
	// 		return
	// 	}

	// }

	respondWithJson(w, 200, databaseStudentAchievementsToStudentAchievements(student_achievements))
}