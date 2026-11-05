package main

import (
	"fmt"
	"log"
	"os"
	"net/http"

	"github.com/joho/godotenv"
	"github.com/go-chi/chi"
	"github.com/go-chi/cors"

	"github.com/MayangAsura/thullab-evaluation/internal/database"

	_"github.com/lib/pq"

	"database/sql"

	// "internal/database"
)

type apiConfig struct {
	DB *database.Queries
}

func main(){

	fmt.Println("hello from go")

	godotenv.Load()

	portString := os.Getenv("PORT")

	if portString == "" {
		log.Fatal("Port not found in the environment")

	}

	dbURL := os.Getenv("DB_URL")

	if dbURL == "" {
		log.Fatal("DB_URL not found in the environment")
	}

	conn, err := sql.Open("postgres", dbURL)

	fmt.Println("conn", conn)

	if err != nil {
		log.Fatal("Cannot connect to database:", err)
	}

	// queries, err :=

	// if err != nil {
	// 	log.Fatal("Can't create to db connection:", err)
	// }

	apiCnfg := apiConfig{
		DB: database.New(conn),
	}

	router := chi.NewRouter()

	router.Use(cors.Handler(cors.Options{
		AllowedOrigins: []string{"https://*", "http://*"},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders: []string{"*"},
		ExposedHeaders: []string{"Link"},
		AllowCredentials: false,
		MaxAge: 300,
	}))

	v1Router := chi.NewRouter()

	v1Router.Get("/healthz", handlerReadiness)
	v1Router.Get("/err", handlerErr)
	v1Router.Post("/auth/login", apiCnfg.handleLogin)
	v1Router.Post("/auth/register", apiCnfg.handleRegister)
	v1Router.Post("/users", apiCnfg.middlewareAuth(apiCnfg.handlerCreateUser))
	v1Router.Get("/users", apiCnfg.middlewareAuth(apiCnfg.handlerGetUser))
	// v1Router.Post("/classes", apiCnfg.middlewareAuth(apiCnfg.handlerCreateClasses))
	// v1Router.Get("/classes", apiCnfg.middlewareAuth(apiCnfg.handlerGetClasses))
	v1Router.Get("/classes/:id", apiCnfg.middlewareAuth(apiCnfg.handlerGetClassDetail))
	// v1Router.Update("/classes:id", apiCnfg.handlerUpdateClass)
	// v1Router.Delete("/classes:id", apiCnfg.handlerDeleteClass)
	// v1Router.Get("/classes/:id/learning-contents", apiCnfg.middlewareAuth(apiCnfg.handlerGetLearningContentsClass))
	// v1Router.Post("/learning-contents", apiCnfg.middlewareAuth(apiCnfg.handlerCreateLearningContents))
	// v1Router.Get("/learning-contents", apiCnfg.middlerwareAuth(apiCnfg.handlerGetLearningContent))
	// v1Router.Get("/learning-contents/:id", apiCnfg.middlewareAuth(apiCnfg.handlerGertLerningContentDetail))
	// v1Router.Update("/learning-contents/:id", apiCnfg.handlerUpdateLearningContent)
	// v1Router.Detele("/learning-contents/:id", apiCnfg.handlerDeleteLearningContent)
	// v1Router.Get("/learning-contents/:id/start", apiCnfg.middlewareAuth(apiCnfg.handlerStartLearningContent))
	// v1Router.Get("/learning-contents/:id/resume", apiCnfg.middlewareAuth(apiCnfg.handlerResumeLearningContent))
	// v1Router.Get("/learning-contents/:id/complete", apiCnfg.middlewareAuth(apiCnfg.handlerCompleteOneLearningContent))
	v1Router.Post("/learning-responses", apiCnfg.middlewareAuth(apiCnfg.handlerCreateLearningResponse))
	v1Router.Post("/skills", apiCnfg.middlewareAuth(apiCnfg.handlerCreateSkills))
	v1Router.Post("/speakers", apiCnfg.middlewareAuth(apiCnfg.handlerCreateSpeakerClass))
	v1Router.Get("/speakers", apiCnfg.handlerGetSpeakers)
	v1Router.Get("/me/achievements", apiCnfg.middlewareAuth(apiCnfg.handleGetMyAchievements))
	v1Router.Get("/me/certificates", apiCnfg.middlewareAuth(apiCnfg.handleGetMyCertificates))
	// v1Router.Post("/forgot-password", apiCnfg.middlewareAuth(apiCnfg.handlerForgotPassword))

	// v1Router.HandleFunc("/healthz", handlerReadiness)

	router.Mount("/v1/api", v1Router)


	srv := &http.Server{
		Handler: router,
		Addr:		":" + portString,
	}

	log.Printf("Server is running on port %v", portString)
	srv.ListenAndServe()

	// if err != nil {
	// 	log.Fatal(err)
	// }


	// fmt.Println("port:", portString)

}