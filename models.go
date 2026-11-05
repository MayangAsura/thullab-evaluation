package main

import (
	"time"

	"github.com/google/uuid"

	"database/sql"

	"github.com/MayangAsura/thullab-evaluation/internal/database"

)

type User struct {
	ID uuid.UUID `json:"id"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	Name string `json:"name"`
	APIKey string `json:"api_key"`
}

type Student struct {
	ID uuid.UUID `json:"id"`
	Name string `json:"name"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	PhoneNumber string `json:"phone_number`
	Email string `json:"email"`
	Address string `json:"address"`
}

type Class struct {
	ID uuid.UUID `json:"id"`
	Name string `json:"name"`
	Level string `json:"level"`
	Image string `json:"image"`
	CategoryID uuid.UUID `json:"category_id"`
	LearningHour int64 `json:"learning_hour"`
}

type ClassDetail struct {
	ID uuid.UUID `json:"id"`
	Name string `json:"name"`
	Level string `json:"level"`
	CategoryID uuid.UUID`json:"category_id"`
	Image string `json:"image"`
	LearningHour int64 `json:"learning_hour"`
	Skills []ClassSkill `json:"skills"`
	Speakers []SpeakerClass `json:"speakers"`
	CreatedBy uuid.UUID`json:"created_by"`
}

type LearningContent struct {
	Name *string `json:"Name"`
	ContentType *string `json:"content_type"`
	Level *string `json:"level"`
	Class *Class `json:"class"`
	Skills *[]Skill `json:"skills"`
	LearningHours *int64 `json:"learning_hours"`
	Duration *int64 `json:"duration"`
	NumQuestions *int64 `json:"num_questions"`
	MaxPoints *int64 `json:"max_points"`
	IsRandomQuestions *bool `json:"is_random_questions"`
	IsRandomAnswers *bool `json:"is_random_answers"`
	QuestionTypes *string `json:"question_types"`
	Status *string `json:"status"`
	Questions *[]LearningQuestion `json:"questions"`
}

type LearningQuestion struct {
	LearningID uuid.UUID `json:"learning_id"`
	ClassID uuid.UUID `json:"class_id"`
	Question *string `json:"question"`
	QuestionType *string `json:"question_type"`
	Answer *string `json:"answer"`
	Score *string `json:"score"`
}

type LearningResponse struct {
	LearningID *uuid.UUID`json:"evaluation_id"`
	ClassId *uuid.UUID`json:"class_id"`
	UserId *int64 `json:"user_id"`
	Scores *int64 `json:"scores"`
	CreatedBy *uuid.UUID`json:"created_by"`
}

type Skill struct {
	ID uuid.UUID `json:"id"`
	Name string `json:"name"`
}

type ClassSkill struct {
	ID uuid.UUID `json:"id"`
	Name string `json:"name"`
}

type SpeakerClass struct {
	UserID uuid.UUID `json:"user_id"`
	Name *string `json:"name"`
	PhoneNumber *string `json:"phone_number"`
}

type File struct {
	ID uuid.UUID `json:"id"`
	Name *string `json:"name"`
	FileType *string `json:"file_type"`
	FileUrl *string `json:"file_url"`
	Size *int64 `json:"size"`
}

type Registrant struct {
	ID *uuid.UUID `json:"id"`
	Name *string `json:"name"`
	PhoneNumber *string `json:"phone_number"`
	Email *string `json:"email"`
	CreatedAt *time.Time `json:"created_at"`
	Address *string `json:"address"`
	Job *string `json:"job"`
}

type StudentAchievement struct {
	ID uuid.UUID `json:"id"`
	ClassID uuid.UUID `json:"class_id"`
	UserID string `json:"user_id"`
	SkillID uuid.UUID `json:"skill_id"`
	Point int64 `json:"point"`
	ClassName sql.NullString `json:"class_name"`
	SkillName sql.NullString `json:"skill_name"`
}

type StudentCertificate struct {
	ID uuid.UUID `json:"id"`
	Name string `json:"name"`
	UserID uuid.UUID `json:"user_id"`
	ClassID uuid.UUID `json:"class_id"`
	FileID uuid.UUID `json:"file_id"`
	ClassName sql.NullString `json:"class_name"`
	FileType sql.NullString `json:"file_type"`
	FileSize int64 `json:"file_size"`
	FileUrl sql.NullString `json:"file_url"`
}

func databaseUserToUser(dbUser database.User) User{
	return User{
		ID: dbUser.ID,
		CreatedAt: dbUser.CreatedAt,
		UpdatedAt: dbUser.UpdatedAt,
		Name: dbUser.Name,
		APIKey: dbUser.ApiKey,
	}
}

func databaseClassDetailToClassDetail(dbClass database.Class, dbClassSkills []database.ClassSkill, dbSpeakerClasses []database.SpeakerClass) ClassDetail {


	class_skills := []ClassSkill{}

	for _, dbClassSkill := range dbClassSkills {

		class_skills := append(class_skills, databaseClassSkillToClassSkill(dbClassSkill))

	}

	speakers := []SpeakerClass{}

	for _, dbSpeakerClass := range dbSpeakerClasses {

		speakers := append(speakers, databaseSpeakerClassToSpeakerClass(dbSpeakerClass))

	}

	return ClassDetail{
		Name: dbClass.Name,
		Level: dbClass.Level,
		CategoryID: dbClass.CategoryID,
		Image: dbClass.Image,
		LearningHour: dbClass.LearningHour,
		Skills: class_skills,
		Speakers: speakers,
		CreatedBy: dbClass.CreatedBy,
	}
}

func databaseClassToClass(dbClass database.Class) Class {
	// dbSkill database.Skill

	// skills := []Skill{}

	// for _, skill := range skills {
	// 	skills := append(skill, databaseSkillToSkill(skill))
	// }

	return Class{
		ID: dbClass.ID,
		Name: dbClass.Name,
		Level: dbClass.Level,
		Skills: skills,
		Image: dbClass.Image,
		CategoryID: dbClass.CategoryID,
		LearningHour: dbClass.LearningHour,
	}
}

func databaseClassesToClasses(dbClasses []database.Class) []Class{
	classes := []Class{}

	for _, dbClass := range dbClasses {
		classes := append(classes, databaseClassToClass(dbClass))
	}

	return classes
}

func databaseSpeakerClassToSpeakerClass(dbSpeakerClass database.SpeakerClass) SpeakerClass{

	return SpeakerClass{
		UserID: dbSpearkerClass.UserID,
		Name: dbSpeakerClass.Name,
		PhoneNumber: dbSpeakerClass.PhoneNumber,
	}
}

func databaseSpeakerClassesToSpeakerClasses(dbSpeakerClasses []database.SpeakerClass) []SpeakerClass{
	speakers := []SpeakerClass{}

	for _, dbSpeakerClass := range dbSpeakerClasses {

		speakers := append(speakers, databaseSpeakerClassToSpeakerClass(dbSpeakerClass))
	}

	return speakers

}

func databaseGetSpeakersByClassRowToSpeakerClass(dbSpeaker database.GetSpeakersByClassRow) SpeakerClass {
	return SpeakerClass{
		UserID:      dbSpeaker.UserID,
		Name:        dbSpeaker.Name,
		PhoneNumber: dbSpeaker.PhoneNumber,
	}
}

func databaseGetSpeakersByClassRowsToSpeakerClasses(rows []database.GetSpeakersByClassRow) []SpeakerClass {
	speakers := []SpeakerClass{}
	for _, row := range rows {
		speakers = append(speakers, databaseGetSpeakersByClassRowToSpeakerClass(row))
	}
	return speakers
}

func databaseLearningContentToLearningContent(dbLearningContent database.LearningContent, dbClass database.Class) LearningContent {

	learning_content := LearningContent{}

	class := Class{}

	class := append(class, databaseClassToClass(dbClass))

	// skills := []Skill{}

	// for _, skill := range skills {
	// 	skills := append(skills, databaseSkillToSkill(skill))
	// }

	// questions := []Questions{}

	// for _, question := range Questions {
	// 	question := append(questions, databaseClassSpeakerToClassSpeaker(question))
	// }

	return LearningContent{
		Name: dbLearningContent.Name,
		ContentType: dbLearningContent.ContentType,
		Level: dbLearningContent.Level,
		Class: dbClass,
		// Skills: skills,
		LearningHours: dbLearningContent.LearningHour,
		Duration: dbLearningContent.Duration,
		NumQuestions: dbLearningContent.NumQuestions,
		MaxPoints: dbLearningContent.MaxPoints,
		IsRandomQuestions: dbLearningContent.IsRandomQuestions,
		IsRandomAnswers: dbLearningContent.IsRandomAnswers,
		QuestionTypes: dbLearningContent.QuestionTypes,
		Status: dbLearningContent.Status,
		// Questions: questions,
	}
}

func databaseLearningContentsToLearningContents(dbLearningContents []database.LearningContent) []LearningContent{

	learning_contents := []LearningContent{}

	for _, dbLearningContent := range dbLearningContents {
		learning_contents := append(learning_contents, databaseLearningContentToLearningContent(dbLearningContent))
	}

	return learning_contents

}

// -- old

// func databaseLearningContentToLearningContent(dbLearningContent database.LearningContent, dbSkill database.Skill, dbSpeakerClass database.SpeakerClass) LearningContent {

// 	learning_content := LearningContent{}

// 	skills := []Skill{}

// 	for _, skill := range skills {
// 		skills := append(skills, databaseSkillToSkill(skill))
// 	}

// 	questions := []Questions{}

// 	for _, question := range Questions {
// 		question := append(questions, databaseClassSpeakerToClassSpeaker(question))
// 	}

// 	return LearningContent {
// 		Name: dbLearningContent.Name,
// 		ContentType: dbLearningContent.ContentType,
// 		Level: dbLearningContent.Level,
// 		Skills: skills,
// 		LearningHours: dbLearningContent.LearningHour,
// 		Duration: dbLearningContent.Duration,
// 		NumQuestions: dbLearningContent.NumQuestions,
// 		MaxPoints: dbLearningContent.MaxPoints,
// 		IsRandomQuestions: dbLearningContent.IsRandomQuestions,
// 		IsRandomAnswers: dbLearningContent.IsRandomAnswers,
// 		QuestionTypes: dbLearningContent.QuestionTypes,
// 		Status: dbLearningContent.Status,
// 		Questions: questions,
// 	}
// }

func databaseLearningResponseToLearningResponse(dbLearningResponse database.LearningResponse) LearningResponse {
	return LearningResponse{
		LearningID: dbLearningResponse.LearningID,
		ClassID: dbLearningResponse.ClassID,
		UserID: dbLearningResponse.UserID,
		Scores: dbLearningResponse.scores,
		CreatedBy: dbLearningResponse.CreatedBy,
	}
}

func databaseSkillToSkill(dbSkill database.Skill) Skill {
	return Skill{
		ID: dbSkill.ID,
		Name: dbSkill.Name,
	}
}

func databaseClassSkillToClassSkill(dbClassSkill database.ClassSkill) ClassSkill {
	return ClassSkill{
		ID: dbSkill.ID,
		Name: dbSkill.Name,
	}
}

func databaseGetSkillByClassRowToSkill(dbSkill database.GetSkillByClassRow) Skill {
	return Skill{
		ID:   dbSkill.ID,
		Name: dbSkill.Name,
	}
}

func databaseGetSkillByClassRowsToSkills(rows []database.GetSkillByClassRow) []Skill {
	skills := []Skill{}
	for _, row := range rows {
		skills = append(skills, databaseGetSkillByClassRowToSkill(row))
	}
	return skills
}

// func databaseSpeakerClassToSpeakerClass(dbSpeakerClass database.SpeakerClass) SpeakerClass {
// 	return SpeakerClass {
// 		ClassID: dbSpeakerClass.ClassID,
// 		UserID: dbSpeakerClass.UserID,
// 	}
// }

// func databaseGetStudentsRowToStudent(dbStudent database.GetStudentsRow) Student {
// 	return Student{
// 		ID:          dbStudent.ID,
// 		Name:        dbStudent.Name,
// 		PhoneNumber: dbStudent.PhoneNumber,
// 		Email:       dbStudent.Email,
// 		CreatedAt:   dbStudent.CreatedAt,
// 		UpdatedAt:   dbStudent.UpdatedAt,
// 		CreatedBy:	 dbStudent.CreatedBy,
// 		Address:     dbStudent.Address,
// 	}
// }

func databaseUserToStudent(dbUser database.User) Student {
	return Student{
		ID: dbUser.ID,
		Name: dbUser.Name,
		PhoneNumber: dbUser.PhoneNumber,
		Email: dbUser.Email,
		CreatedAt: dbUser.CreatedAt,
		UpdatedAt: dbUser.UpdatedAt,
		CreatedBy: dbUser.CreatedBy,
		Address:     dbStudent.Address,
	}
}

func databaseGetStudentsRowToStudent(dbStudent database.GetStudentsRow) Student {
	return Student{
		ID:          dbStudent.ID,
		Name:        dbStudent.Name,
		PhoneNumber: dbStudent.PhoneNumber,
		Email:       dbStudent.Email,
		CreatedAt:   dbStudent.CreatedAt,
		UpdatedAt:   dbStudent.UpdatedAt,
		Address:     dbStudent.Address,
	}
}

func databaseGetStudentsRowsToStudents(rows []database.GetStudentsRow) []Student {
	students := []Student{}
	for _, row := range rows {
		students = append(students, databaseGetStudentsRowToStudent(row))
	}
	return students
}

func databaseRegistrantToRegistrants(dbUser database.Registrant) Registrant{
	return Registrant{
		ID: dbRegistrant.ID,
		Name: dbRegistrant.Name,
		PhoneNumber: dbRegistrant.PhoneNumber,
		Email: dbRegistrant.Email,
		Address: dbRegistrant.Address,
		CreatedAt: dbRegistrant.CreatedAt,
	}
}

func databaseStudentAchievementToStudentAchievement(dbStudentAchievement database.StudentAchievement) StudentAchievement {

	return StudentAchievement{
		ID: dbStudentAchievement.ID,
		UserID: dbStudentAchievement.UserID,
		ClassID: dbStudentAchievement.ClassID,
		SkillID: dbStudentAchievement.SkillID,
		Point: dbStudentAchievement.Point,
		ClassName: dbStudentAchievement.ClassName,
		SkillName: dbStudentAchievement.SkillName,
	}
}

// func databaseStudentAchievementsToStudentAchievements(dbStudentAchievements []database.StudentAchievement) []StudentAchievement{
// 	student_achievements := []StudentAchievement{}

// 	for _, dbStudentAchievement := range dbStudentAchievements {

// 		// var new_dbStudentAchievement

// 		// class, err := apiCnfg.DB.GetOneClass(r.Context(), dbStudentAchievement.ClassID)

// 		// if err != nil {
// 		// 	respondWithError(w, 400, fmt.Sprint("Error when get class: %v", err))
// 		// 	return
// 		// }

// 		// skill, err := apiCnfg.DB.GetOneSkill(r.Context(), dbStudentAchievement.SkillID)

// 		// if err != nil {
// 		// 	respondWithError(w, 400, fmt.Sprint("Error when get skill: %v", err))
// 		// 	return
// 		// }

// 		// // new_dbStudentAchievement = {...dbStudentAchievement, ClassName: class.Name, SkillName: skill.Name}

// 		student_achievements := append(student_achievements, databaseStudentAchievementToStudentAchievement(dbStudentAchievement))
// 	}

// 	return student_achievements
// }

func databaseGetStudentAchievementsRowToStudentAchievement(row database.GetStudentAchievementsRow) StudentAchievement {
	return StudentAchievement{
		ID:        row.ID,
		UserID:    row.UserID,
		ClassID:   row.ClassID,
		SkillID:   row.SkillID,
		ClassName: row.ClassName,
		SkillName: row.SkillName,
		Point:     row.Point,
	}
}

func databaseStudentAchievementsToStudentAchievements(rows []database.GetStudentAchievementsRow) []StudentAchievement {
	studentAchievements := []StudentAchievement{}
	for _, row := range rows {
		studentAchievements = append(studentAchievements, databaseGetStudentAchievementsRowToStudentAchievement(row))
	}
	return studentAchievements
}

func databaseCertificateToCertificate(dbCertificate database.StudentCertificate){
	return StudentCertificate{
		ID: dbCertificate.ID,
		Name: dbCertificate.Name,
		UserID: dbCertifitcate.UserID,
		ClassID: dbCertificate.ClassID,
		FileID: dbCertificate.FileID,
		ClassName: dbCertificate.ClassName,
		FileType: dbCertificate.FileType,
		FileSize: dbCertificate.FileSize,
		FileUrl: dbCertificate.FileUrl,
	}
}

func databaseCertificatesToCertificates(dbCertificates []database.StudentCertificate) []StudentCertificate{
	certificates := []StudentCertificate{}

	for _, certificate := range dbCertificates {

		// var new_certificate = {}

		// file, err := apiCnfg.DB.GetFileByID(r.Context(), certificate.FileID)

		// if err != nil {
		// 	respondWithError(w, 400, fmt.Sprint("Error when get certificate: %v", err))
		// 	return
		// }

		// class, err := apiCnfg.DB.GetClassByID(r.Context(), certificate.classID)

		// if err != nil {
		// 	respondWithError(w, 400, fmt.Sprint("Error when get class certificate: %v", err))
		// 	return
		// }

		// new_certificate := {...certificate, ClassName: class.Name, FileName: file.Name, FileType: file.file_type, FileSize: file.size, FileUrl: file.file_url}


		certificates := append(certificates, databaseCertificateToCertificate(certificate))
	}

	// fmt.Sprint("Certificate: %s", certificates)

	return certificates
}

func databaseGetUserCertificatesRowToStudentCertificate(row database.GetUserCertificatesRow) StudentCertificate {
	return StudentCertificate{
		ID:        row.ID,
		Name:      row.Name,
		UserID:    row.UserID,
		ClassID:   row.ClassID,
		FileID:    row.FileID,
		ClassName: row.ClassName,
		FileType:  row.FileType,
		FileSize:  row.FileSize,
		FileUrl:   row.FileUrl,
	}
}
